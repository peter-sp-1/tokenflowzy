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

// Replace the existing uploadMetadataToArweave function with:
// async function uploadMetadataToArweave(metadata: any, wallet: AnchorWallet): Promise<string> {
//     try {
//         const bundlr = new WebBundlr(
//             "https://node1.bundlr.network",
//             "solana",
//             wallet,
//             { providerUrl: "https://api.devnet.solana.com" }
//         );

//         await bundlr.ready();

//         const metadataBuffer = Buffer.from(JSON.stringify(metadata));
//         const price = await bundlr.getPrice(metadataBuffer.length);
//         const balance = await bundlr.getLoadedBalance();

//         if (balance.isLessThan(price)) {
//             await bundlr.fund(price.minus(balance).multipliedBy(1.1).toNumber());
//         }

//         const tags = [{ name: "Content-Type", value: "application/json" }];
//         const uploader = bundlr.uploader.chunkedUploader;
//         const response = await uploader.uploadData(metadataBuffer, { tags });

//         return `https://arweave.net/${response.id}`;
//     } catch (error) {
//         console.error("Error uploading metadata:", error);
//         throw error;
//     }
// }

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

    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const nullAddress = new PublicKey('11111111111111111111111111111111');
    const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions());
    const program = new anchor.Program(FEE_MANAGER_IDL, FEE_MANAGER_PROGRAM, provider);
    // const baseAccount = new PublicKey(CENTRAL_PDA);
    const payer = wallet.publicKey;
    const mintAuthority = wallet.publicKey;
    const mintKeypair = Keypair.generate();
    const mint = mintKeypair.publicKey;

    if (!config.description) {
        config.description = 'No description provided';
    }
     // **STEP 1: Upload image if provided**
     let imageUri = "";
     if (config.image) {
         console.log("Uploading image...");
         imageUri = ""; //await uploadImageToArweave(config.image, wallet, connection);
         console.log("Image uploaded:", imageUri);
     }

     // **STEP 2: Upload metadata**
    // const metadataupload = {
    //     name: config.name,
    //     symbol: config.symbol,
    //     description: config.description || "No description provided",
    //     image: imageUri,  // Link to uploaded image
    //     attributes: [],
    // };

    console.log("Uploading metadata...");
    const metadataUri = ""; // await uploadMetadataToArweave(metadataupload, wallet);
    console.log("Metadata uploaded:", metadataUri);


    const metadata: TokenMetadata = {
        mint: mint,
        name: config.name,
        symbol: config.symbol,
        uri: metadataUri,
        additionalMetadata: [['description', config.description]],
    };

    console.log("Creating token with metadata URI:", metadataUri);



    // Bundle all instructions into a single transaction
    const transaction = new Transaction();
    
    // Calculate mint account size and rent
    const extensions: ExtensionType[] = [ExtensionType.MetadataPointer];
    if (config.extensions.transferFee) {
        extensions.push(ExtensionType.TransferFeeConfig);
    }
    if (config.extensions.interestBearing) {
        extensions.push(ExtensionType.InterestBearingConfig);
    }
    const mintLen = getMintLen(extensions);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

    const mintLamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
    
    // Add initialize transfer fee config instruction
    try {
        const tx = await program.methods.deposit(
            new anchor.BN(0.1*LAMPORTS_PER_SOL)
        ).accounts({
                depositor: wallet.publicKey,
                vaultState: new anchor.web3.PublicKey(CENTRAL_PDA),
                systemProgram: SystemProgram.programId
            }).instruction();

        transaction.add(tx)
    } catch (err: any) {
        console.error("Error depsiting:", err);
    }
    
    
    // Add create mint account instruction
    if (config.extensions.renounce) {
        console.log(config.extensions.renounce);
        transaction.add(
            SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey: mint,
                space: mintLen,
                lamports: mintLamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            
            createInitializeMetadataPointerInstruction(
                mint, 
                payer, 
                mint, 
                TOKEN_2022_PROGRAM_ID
            ),

            createInitializeMintInstruction(
                mint,
                config.decimals,
                nullAddress,
                nullAddress,
                TOKEN_2022_PROGRAM_ID
            ),

            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: mint,
                metadata: mint,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                mintAuthority: nullAddress,
                updateAuthority: nullAddress,
            }),
        );
    } else {
        transaction.add(
            SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey: mint,
                space: mintLen,
                lamports: mintLamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            
            createInitializeMetadataPointerInstruction(
                mint, 
                payer, 
                mint, 
                TOKEN_2022_PROGRAM_ID
            ),

            createInitializeMintInstruction(
                mint, 
                config.decimals, 
                payer, 
                payer, 
                TOKEN_2022_PROGRAM_ID
            ),

            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: mint,
                metadata: mint,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                mintAuthority: payer,
                updateAuthority: payer,
            }),
        );
    }

    
    // Add transfer fee config if enabled
    if (config.extensions.transferFee) {
        const feeBasisPoints = 100;
        const maxFee = BigInt(9 * 10 ** config.decimals);
        transaction.add(
            createInitializeTransferFeeConfigInstruction(
                mint,
                payer,
                payer,
                feeBasisPoints,
                maxFee,
                TOKEN_2022_PROGRAM_ID
            )
        );
    }

    

    // Create and add ATA instruction
    const sourceAccount = await getAssociatedTokenAddress(
        mint,
        payer,
        false,
        TOKEN_2022_PROGRAM_ID
    );
    
    transaction.add(
        createAssociatedTokenAccountInstruction(
            payer,
            sourceAccount,
            payer,
            mint,
            TOKEN_2022_PROGRAM_ID
        )
    );

    // Add mint-to instruction
    const mintAmount = BigInt(Number(config.supply) * 10 ** config.decimals);
    transaction.add(
        createMintToInstruction(
            mint,
            sourceAccount,
            mintAuthority,
            mintAmount,
            [],
            TOKEN_2022_PROGRAM_ID
        )
    );

    // Sign and send transaction
    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = payer;  // Set wallet as fee payer
    
    // First sign with mint keypair
    transaction.partialSign(mintKeypair);
    
    // Then let the wallet sign to pay fees
    const signedTx = await wallet.signTransaction(transaction);
    
    // Send with preflight disabled and retry on failure
    const txId = await connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
    });
    
    // Wait for confirmation with commitment
    await connection.confirmTransaction({
        signature: txId,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    }, 'confirmed');

    console.log('Token Created and Initialized:', generateExplorerTxUrl(txId));

    // Add delay before metadata creation
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
        mint: mint.toBase58(),
        txId: txId,
        // owner: payer.toString(),
        // sourceAccount: sourceAccount.toString(),
    };
}
