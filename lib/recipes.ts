export type Ingredient = {
  amount: number;
  unit: string;
  text: string;
  note?: string;
};

export type IngredientGroup = {
  title: string;
  items: Ingredient[];
};

export type StepSection = {
  roman: string;
  title: string;
  steps: string[];
};

export type Tip = {
  title: string;
  text: string;
};

export type RecipeImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Recipe = {
  slug: string;
  number: string;
  category: string;
  kicker: string;
  title: string;
  titleLines: string[];
  shortTitle: string;
  description: string;
  totalTime: string;
  cookTime: string;
  yieldBase: number;
  yieldUnit: string;
  cuisine: string;
  heroImage?: RecipeImage;
  ingredientGroups: IngredientGroup[];
  stepSections: StepSection[];
  tips: Tip[];
  source?: { label: string; href: string };
  schema: {
    description: string;
    keywords: string;
    prepTime: string;
    cookTime: string;
    totalTime: string;
    author: string;
    isBasedOn?: string;
  };
};

export const recipes: Recipe[] = [
  {
    slug: "himbeer-cheesecake-cookies",
    number: "01",
    category: "Dessert",
    kicker: "Cookies · Gebackenes · Süßes",
    title: "Himbeer-Cheesecake-Cookies mit weißer Schokolade",
    titleLines: ["Himbeer", "Cheesecake", "*Cookies*"],
    shortTitle: "Himbeer-Cheesecake-Cookies",
    description:
      "Weiche, buttrige Zuckercookies mit echten Himbeerstreifen, umhüllen einen Kern aus cremiger Cheesecake-Füllung mit weißer Schokolade. Wie ein Stück Käsekuchen – nur handlich.",
    totalTime: "2 Std 11 Min",
    cookTime: "11 – 12 Min",
    yieldBase: 20,
    yieldUnit: "Stück",
    cuisine: "Amerikanisch",
    heroImage: {
      src: "/rezepte/himbeer-cheesecake-cookies.png",
      alt: "Vier Himbeer-Cheesecake-Cookies auf einem hellen Keramikteller, einer aufgebrochen, mit cremigem weißem Schokoladen-Frischkäsekern, Himbeerstreifen, frischen Himbeeren und weißen Schokostücken auf Leinentuch.",
      width: 1024,
      height: 1536,
    },
    ingredientGroups: [
      {
        title: "Cheesecake-Füllung",
        items: [
          { amount: 142, unit: "g", text: "Frischkäse, kalt" },
          {
            amount: 113,
            unit: "g",
            text: "weiße Schokolade, geschmolzen & leicht abgekühlt",
          },
        ],
      },
      {
        title: "Himbeermarmelade",
        items: [
          { amount: 200, unit: "g", text: "frische Himbeeren" },
          { amount: 30, unit: "g", text: "Zucker" },
        ],
      },
      {
        title: "Cookie-Teig",
        items: [
          { amount: 344, unit: "g", text: "Mehl (Type 405)" },
          { amount: 0.5, unit: " TL", text: "Backpulver" },
          { amount: 0.5, unit: " TL", text: "Natron" },
          { amount: 0.5, unit: " TL", text: "Salz" },
          { amount: 120, unit: "g", text: "Zucker" },
          { amount: 180, unit: "g", text: "Butter, sehr weich" },
          { amount: 1, unit: "", text: "Ei (größer), zimmerwarm" },
          { amount: 2, unit: " TL", text: "Vanilleextrakt" },
          { amount: 50, unit: "g", text: "Zucker", note: "(zum Wälzen)" },
        ],
      },
    ],
    stepSections: [
      {
        roman: "I",
        title: "Cheesecake-Füllung",
        steps: [
          "Ein kleines Backblech mit Backpapier auslegen.",
          "Frischkäse in eine Schüssel geben und mit dem Handmixer ca. 1 Minute auf mittlerer bis hoher Stufe glatt rühren.",
          "Die geschmolzene, leicht abgekühlte weiße Schokolade dazugeben und auf mittlerer Stufe unterrühren, bis alles glatt ist. Falls die Masse gerinnt – die Schokolade war dann zu warm –, kurz ruhen lassen und erneut rühren, bis sie wieder zusammenkommt.",
          "20 Portionen à 2 TL auf das Blech setzen und mit dem Löffelrücken leicht flachdrücken – sie sollen wie dünne Taler aussehen, nicht wie Kugeln.",
          "Vollständig im Gefrierfach durchfrieren lassen.",
        ],
      },
      {
        roman: "II",
        title: "Himbeermarmelade",
        steps: [
          "Himbeeren in einen mittelgroßen Topf geben und bei mittlerer bis niedriger Hitze ca. 5 Minuten erwärmen. Am Anfang zerdrücken, bis die Beeren zerfallen und flüssig werden.",
          "Durch ein Sieb in eine Schüssel passieren – kräftig andrücken, um die Kerne loszuwerden. Du solltest etwa 105 ml Flüssigkeit erhalten.",
          "Flüssigkeit zurück in den Topf (vom Herd) geben und den Zucker einrühren.",
          "Bei mittlerer Hitze einkochen, bis die Marmelade dick ist. Am Ende sollten etwa 45 ml übrig sein.",
          "Vom Herd nehmen und im Kühlschrank abkühlen lassen, während du am Teig arbeitest.",
        ],
      },
      {
        roman: "III",
        title: "Cookies",
        steps: [
          "Ofen auf 175 °C (Ober-/Unterhitze) vorheizen. Zwei Bleche mit Backpapier belegen.",
          "In einer Schüssel Mehl, Backpulver, Natron und Salz verquirlen. Beiseitestellen.",
          "Weiche Butter und Zucker in einer großen Schüssel mit dem Handmixer auf hoher Stufe ca. 2 Minuten cremig aufschlagen, bis die Masse fluffig ist.",
          "Ei und Vanille dazugeben und auf mittlerer Stufe 1–2 Minuten weiterrühren, bis die Masse hell und sehr fluffig ist.",
          "Trockene Zutaten dazugeben und auf niedriger Stufe nur kurz unterrühren, bis alles verbunden ist.",
          "¾ des Teigs an den Rand der Schüssel schieben, ¼ am Boden flach drücken und ¼ der Marmelade darauf verteilen. Wieder ¼ Teig drüber, wieder ¼ Marmelade. Zweimal wiederholen. Ziel: die Marmelade gleichmäßig verteilen, ohne dass sie komplett einzieht.",
          "Den Teig mit einem Teigschaber in Vierteln grob zusammenfalten – die Marmelade soll Streifen und kleine Taschen bilden, nicht vollständig einziehen.",
          "Mit einem 2-EL-Cookie-Scoop 20 Portionen abstechen. Jede leicht flach drücken, mittig einen gefrorenen Cheesecake-Taler einsetzen und komplett mit Teig umschließen. Zu leicht abgeflachten Scheiben formen – Kugeln laufen schlechter aus.",
          "Jede Scheibe in Zucker wälzen. Die übrigen Cheesecake-Taler bis zum Einsatz im Gefrierfach lassen.",
          "Jeweils 6 Cookies pro Blech 11–12 Minuten backen. Tipp: direkt nach dem Ofen einen runden Ausstecher um jeden Cookie kreisen lassen, für eine perfekte Form.",
          "10 Minuten auf dem Blech ruhen lassen, dann auf ein Gitter umsetzen und vollständig auskühlen lassen. Servieren – am besten noch mit einem Rest warmem Kern.",
        ],
      },
    ],
    tips: [
      {
        title: "Marmelade selbst kochen",
        text: "Gekaufte Marmelade ist zu flüssig – der Teig verläuft beim Backen und der Himbeergeschmack bleibt schwach. Die selbstgemachte ist der Punkt am Rezept.",
      },
      {
        title: "Taler komplett durchfrieren",
        text: "Die Cheesecake-Taler müssen hart gefroren sein, sonst läuft die Füllung beim Backen aus. Immer nur die Taler aus dem Gefrierfach holen, die du gerade brauchst.",
      },
      {
        title: "Butter sehr weich",
        text: "So weich, dass du mühelos mit dem Finger reindrücken kannst. Zu feste Butter lässt sich nicht richtig cremig aufschlagen – die Cookies werden dann dicht statt luftig.",
      },
      {
        title: "Butter weiter reduzieren",
        text: "Mit einem größeren Ei (L statt M) funktionieren vermutlich auch 160g Butter – die zusätzliche Flüssigkeit aus dem Ei gleicht den Unterschied aus. Muss noch getestet werden.",
      },
      {
        title: "Vollständig auskühlen lassen",
        text: "Erst beim Abkühlen wird der Cheesecake-Kern fest. Warm aus dem Ofen schmeckt zwar verführerisch, aber die Textur braucht Zeit.",
      },
      {
        title: "Aufbewahrung",
        text: "In einer luftdichten Dose im Kühlschrank bis zu 3 Tage. Eingefroren bis zu 2 Wochen. Vor dem Essen auf Zimmertemperatur bringen.",
      },
      {
        title: "Teig braucht keine Kühlzeit",
        text: "Du kannst direkt backen. Wenn du einen Tag vorbereitest: Teig vor dem Portionieren kurz auf Zimmertemperatur kommen lassen.",
      },
    ],
    source: { label: "inbloombakery.com", href: "https://inbloombakery.com" },
    schema: {
      description:
        "Weiche, saftige Zuckercookies mit Himbeerstreifen, gefüllt mit cremiger Cheesecake-Füllung aus weißer Schokolade – schmeckt wie Cheesecake in Keksform.",
      keywords:
        "Himbeere, weiße Schokolade, Cheesecake, Cookies, Kekse, Dessert",
      prepTime: "PT1H",
      cookTime: "PT12M",
      totalTime: "PT2H11M",
      author: "In Bloom Bakery",
      isBasedOn: "https://inbloombakery.com",
    },
  },
];

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

