export const instant =false;
import { Suspense } from "react";
type PostResponse = {
    id:number;
    title: string;
}
export default async function PostPage() {
  //using fetch api
  const ressponse = await fetch("https://dummyjson.com/posts"); //locate api url
  const data = await ressponse.json(); //convert json to obj
  console.log("Data : ", data);

  return (
    <div>
      {data.posts.map((p:PostResponse) => (
        <h1 key={p.id}>{p.title}</h1>
      ))}
    </div>
  );
}
