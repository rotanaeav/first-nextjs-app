import ProductCard from "@/components/ProductCard";
import { Products } from "@/lib/product";

export default function page() {
  return (
    <>
      {/* <ProductCard
        title="Iphone 18"
        image="https://www.istorm.gr/cdn/shop/files/IMG-21452228_m_jpeg_1_ab294e06-48d6-4f4f-b0af-b8423ea0e9eb.jpg?v=1788983098&width=1920"
        description="Iphone 18 is the Apple Iphone devices ."
        price={999}
      /> */}
      <div className="grid grid-cols-4">
        {Products.map(({ title, image, description, price }) => (
          <ProductCard
            key={title}
            title={title}
            image={image}
            description={description}
            price={price}
          />
        ))}
      </div>
    </>
  );
}
