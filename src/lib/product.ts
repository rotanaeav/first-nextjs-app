export type Product = {
  id?: string;
  title: string;
  description: string;
  image: string;
  price: number;
};

// Global in-memory product store
export let Products: Product[] = [
  {
    id: "1",
    title: "Classic Cheeseburger",
    description:
      "Juicy grilled beef patty topped with melted cheddar cheese, lettuce, tomato, pickles, sauce.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnY5hG51JtHAfTvy0QCG6K49BtqWP6l9pbMv5y4Wq5XuawFOBWyfWdEXSV&s=10",
    price: 8.99,
  },
  {
    id: "2",
    title: "Bacon BBQ Burger",
    description:
      "Double crispy smash patties layered with smoky bacon, American cheese, crispy onion rings, sauce.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxbvmAy6vdM4rtxhizowWRN3jLEO09eernbKtI6LZbd4O5i9s4FxLQC44&s=10",
    price: 11.5,
  },
  {
    id: "3",
    title: "Spicy Chicken Burger",
    description:
      "Crispy fried buttermilk chicken breast tossed in hot cayenne glaze, topped with creamy.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhmwSbu2hmh5RV5_ZMO05ou9onjAnr3JpTV1r3n5HHg&s=10",
    price: 10.0,
  },
  {
    id: "4",
    title: "Mushroom Swiss Burger",
    description:
      "Flame-grilled Angus beef topped with sautéed wild mushrooms, Swiss cheese.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWl6zcFDB-ZO6pU3kpVTI5f3Zt-Xs2O2UsODsuzcUEYA&s=10",
    price: 13.99,
  },
];

export function getProductById(id: string): Product | undefined {
  return Products.find(
    (p) => p.id === id || p.title.toLowerCase().replace(/\s+/g, "-") === id,
  );
}

export function addProduct(product: Omit<Product, "id"> & { id?: string }): Product {
  const newProduct: Product = {
    ...product,
    id: product.id || String(Date.now()),
  };
  Products.unshift(newProduct);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const index = Products.findIndex(
    (p) => p.id === id || p.title.toLowerCase().replace(/\s+/g, "-") === id,
  );
  if (index === -1) return null;
  Products[index] = { ...Products[index], ...updates };
  return Products[index];
}

export function deleteProduct(id: string): boolean {
  const initialLength = Products.length;
  Products = Products.filter(
    (p) => p.id !== id && p.title.toLowerCase().replace(/\s+/g, "-") !== id,
  );
  return Products.length < initialLength;
}
