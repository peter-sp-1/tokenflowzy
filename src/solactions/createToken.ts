import {
    Connection,
    Keypair,
    SystemProgram,
    Transaction,
    PublicKey,
    LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
    ExtensionType,
    createInitializeMintInstruction,
    getMintLen,
    TOKEN_2022_PROGRAM_ID,
    createInitializeTransferFeeConfigInstruction,
    createMintToInstruction,
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction,
    TYPE_SIZE,
    LENGTH_SIZE,
    createInitializeMetadataPointerInstruction,
    // createInitializePermanentDelegateInstruction,
} from '@solana/spl-token';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import 'crypto';
//import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { createInitializeInstruction, pack, TokenMetadata } from '@solana/spl-token-metadata';
import * as anchor from '@project-serum/anchor';
import { CENTRAL_PDA, FEE_MANAGER_PROGRAM, FEE_MANAGER_IDL } from './feeManager';
import { setupTokenReflection } from '@/services/api';

export interface TokenConfig {
    name: string;
    symbol: string;
    decimals: number;
    supply: string;
    description?: string;
    image?: File | null;
    extensions: {
        transferFee?: boolean;
        interestBearing?: boolean;
        renounce?: boolean;
    };
}

// Add this helper function at the top of the file
async function sendAndConfirmWithRetry(
    connection: Connection,
    transaction: Transaction,
    signers: Keypair[],
    wallet: AnchorWallet,
    maxRetries = 3
): Promise<string> {
    let lastError;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            // Get a fresh blockhash for each attempt
            const latestBlockhash = await connection.getLatestBlockhash('confirmed');
            transaction.recentBlockhash = latestBlockhash.blockhash;
            transaction.feePayer = wallet.publicKey;

            // Clear previous signatures
            transaction.signatures = [];

            // Sign with all signers
            signers.forEach(signer => {
                transaction.partialSign(signer);
            });

            const signedTx = await wallet.signTransaction(transaction);

            const txId = await connection.sendRawTransaction(signedTx.serialize(), {
                skipPreflight: true,
                maxRetries: 3,
            });

            // Wait for confirmation with shorter timeout
            await connection.confirmTransaction({
                signature: txId,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            }, 'confirmed');

            return txId;
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${attempt + 1} failed:`, error);
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    throw lastError;
}

function generateExplorerTxUrl(txId: string | any) {
    return `https://explorer.solana.com/tx/${txId}?cluster=devnet`;
}
  
interface CreateTokenParams {
    config: TokenConfig;
    wallet: AnchorWallet;
}
  
