'use client'
import React from "react";
import useSWR from "swr";
// client component with SWR
const fetcher = (...args) => fetch(...args).then((res) => res.json());
type productType = {
  id: number;
  title: string;
};
export default function ProductCardComponent() {
  // in useSWR hook has 3 stage : 1. data , 2. error , 3. isLoading(suspense)
  // const { data, error, isLoading } = useSWR(
  //   "https://dummyjson.com/product",
  //   fetcher,
  // );

  //replace with api route :  to hide url : 
    const { data, error, isLoading } = useSWR(
    '/api/productSwr',
    fetcher,
  );
  if (error) return <div>Error....!</div>;
  if (isLoading) return <div>is Loading...!</div>;
  return (
    <div>
      {data.products.map((p:productType) => (
        <h1 key={p.id}>{p.title}</h1>
      ))}
    </div>
  );
}
