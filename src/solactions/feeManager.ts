import { PublicKey } from '@solana/web3.js';
// import idl from "./fee_manager.json";

const CENTRAL_PDA = 'J7TG4g3PpA1zjLRYzNjvEMHcwBJagqt35S2k2t26ZSNW';
const FEE_MANAGER_PROGRAM = new PublicKey("Be9kXVWMNSQgF7DjfU61Dutj3EK8QbTEYNJ8cRvuVrWK");

import { Idl } from '@project-serum/anchor';

export interface VaultState {
    owner: string;
    vault_state_bump: number;
    revenue: number;
    tokens_deployed: number;
}

const FEE_MANAGER_IDL: Idl = {
    version: "0.1.0",
    name: "token_vault",
    instructions: [
        {
            name: "deposit",
            accounts: [
                {
                    name: "depositor",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "vaultState",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "amount",
                    type: "u64"
                }
            ]
        }
    ],
    accounts: [
        {
            name: "vaultState",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "owner",
                        type: "publicKey"
                    },
                    {
                        name: "vaultStateBump",
                        type: "u8"
                    },
                    {
                        name: "revenue",
                        type: "u64"
                    },
                    {
                        name: "tokensDeployed",
                        type: "u64"
                    }
                ]
            }
        }
    ]
};

// const fetchTrades = async () => {
// try {
//     if (!wallet) {
//     console.error("Wallet not connected");
//     return;
//     }
//     const connection = new Connection("https://api.devnet.solana.com");
//     const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions());
//     const program = new anchor.Program(idl, PROGRAM_ID, provider);
//     const baseAccount = new PublicKey(CENTRAL_PDA);

//     const accountData = await program.account.baseAccount.fetch(baseAccount);
//     console.log("ACCOUNT DATA:", accountData);
//     setTrades(accountData.trades);
// } catch (err: any) {
//     setError(err.message || "Error fetching trades");
//     console.error("Error fetching trades:", err);
// }
// }

export { FEE_MANAGER_PROGRAM, FEE_MANAGER_IDL, CENTRAL_PDA }