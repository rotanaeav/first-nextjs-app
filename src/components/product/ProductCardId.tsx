"use client";
import React from "react";
import useSWR from "swr";
// client component with SWR
// add type to it for ts
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
type productType = {
  id: string;
  title: string;
};
type idType = {
  id: string;
};
export default function ProductId({ id }: idType) {
  // in useSWR hook has 3 stage : 1. data , 2. error , 3. isLoading(suspense)
  // const { data, error, isLoading } = useSWR(
  //   "https://dummyjson.com/product",
  //   fetcher,
  // );

  //replace with api route :  to hide url :
  const { data, error, isLoading } = useSWR(`/api/productSwr/${id}`, fetcher);
  if (error) return <div>Error....!</div>;
  if (isLoading) return <div>is Loading...!</div>;
  return (
    <div>
      {/* {data.products.map((p:productType) => (
        <h1 key={p.id}>{p.title}</h1>
      ))} */}
      <h1>{data.title}</h1>
    </div>
  );
}
