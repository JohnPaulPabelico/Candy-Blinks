import { useMutation } from "@tanstack/react-query";
import useUmi from "@/hooks/useUmi";
import { generateSigner, some } from "@metaplex-foundation/umi";
import { createCollectionV1 } from "@metaplex-foundation/mpl-core";
import { create } from "@metaplex-foundation/mpl-core-candy-machine";

export default function useCreateCandyMachine() {
  const umi = useUmi();
  const mutation = useMutation({
    mutationFn: async () => {
      if (umi) {
        const candyMachine = generateSigner(umi);
        const collection = generateSigner(umi);

        console.log("candyMachine", candyMachine.publicKey.toString());
        console.log("collection", collection.publicKey.toString());

        return await createCollectionV1(umi, {
          collection: collection,
          name: "My NFT",
          uri: "https://example.com/my-nft.json",
        })
          .add(
            await create(umi, {
              candyMachine,
              collection: collection.publicKey,
              collectionUpdateAuthority: umi.identity,
              itemsAvailable: 10,
              configLineSettings: some({
                prefixName: "Example Asset #",
                nameLength: 15,
                prefixUri: "https://example.com/metadata/",
                uriLength: 29,
                isSequential: false,
              }),
            })
          )
          .sendAndConfirm(umi);
      }
    },
  });
  return { ...mutation };
}
