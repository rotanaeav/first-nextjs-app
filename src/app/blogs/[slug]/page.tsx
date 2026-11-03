// export const instant = false;
 'use cache'
export async function generateStaticParams() {
  const data = await fetch("https://dummyjson.com/posts").then((res) =>
    res.json(),
  );

  return data.posts.map((post: { id: number }) => ({
    slug: String(post.id),
  }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: { id: string; title: string } = await fetch(
    `https://dummyjson.com/posts/${slug}`,
  ).then((res) => res.json());
  return (
    <div>
      <div>My Post: {post.id}</div>
      <h1>Title : {post.title}</h1>
    </div>
  );
}
