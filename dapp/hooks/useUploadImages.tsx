import { useMutation } from "@tanstack/react-query";
import useUmi from "@/hooks/useUmi";
import {
  createBrowserFileFromGenericFile,
  createGenericFileFromBrowserFile,
  generateSigner,
  some,
} from "@metaplex-foundation/umi";
import { createCollectionV1 } from "@metaplex-foundation/mpl-core";
import {
  addConfigLines,
  create,
} from "@metaplex-foundation/mpl-core-candy-machine";

interface IUploadImagesArgs {
  images: File[];
}

export default function useUploadImages() {
  const umi = useUmi();
  const mutation = useMutation({
    mutationFn: async (values: IUploadImagesArgs) => {
      if (umi) {
        const parsed = await Promise.all(
          values.images.map(
            async (image) => await createGenericFileFromBrowserFile(image)
          )
        );
        console.log(parsed);

        const response = await umi.uploader.upload(parsed);
        console.log(response);

        //  await createGenericFileFromBrowserFile([0]);
        // const candyMachine = generateSigner(umi);
        // const collection = generateSigner(umi);

        // console.log("candyMachine", candyMachine.publicKey.toString());
        // console.log("collection", collection.publicKey.toString());

        // return await createCollectionV1(umi, {
        //   collection: collection,
        //   name: values.collectionName,
        //   uri: "https://example.com/my-nft.json",
        // })
        //   .add(
        //     await create(umi, {
        //       candyMachine,
        //       collection: collection.publicKey,
        //       collectionUpdateAuthority: umi.identity,
        //       itemsAvailable: values.itemsAvailable,
        //       configLineSettings: some({
        //         prefixName: "Example Asset #",
        //         nameLength: 15,
        //         prefixUri: "https://example.com/metadata/",
        //         uriLength: 29,
        //         isSequential: false,
        //       }),
        //     })
        //   )
        //   .add(
        //     await addConfigLines(umi, {
        //       candyMachine: candyMachine.publicKey,
        //       index: 0,
        //       configLines: [{ name: "1", uri: "nft1.json" }],
        //     })
        //   )
        //   .sendAndConfirm(umi);
      }
    },
  });
  return { ...mutation };
}
