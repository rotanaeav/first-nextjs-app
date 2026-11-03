import React from "react";
import { createPost } from "../action";

export default function BlogsPage() {
  return (
    <form action={createPost.bind(null, "1")}>
      <button className="bg-amber-50 p-4 cursor-pointer" type="submit">
        Create Post ID : 1
      </button>
    </form>
  );
}
