'use client'

// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";

// export default async function createPost(id: string) {
//   try {
//     // Call database
//   } catch (error) {
//     // Handle errors
//   }

//   revalidatePath("/posts"); // Update cached posts
//   redirect(`/post/${id}`); // Navigate to the new post page
// }

// ("use server");

// import { permanentRedirect } from "next/navigation";
// import { revalidateTag } from "next/cache";

// export async function updateUsername(username: string, formData: FormData) {
//   try {
//     // Call database
//   } catch (error) {
//     // Handle errors
//   }

//   revalidateTag("username", "max"); // Update all references to the username
//   permanentRedirect(`/profile/${username}`); // Navigate to the new user profile
// }

import { useRouter } from "next/navigation";

export default function RedirectComponent() {
  const router = useRouter();

  return (
    <button
      className="bg-amber-50 p-4 cursor-pointer"
      type="button"
      onClick={() => router.push("/dashboard")}
    >
      Dashboard
    </button>
  );
}
