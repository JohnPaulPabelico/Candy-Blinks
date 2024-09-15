import {
  ComputeBudgetProgram,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { ENDPOINT } from "../../utils";
const {
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} = require("@solana/spl-token");
const splToken = require("@solana/spl-token");

type TransferSolTransactionParam = {
  from: string;
  amount: number;
  // to: string
};

interface TransferSPLParam {
  tokenAddress: string;
  senderAddress: string;
  recipientAddress: string;
  amount: number;
}

const connection = new Connection(ENDPOINT);

export const transferSolTransaction = async (
  params: TransferSolTransactionParam
): Promise<Transaction> => {
  const { from, amount } = params;

  const fromPubkey = new PublicKey(from);
  const toPubkey = new PublicKey(
    "9QZqqJfKRuoGKTaCgUvjQMMUNpaxhPC3fvn2y8iPZ4uU"
  ); // static receiver

  const connection = new Connection(
    process.env.SOLANA_RPC! || clusterApiUrl("devnet")
  );

  const minimumBalance = await connection.getMinimumBalanceForRentExemption(
    0 // note: simple accounts that just store native SOL have `0` bytes of data
  );
  if (amount * LAMPORTS_PER_SOL < minimumBalance) {
    throw `account may not be rent exempt: ${toPubkey.toBase58()}`;
  }

  const transaction = new Transaction();
  transaction.feePayer = fromPubkey;

  transaction.add(
    SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: toPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  transaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;

  return transaction;
};

const PYUSD_TOKEN_ADDRESS = "CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM";

const getAssociatedTokenAddress = async (
  tokenAddress: string,
  ownerAddress: string
) => {
  let programId = TOKEN_PROGRAM_ID;
  if (tokenAddress === PYUSD_TOKEN_ADDRESS) {
    programId = TOKEN_2022_PROGRAM_ID;
  }

  return await splToken.getAssociatedTokenAddress(
    new PublicKey(tokenAddress),
    new PublicKey(ownerAddress),
    false,
    programId
  );
};

export const transferSPL = async (params: TransferSPLParam) => {
  const SENDR_ATA = await getAssociatedTokenAddress(
    params.tokenAddress,
    params.senderAddress
  );
  const RECVR_ATA = await getAssociatedTokenAddress(
    params.tokenAddress,
    params.recipientAddress
  );
  let programId = TOKEN_PROGRAM_ID;
  if (params.tokenAddress === PYUSD_TOKEN_ADDRESS) {
    programId = TOKEN_2022_PROGRAM_ID;
  }
  console.log(programId);
  const setComputeUnitInstruction = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 200000, // increase as needed
  });

  const setComputeUnitLimitInstruction =
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 50000,
    });

  const createAtaInstruction =
    splToken.createAssociatedTokenAccountIdempotentInstruction(
      new PublicKey(params.senderAddress),
      RECVR_ATA,
      new PublicKey(params.recipientAddress),
      new PublicKey(params.tokenAddress),
      programId
    );

  const splTransferInstruction = splToken.createTransferCheckedInstruction(
    SENDR_ATA,
    new PublicKey(params.tokenAddress),
    RECVR_ATA,
    new PublicKey(params.senderAddress),
    Number(params.amount) * 1_000_000,
    6,
    [new PublicKey(params.senderAddress)],
    programId
  );
  const blockhash = await connection.getLatestBlockhash();
  const tx = new TransactionMessage({
    payerKey: new PublicKey(params.senderAddress),
    recentBlockhash: blockhash.blockhash,
    instructions: [
      setComputeUnitInstruction,
      setComputeUnitLimitInstruction,
      createAtaInstruction,
      splTransferInstruction,
    ],
  });

  // if (blinksightsActionIdentityInstruction) {
  //   tx.instructions.push(blinksightsActionIdentityInstruction)
  // }
  const messagev0 = tx.compileToV0Message();

  const transaction = new VersionedTransaction(messagev0);
  return transaction;
};
