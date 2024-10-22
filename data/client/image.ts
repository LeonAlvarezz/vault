import { createClient } from "@/lib/supabase/client";
import { getUser } from "../server/profiles";

export async function uploadImage(image: File) {
  const supabase = createClient();
  const user = await getUser(supabase);
  const { data, error } = await supabase.storage
    .from("note-images")
    .upload(`image/${user?.email}/${image.name}`, image, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return {
      error: error,
    };
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from("note-images").getPublicUrl(data.path);

  return {
    publicUrl,
    error,
  };
}
