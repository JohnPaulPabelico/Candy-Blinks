import { useMutation } from "@tanstack/react-query";
import { API_INSTANCE } from "@/lib/http";
import axios from "axios";

interface IJoinWaitlistArgs {
  walletAddress: string;
}

export default function useJoinWaitlist() {
  const mutation = useMutation({
    mutationFn: async (args: IJoinWaitlistArgs) => {
      const response = await axios.post("api/whitelist", {
        walletAddress: args.walletAddress,
      });
    },
  });
  return { ...mutation };
}
