"use server";

import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert(formData, author)
    .select();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create companion.");
  }

  return data[0];
};
