import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  generateSigner,
  transactionBuilder,
  some,
  publicKey,
  createNoopSigner,
  signerIdentity,
} from "@metaplex-foundation/umi";
import {
  fetchCandyMachine,
  mintV2,
  mplCandyMachine,
  safeFetchCandyGuard,
} from "@metaplex-foundation/mpl-candy-machine";

import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  fromWeb3JsInstruction,
  toWeb3JsLegacyTransaction,
} from "@metaplex-foundation/umi-web3js-adapters";
import supabase from "@/app/lib/supabaseClient";

const ENDPOINT = process.env.NEXT_PUBLIC_RPC || clusterApiUrl("devnet");

type MintTransactionParam = {
  toAddress: string;
  handle: string;
  blinksightsIx: TransactionInstruction;
};

interface GuardOption {
  __option: "None" | "Some";
}

interface Guards {
  [key: string]: GuardOption | undefined;
}

export const getBlink = async (handle: string) => {
  try {
    const { data, error } = await supabase
      .from("blinks")
      .select("*")
      .eq("handle", handle);
    if (error) throw error;

    console.log("data: ", data);
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

export const mintTransaction = async (
  params: MintTransactionParam
): Promise<Transaction> => {
  const { toAddress, handle, blinksightsIx } = params;

  const toPubKey = publicKey(toAddress);
  const pubKeySigner = createNoopSigner(toPubKey);

  const umiTransaction = async () => {
    const umi = createUmi(ENDPOINT)
      .use(signerIdentity(pubKeySigner))
      .use(mplCandyMachine())
      .use(mplTokenMetadata());

    const blinksData = await getBlink(handle);
    if (blinksData.length === 0) {
      throw new Error("No blinks found for the given handle");
    }

    const firstBlink = blinksData[0];
    const candyMachineAddress = publicKey(firstBlink.candymachine_id);

    const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
    const candyGuard = await safeFetchCandyGuard(
      umi,
      candyMachine.mintAuthority
    );
    const connection = new Connection(ENDPOINT);

    const latestBlockhashResult = await connection.getLatestBlockhash({
      commitment: "finalized",
    });

    try {
      const nftMint = generateSigner(umi);

      const umiBlinksightsIx = fromWeb3JsInstruction(blinksightsIx);

      const tx = await transactionBuilder()
        .add(setComputeUnitLimit(umi, { units: 800_000 }))
        .add(
          mintV2(umi, {
            candyMachine: candyMachine.publicKey,
            candyGuard: candyGuard?.publicKey,
            nftMint,
            collectionMint: candyMachine.collectionMint,
            collectionUpdateAuthority: candyMachine.authority,
            mintArgs: getMintArgs(candyGuard?.guards),
          })
        )
        .add({
          bytesCreatedOnChain: 0,
          instruction: umiBlinksightsIx,
          signers: [],
        })

        .setBlockhash(latestBlockhashResult.blockhash)
        .build(umi);
      console.log("test");

      // console.log("Blockhash:", latestBlockhashResult.blockhash);

      const web3JsTransaction = toWeb3JsLegacyTransaction(tx);

      web3JsTransaction.partialSign({
        publicKey: new PublicKey(nftMint.publicKey.toString()),
        secretKey: nftMint.secretKey,
      });

      return web3JsTransaction;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };
  const transaction = await umiTransaction();

  return transaction;
};

// export const getItemsRedeemed = async () => {
//   const umi = createUmi(ENDPOINT);
//   const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
//   const itemsRedeemed = Number(candyMachine.itemsRedeemed);

//   return itemsRedeemed;
// };

function getMintArgs(guards: Guards | undefined) {
  const mintArgs: { [key: string]: GuardOption } = {};

  if (!guards) return mintArgs;

  // List of guards to exclude
  const excludedGuards = [
    "botTax",
    "addressGate",
    "endDate",
    "programGate",
    "redeemedAmount",
    "startDate",
  ];

  // Iterate through each guard and add it to mintArgs if it's not in the excluded list and has a value
  for (const [key, value] of Object.entries(guards)) {
    if (value && value.__option !== "None" && !excludedGuards.includes(key)) {
      mintArgs[key] = value;
    }
  }

  return mintArgs;
}
