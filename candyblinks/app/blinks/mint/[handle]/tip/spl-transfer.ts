import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";

type TransferSolTransactionParam = {
  from: string;
  amount: number;
  // to: string
};

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