const fractions: Record<string, string> = {
  "0.25": "¼",
  "0.5": "½",
  "0.75": "¾",
  "0.33": "⅓",
  "0.67": "⅔",
};

export function formatAmount(amount: number, unit: string): string {
  const rounded = Math.round(amount * 100) / 100;
  const intPart = Math.floor(rounded);
  const dec = +(rounded - intPart).toFixed(2);
  const frac = fractions[dec.toString()];
  const suffix = unit && !unit.startsWith(" ") ? " " + unit : unit;
  if (frac) {
    const main = (intPart ? intPart + " " : "") + frac;
    return main + suffix;
  }
  if (rounded >= 10) return Math.round(rounded).toString() + suffix;
  return rounded.toString().replace(".", ",") + suffix;
}

export function ingredientDisplay(ing: Ingredient): string {
  const amt = formatAmount(ing.amount, ing.unit);
  return `${amt} ${ing.text}${ing.note ? " " + ing.note : ""}`.trim();
}

export function schemaIngredients(recipe: Recipe): string[] {
  return recipe.ingredientGroups.flatMap((g) =>
    g.items.map((it) => ingredientDisplay(it))
  );
}

export function schemaInstructions(recipe: Recipe) {
  return recipe.stepSections.map((s) => ({
    "@type": "HowToSection",
    name: s.title,
    itemListElement: s.steps.map((text) => ({ "@type": "HowToStep", text })),
  }));
}