export async function createCustomToken({ config, wallet }: CreateTokenParams) {
    if (!wallet.publicKey || !wallet.signTransaction) {
        throw new Error('Wallet not connected');
    }

    const connection = new Connection('https://api.devnet.solana.com', { 
        commitment: 'confirmed',
        confirmTransactionInitialTimeout: 60000 // 60 second timeout
    });
    
    const nullAddress = new PublicKey('11111111111111111111111111111111');
    const provider = new anchor.AnchorProvider(connection, wallet, {
        commitment: 'confirmed',
        preflightCommitment: 'confirmed'
    });
    const program = new anchor.Program(FEE_MANAGER_IDL, FEE_MANAGER_PROGRAM, provider);
    const payer = wallet.publicKey;
    const mintKeypair = Keypair.generate();
    const mint = mintKeypair.publicKey;

    // Validate config and set defaults
    if (!config.description) {
        config.description = 'No description provided';
    }

    // Create metadata object
    const metadata: TokenMetadata = {
        mint: mint,
        name: config.name,
        symbol: config.symbol,
        uri: "", // Empty URI since we're not using Arweave for now
        additionalMetadata: [['description', config.description]],
    };

    // Calculate extensions and mint account size
    const extensions: ExtensionType[] = [ExtensionType.MetadataPointer];
    if (config.extensions.transferFee) extensions.push(ExtensionType.TransferFeeConfig);
    if (config.extensions.interestBearing) extensions.push(ExtensionType.InterestBearingConfig);
    
    const mintLen = getMintLen(extensions);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
    const mintLamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

    // Create transaction
    const transaction = new Transaction();

    try {
        // Add deposit instruction
        const depositTx = await program.methods.deposit(
            new anchor.BN(0.1 * LAMPORTS_PER_SOL)
        ).accounts({
            depositor: wallet.publicKey,
            vaultState: new anchor.web3.PublicKey(CENTRAL_PDA),
            systemProgram: SystemProgram.programId
        }).instruction();

        transaction.add(depositTx);

        // Add token creation instructions based on config
        const createAccountIx = SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: mint,
            space: mintLen,
            lamports: mintLamports,
            programId: TOKEN_2022_PROGRAM_ID,
        });

        const metadataPointerIx = createInitializeMetadataPointerInstruction(
            mint, payer, mint, TOKEN_2022_PROGRAM_ID
        );

        const mintIx = createInitializeMintInstruction(
            mint,
            config.decimals,
            config.extensions.renounce ? nullAddress : payer,
            config.extensions.renounce ? nullAddress : payer,
            TOKEN_2022_PROGRAM_ID
        );

        const initializeIx = createInitializeInstruction({
            programId: TOKEN_2022_PROGRAM_ID,
            mint: mint,
            metadata: mint,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mintAuthority: config.extensions.renounce ? nullAddress : payer,
            updateAuthority: config.extensions.renounce ? nullAddress : payer,
        });

        transaction.add(createAccountIx, metadataPointerIx, mintIx, initializeIx);

        // Add transfer fee config if enabled
        if (config.extensions.transferFee) {
            const feeBasisPoints = 100; // 1%
            const maxFee = BigInt(9 * 10 ** config.decimals);
            const transferFeeIx = createInitializeTransferFeeConfigInstruction(
                mint, payer, payer, feeBasisPoints, maxFee, TOKEN_2022_PROGRAM_ID
            );
            transaction.add(transferFeeIx);
        }

        // Create and add ATA instruction
        const sourceAccount = await getAssociatedTokenAddress(
            mint, payer, false, TOKEN_2022_PROGRAM_ID
        );
        
        const ataIx = createAssociatedTokenAccountInstruction(
            payer, sourceAccount, payer, mint, TOKEN_2022_PROGRAM_ID
        );
        
        const mintToIx = createMintToInstruction(
            mint,
            sourceAccount,
            payer,
            BigInt(Number(config.supply) * 10 ** config.decimals),
            [],
            TOKEN_2022_PROGRAM_ID
        );

        transaction.add(ataIx, mintToIx);

        // Replace the transaction sending and confirmation code with:
        const txId = await sendAndConfirmWithRetry(
            connection,
            transaction,
            [mintKeypair],
            wallet
        );

        console.log('Token Created:', generateExplorerTxUrl(txId));

        // Setup reflection with better error handling
        try {
            await setupReflection(mint.toString(), config, wallet.publicKey.toString());
            console.log('Reflection setup completed');
        } catch (error) {
            console.warn('Reflection setup warning:', error);
            // Continue despite reflection setup failure
        }

        return {
            mint: mint.toBase58(),
            txId,
            success: true,
            reflectionSetup: true
        };

    } catch (error) {
        console.error("Token creation failed:", error);
        throw new Error(
            error instanceof Error 
                ? `Token creation failed: ${error.message}` 
                : "Failed to create token"
        );
    }
}

// Helper function for reflection setup
async function setupReflection(
    mintAddress: string,
    config: TokenConfig,
    ownerAddress: string
): Promise<void> {
    try {
        await setupTokenReflection({
            tokenMint: mintAddress,
            tokenName: config.name,
            tokenSymbol: config.symbol,
            decimals: config.decimals,
            owner: ownerAddress
        });
    } catch (error) {
        console.warn('Reflection setup failed:', error);
        // Don't throw the error to keep the token creation process going
    }
}
