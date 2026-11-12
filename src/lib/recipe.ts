export type RecipeDetail = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags?: string[];
  image: string;
  rating: number;
  reviewCount?: number;
};

export async function getRecipe(id: string): Promise<RecipeDetail | null> {
  try {
    const res = await fetch(`https://dummyjson.com/recipes/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch recipe:", error);
    return null;
  }
}
