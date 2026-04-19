import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecipeView from "@/components/RecipeView";
import {
  getRecipe,
  recipes,
  schemaIngredients,
  schemaInstructions,
} from "@/lib/recipes";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(
  props: PageProps<"/rezepte/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const recipe = getRecipe(slug);
  if (!recipe) return {};
  const images = recipe.heroImage ? [recipe.heroImage.src] : undefined;
  return {
    title: recipe.title,
    description: recipe.schema.description,
    openGraph: {
      type: "article",
      title: recipe.title,
      description: recipe.schema.description,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.schema.description,
      ...(images ? { images } : {}),
    },
  };
}

export default async function RecipePage(
  props: PageProps<"/rezepte/[slug]">
) {
  const { slug } = await props.params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.schema.description,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine,
    keywords: recipe.schema.keywords,
    recipeYield: `${recipe.yieldBase} ${recipe.yieldUnit}`,
    prepTime: recipe.schema.prepTime,
    cookTime: recipe.schema.cookTime,
    totalTime: recipe.schema.totalTime,
    inLanguage: "de-DE",
    author: { "@type": "Organization", name: recipe.schema.author },
    ...(recipe.schema.isBasedOn ? { isBasedOn: recipe.schema.isBasedOn } : {}),
    ...(recipe.heroImage ? { image: [recipe.heroImage.src] } : {}),
    recipeIngredient: schemaIngredients(recipe),
    recipeInstructions: schemaInstructions(recipe),
  };

  const jsonLdString = JSON.stringify(jsonLd)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
      <RecipeView recipe={recipe} />
    </>
  );
}
