import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store/store";
import {
  IAssetsSchema,
  ICollectionDetailsSchema,
  IRoyaltiesSchema,
  ISettingsSchema,
} from "@/lib/schemas/create-candy_machine_v2.schema";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WebUploader } from "@irys/web-upload";
import { WebSolana } from "@irys/web-upload-solana";
import { TaggedFile } from "@irys/web-upload/esm/upload";
import useUmi from "@/hooks/useUmi";
import { createCollectionV1 } from "@metaplex-foundation/mpl-core";
import {
  base64,
  dateTime,
  generateSigner,
  publicKey,
  sol,
  some,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import { create } from "@metaplex-foundation/mpl-core-candy-machine";
import useCreateCandyMachine from "@/hooks/useCreateCandyMachine";
type CombinedSchema = ICollectionDetailsSchema &
  IAssetsSchema &
  ISettingsSchema & { royalties: IRoyaltiesSchema };

export default function Royalties() {
  const { getValues, trigger } = useFormContext<CombinedSchema>();

  const { connection } = useConnection();
  const umi = useUmi();
  const page = useStore((state: { page: number }) => state.page);
  const setPage = useStore(
    (state: { setPage: (page: number) => void }) => state.setPage
  );
  const wallet = useWallet();
  const { mutate, isPending, data, error } = useCreateCandyMachine();
  const prev = () => setPage(Math.max(0, page - 1));

  useEffect(() => {
    console.log(error);
  }, [error]);
  useEffect(() => {
    console.log(data);
  }, [data]);

  const getIrysUploader = async (wallet: any) => {
    try {
      const irysUploader = await WebUploader(WebSolana)
        .withProvider(wallet)
        .withRpc(connection.rpcEndpoint)
        .devnet();

      return irysUploader;
    } catch (error) {
      console.error("Error connecting to Irys:", error);
      throw new Error("Error connecting to Irys");
    }
  };

  // const connectToIrys = async () => {
  //   if (!wallet) {
  //     console.log("Wallet not connected");
  //     return;
  //   }

  //   try {
  //     const irysUploader = await getIrysUploader(wallet);
  //     console.log(`Connected to Irys from ${irysUploader.address}`);
  //   } catch (error) {
  //     console.log("Error connecting to Irys");
  //   }
  // };

  const onCreate = async () => {
    // console.log(getValues("assetImages"));
    if (!wallet) {
      console.log("Wallet not connected");
      return;
    }

    if (!umi) {
      console.log("Umi not connected");
      return;
    }

    if (!umi) {
      console.log("Umi not connected");
      return;
    }

    const irysUploader = await WebUploader(WebSolana)
      .withProvider(wallet)
      .withRpc(connection.rpcEndpoint)
      .devnet();

    const images = getValues("assetImages").map((f: any) => {
      f.tags = [{ name: "Content-Type", value: "image/png" }];
      return f;
    });
    try {
      console.log("Ongoing");
      const receipt = await irysUploader.uploadFolder(images, {
        separateManifestTx: true,
      });
      console.log(`Files uploaded. Manifest ID ${receipt.id}`);
    } catch (e) {
      console.log("Error when uploading ", e);
    }

    const metadatas = getValues("assetsMetadata").map((f: any) => {
      f.tags = [{ name: "Content-Type", value: "application/json" }];
      return f;
    });

    try {
      console.log("Ongoing");
      const receipt = await irysUploader.uploadFolder(images, {
        separateManifestTx: true,
      });
      console.log(`Files uploaded. Manifest ID ${receipt.id}`);
    } catch (e) {
      console.log("Error when uploading ", e);
    }

    const collectionSigner = generateSigner(umi);
    const candyMachine = generateSigner(umi);

    const transaction = transactionBuilder();

    transaction.add(
      createCollectionV1(umi, {
        collection: collectionSigner,
        name: getValues("collectionName"),
        uri: "https://example.com/my-collection.json",
      })
    );

    transaction.add(
      await create(umi, {
        candyMachine,
        collection: collectionSigner.publicKey,
        collectionUpdateAuthority: umi.identity,
        itemsAvailable: getValues("assetImages").length,
        authority: umi.identity.publicKey,
        configLineSettings: {
          prefixName: "Example Asset #",
          nameLength: 50,
          prefixUri:
            "https://devnet.irys.xyz/Au7Z3FCRnDk6nmLgYKptax18DrqwHcwZ3bW9U3kMDq1n/",
          uriLength: 20,
          isSequential: true,
        },
        guards: {
          solPayment: some({
            lamports: sol(getValues("price")),
            destination: publicKey(getValues("royalties")[0].walletAddress),
          }),
          startDate: some({ date: dateTime(getValues("start")) }),
          // All other guards are disabled...
        },
      })
    );

    const tx = await transaction.sendAndConfirm(umi);
    console.log(tx);
    console.log(candyMachine.publicKey.toString());
    const test = await umi.rpc.getTransaction(tx.signature);

    console.log(test);
    // const stepValid = await trigger();
    // if (stepValid) {
    //   setPage(page + 1);
    // } else {
    //   console.log("Form State:", getValues());
    //   console.log("Form Errors:", trigger());
    // }
  };

  const formatStartDate = (start: string | Date) => {
    if (start instanceof Date) {
      return start.toLocaleDateString();
    }
    return start;
  };

  const formatEndDate = (end: Date | undefined) => {
    if (end instanceof Date) {
      return end.toLocaleDateString();
    }
    return "No end date set";
  };

  const royalties = getValues("royalties");

  return (
    <>
      <div className="font-semibold dm-sans leading-7 text-3xl text-white">
        Deploy
        <div className="mt-8">
          <div className="text-lg dm-sans font-semibold ">Overview</div>
          <div className="mt-5">
            <div className="text-base dm-sans font-normal">
              Collection Name:&nbsp;{getValues("collectionName")}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Collection Description:&nbsp;
              {getValues("collectionDescription")}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Collection Image:&nbsp;
              {getValues("collectionImage")?.name || "Not uploaded"}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Uploaded Images:&nbsp;
              {getValues("assetImages").length} images
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Uploaded Metadata:&nbsp;
              {getValues("assetsMetadata").length} files
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Price:&nbsp;
              {getValues("price")} SOL
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Start Date:&nbsp;
              {formatStartDate(getValues("start"))}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              End Date:&nbsp;
              {formatEndDate(getValues("end"))}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Reveal Later:&nbsp;
              {getValues("isRevealLaterEnabled") ? "Yes" : "No"}
            </div>
          </div>
          {Object.entries(royalties).map(([key, value], index) => (
            <div key={key} className="mt-2">
              <div className="mt-2">
                <div className="text-base dm-sans font-normal">
                  Wallet Address {index + 1}: &nbsp;
                  {value.walletAddress}
                </div>
              </div>
              <div className="mt-2">
                <div className="text-base dm-sans font-normal">
                  Royalty Percentage {index + 1}:&nbsp;
                  {value.royaltyPercentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 pt-5 ml-auto">
        <div className="flex justify-between">
          <Button
            onClick={prev}
            className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition-colors duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-0"
          >
            Back
          </Button>
          <Button
            onClick={onCreate}
            className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition-colors duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-0"
          >
            {isPending ? "Loading" : "Create"}
          </Button>
        </div>
      </div>
    </>
  );
}
