
import TeachFetchList from "@/components/TeachFetchList";
import { error } from "console";
import { Suspense } from "react";
//resolve promise
const getProducts = () =>
  fetch("https://dummyjson.com/product")
    .then((response) => response.json())
    .then((productData) => productData.products)
    .catch((error) => error);

export default function Page() {
  const p = getProducts();
  return (
    <Suspense fallback="Loading ......!">
      <div>
        <TeachFetchList products={p} />
      </div>
    </Suspense>
  );
}
