import { useMutation } from "@tanstack/react-query";
import { API_INSTANCE } from "@/lib/http";

interface IJoinWaitlistArgs {
  walletAddress: string;
}

export default function useJoinWaitlist() {
  const mutation = useMutation({
    mutationFn: async (args: IJoinWaitlistArgs) => {
      const response = await API_INSTANCE.post("api/v1/whitelists", {
        walletAddress: args.walletAddress,
      });
    },
  });
  return { ...mutation };
}
