import {
    createV1,
    findMetadataPda,
    mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
    createUmi,
    signerIdentity,
    publicKey,
    createSignerFromKeypair,
    percentAmount,
} from "@metaplex-foundation/umi";
import { WalletContextState } from "@solana/wallet-adapter-react";

interface CreateMetadataParams {
    wallet: WalletContextState;
    mintAddress: string;
    name: string;
    symbol: string;
    uri?: string;
}

export async function createTokenMetadata({
    wallet,
    mintAddress,
    name,
    symbol,
    uri = ''
}: CreateMetadataParams) {
    if (!wallet.publicKey) {
        throw new Error('Wallet not connected');
    }

    try {
        // Initialize Umi with Token Metadata program
        const umi = createUmi().use(mplTokenMetadata());
        
        // Create signer from wallet
        const signer = createSignerFromKeypair(umi, {
            publicKey: publicKey(wallet.publicKey),
            secretKey: new Uint8Array([])
        });
        umi.use(signerIdentity(signer));

        // Convert mint address to publicKey type
        const mint = publicKey(mintAddress);

        // Find metadata PDA
        const metadataPda = findMetadataPda(umi, {mint});

        // Create metadata
        const tx = await createV1(umi, {
            metadata: metadataPda,
            mint,
            authority: signer,
            payer: signer,
            name,
            symbol,
            uri,
            sellerFeeBasisPoints: percentAmount(0),
            creators: null,
            collection: null,
            uses: null,
            isMutable: true,
            primarySaleHappened: false,
            updateAuthority: signer,
        });

        console.log(tx);

        // return {
        //     signature: tx.,
        //     metadataAddress: metadataPda.toString()
        // };

    } catch (error) {
        console.error('Error creating token metadata:', error);
        throw error;
    }
}