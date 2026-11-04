import RecipeCardList from '@/components/recipe/RecipeCardList'
import RecipeCard from '@/components/recipe/RecipeCardList'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense>
        <RecipeCardList/>
    </Suspense>
  )
}
