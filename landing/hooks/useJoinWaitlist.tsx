import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface IJoinWaitlistArgs {
  walletAddress: string;
}

export default function useJoinWaitlist() {
  const mutation = useMutation({
    mutationFn: async (args: IJoinWaitlistArgs) => {
      const { data } = await axios.post("api/whitelist", {
        walletAddress: args.walletAddress,
      });

      if (data.status === "fail") {
        throw new Error();
      }
    },
  });
  return { ...mutation };
}
