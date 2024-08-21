// lib/blinkService.ts
import supabase from "./supabaseClient";

export const getBlinks = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("blinks")
      .select("*")
      .eq("clerk_user_id", userId);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Failed to fetch blinks: ", error);
    throw error;
  }
};

export const deleteBlink = async (id: number) => {
  try {
    const { error } = await supabase.from("blinks").delete().eq("id", id);

    if (error) throw error;

    return id;
  } catch (error) {
    console.error("Failed to delete blink: ", error);
    throw error;
  }
};

export const createBlink = async (
  candyMachineId: string,
  title: string,
  label: string,
  iconUrl: string,
  description: string,
  userId: string,
  currentTime: number
) => {
  try {
    const { data, error } = await supabase
      .from("blinks")
      .insert({
        candymachine_id: candyMachineId,
        title: title,
        label: label,
        image_url: iconUrl,
        description: description,
        created_at: currentTime,
        clerk_user_id: userId,
      })
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Failed to create blink: ", error);
    throw error;
  }
};

export const updateBlink = async (
  id: number,
  title: string,
  label: string,
  iconUrl: string,
  description: string,
) => {
  try {
    const { data, error } = await supabase
      .from("blinks")
      .update({
        title: title,
        label: label,
        image_url: iconUrl,
        description: description,
      })
      .eq("id", id)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Failed to update blink: ", error);
    throw error;
  }
};
