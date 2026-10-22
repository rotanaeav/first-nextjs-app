// export default function ProductCard() {
//   // declare variable
//   const image =
//     "https://www.istorm.gr/cdn/shop/files/IMG-21452228_m_jpeg_1_ab294e06-48d6-4f4f-b0af-b8423ea0e9eb.jpg?v=1788983098&width=1920";
//   const title = "Iphone 18 Pro Max";
//   const description = "Iphone 18 is iphone latest of Apple .";
//   const price = 999;
//   return (
//     <section className="w-[320px]">
//       <img src={image} alt="" />
//       <div className="bg-red-200 p-5">
//         <h2>{title}</h2>
//         <p>{description}</p>
//         <div className="flex justify-between">
//           <p>{price > 1000 ? price : 1000}$</p>
//           <button>Add To Cart</button>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Product } from "@/lib/product";

export default function ProductCard(props: Product) {
  return (
    <section className="w-75 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <img
        width={300}
        height={300}
        src={props.image}
        alt={props.title}
        className="h-75 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          {props.title}
        </h2>

        <p className="line-clamp-2 text-sm leading-6 text-gray-500">
          {props.description}
        </p>

        <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
          <p className="text-xl font-bold text-gray-900">
            ${props.price > 1000 ? props.price : 1000}
          </p>

          <button className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 active:scale-95">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
