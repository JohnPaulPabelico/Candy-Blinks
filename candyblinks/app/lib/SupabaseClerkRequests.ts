import { useState, useEffect } from "react";
import { useSupabaseClient } from "./supabaseClerkClient";

export function useFetchBlinks(userId: string) {
  const supabase = useSupabaseClient();
  const [blinks, setBlinks] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBlinks = async () => {
      try {
        const { data, error } = await supabase
          .from("blinks")
          .select("*")
          .eq("user_id", userId);

        if (error) throw error;

        setBlinks(data || []);
      } catch (error) {
        console.error("Failed to fetch blinks: ", error);
      }
    };

    fetchBlinks();
  }, [supabase, userId]);

  return { blinks, error };
}
