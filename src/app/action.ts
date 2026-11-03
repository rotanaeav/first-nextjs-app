"use server";

import { permanentRedirect, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPost(id:string) {
//   const id = ("id") as string;

  try {
    console.log(`Created Post ID: ${id} !`);
  } catch (e) {
    console.error("Error: ", e);
  }

  revalidatePath("/blogs");

  permanentRedirect(`/blogs/${id}`);
}