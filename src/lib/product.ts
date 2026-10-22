export type Product = {
  title: string;
  description: string;
  image: string;
  price: number;
};

export const Products: Product[] = [
  {
    title: "Classic Cheeseburger",
    description:
      "Juicy grilled beef patty topped with melted cheddar cheese, lettuce, tomato, pickles, sauce.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnY5hG51JtHAfTvy0QCG6K49BtqWP6l9pbMv5y4Wq5XuawFOBWyfWdEXSV&s=10",
    price: 8.99,
  },
  {
    title: "Bacon BBQ Burger",
    description:
      "Double crispy smash patties layered with smoky bacon, American cheese, crispy onion rings, sauce.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxbvmAy6vdM4rtxhizowWRN3jLEO09eernbKtI6LZbd4O5i9s4FxLQC44&s=10",
    price: 11.5,
  },
  {
    title: "Spicy Chicken Burger",
    description:
      "Crispy fried buttermilk chicken breast tossed in hot cayenne glaze, topped with creamy.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhmwSbu2hmh5RV5_ZMO05ou9onjAnr3JpTV1r3n5HHg&s=10",
    price: 10.0,
  },
  {
    title: "Mushroom Swiss Burger",
    description:
      "Flame-grilled Angus beef topped with sautéed wild mushrooms, Swiss cheese.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWl6zcFDB-ZO6pU3kpVTI5f3Zt-Xs2O2UsODsuzcUEYA&s=10",
    price: 13.99,
  },
];
