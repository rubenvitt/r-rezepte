"use client";

import Link from "next/link";
import { useState } from "react";
import {
  formatAmount,
  type Ingredient,
  type Recipe,
} from "@/lib/recipes";

type Props = { recipe: Recipe };

export default function RecipeView({ recipe }: Props) {
  const [servings, setServings] = useState(recipe.yieldBase);
  const [toast, setToast] = useState<string | null>(null);
  const [doneIngredients, setDoneIngredients] = useState<Set<string>>(
    new Set()
  );
  const [doneSteps, setDoneSteps] = useState<Set<string>>(new Set());

  const factor = servings / recipe.yieldBase;

  const toggle = (set: Set<string>, key: string) => {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    return next;
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const onShare = async () => {
    const data = {
      title: recipe.title,
      text: recipe.shortTitle,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      const nav = typeof navigator !== "undefined" ? navigator : undefined;
      if (nav?.share) {
        await nav.share(data);
      } else if (nav?.clipboard) {
        await nav.clipboard.writeText(data.url);
        showToast("Link kopiert");
      }
    } catch {
      /* user cancelled */
    }
  };

  let stepCounter = 0;

  return (
    <div className="page">
      <header className="topbar">
        <div className="mark">
          <span className="dot" />
          <Link href="/">R-Rezepte</Link>
          <span>
            · Rezept №&nbsp;{recipe.number} · {recipe.category}
          </span>
        </div>
        <div className="actions">
          <button
            type="button"
            className="chip"
            onClick={onShare}
            title="Teilen"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="5" r="2.5" />
              <circle cx="18" cy="19" r="2.5" />
              <line x1="8" y1="11" x2="16" y2="6" />
              <line x1="8" y1="13" x2="16" y2="18" />
            </svg>
            Teilen
          </button>
          <button
            type="button"
            className="chip"
            onClick={() => window.print()}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z" />
            </svg>
            Drucken
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="kicker reveal d1">{recipe.kicker}</div>
        <h1 className="title reveal d2">
          {recipe.titleLines.map((line, i) => {
            const italic = line.startsWith("*") && line.endsWith("*");
            const text = italic ? line.slice(1, -1) : line;
            return (
              <span key={i}>
                {italic ? <em>{text}</em> : text}
                {i < recipe.titleLines.length - 1 && <br />}
              </span>
            );
          })}
        </h1>
        <p className="sub reveal d3">
          <span className="drop">{recipe.description.charAt(0)}</span>
          {recipe.description.slice(1)}
        </p>

        <div className="meta reveal d4">
          <div>
            <div className="label">Gesamtzeit</div>
            <div className="value">{recipe.totalTime}</div>
          </div>
          <div>
            <div className="label">Backzeit</div>
            <div className="value">{recipe.cookTime}</div>
          </div>
          <div>
            <div className="label">Ergibt</div>
            <div className="value">
              {servings} {recipe.yieldUnit}
            </div>
          </div>
          <div>
            <div className="label">Küche</div>
            <div className="value">{recipe.cuisine}</div>
          </div>
        </div>
      </section>

      <div className="body">
        <aside className="ingredients">
          <div className="section-label">Mise en place</div>
          <h2 className="section-head">Zutaten</h2>

          <div className="servings">
            <button
              type="button"
              aria-label="Weniger Portionen"
              onClick={() =>
                setServings((s) => (s > 4 ? s - 4 : s))
              }
            >
              −
            </button>
            <div className="qty">{servings}</div>
            <div className="lbl">
              {recipe.yieldUnit} · skaliert die Mengen automatisch
            </div>
            <button
              type="button"
              aria-label="Mehr Portionen"
              onClick={() =>
                setServings((s) => (s < 80 ? s + 4 : s))
              }
            >
              +
            </button>
          </div>

          {recipe.ingredientGroups.map((group) => (
            <div className="ing-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="ing-list">
                {group.items.map((item, i) => {
                  const key = `${group.title}:${i}`;
                  const done = doneIngredients.has(key);
                  return (
                    <li
                      key={key}
                      className={done ? "done" : undefined}
                      onClick={() =>
                        setDoneIngredients((s) => toggle(s, key))
                      }
                    >
                      <span className="check" />
                      <IngredientText ingredient={item} factor={factor} />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>

        <main className="steps-wrap">
          <div className="section-label">Zubereitung</div>
          <h2 className="section-head">
            So geht&apos;s <em>Schritt für Schritt</em>
          </h2>

          {recipe.stepSections.map((section, si) => (
            <section className="step-section" key={section.title}>
              <div className="sect-lead">
                — {section.roman} —&nbsp; {section.title}
              </div>
              {section.steps.map((text, i) => {
                stepCounter += 1;
                const key = `${si}:${i}`;
                const done = doneSteps.has(key);
                const num = stepCounter.toString().padStart(2, "0");
                return (
                  <div
                    key={key}
                    className={done ? "step done" : "step"}
                    onClick={() =>
                      setDoneSteps((s) => toggle(s, key))
                    }
                  >
                    <div className="step-num">{num}</div>
                    <div className="step-text">{text}</div>
                  </div>
                );
              })}
            </section>
          ))}

          <svg
            className="flourish"
            width="160"
            height="20"
            viewBox="0 0 160 20"
            fill="none"
          >
            <path d="M0 10 H60" stroke="currentColor" strokeWidth="1" />
            <circle cx="80" cy="10" r="4" fill="currentColor" />
            <path d="M100 10 H160" stroke="currentColor" strokeWidth="1" />
          </svg>

          <aside className="tips">
            <div className="sect-lead">— Hinweise aus der Backstube —</div>
            <h2>
              Damit es <em>wirklich</em> gelingt
            </h2>
            <div className="tip-grid">
              {recipe.tips.map((tip, i) => (
                <div className="tip" key={tip.title}>
                  <div className="num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <b>{tip.title}</b>
                    <p>{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </main>
      </div>

      <footer className="site-footer">
        <div>
          {recipe.source ? (
            <>
              Quelle ·{" "}
              <a
                href={recipe.source.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {recipe.source.label}
              </a>
            </>
          ) : (
            <Link href="/">Zurück zur Übersicht</Link>
          )}
        </div>
        <div>Gesetzt in Fraunces &amp; Geist</div>
      </footer>

      <div className={toast ? "toast on" : "toast"}>{toast}</div>
    </div>
  );
}

function IngredientText({
  ingredient,
  factor,
}: {
  ingredient: Ingredient;
  factor: number;
}) {
  const amount = formatAmount(ingredient.amount * factor, ingredient.unit);
  return (
    <span className="text">
      <span className="amount">{amount}</span> {ingredient.text}
      {ingredient.note ? <span className="note"> {ingredient.note}</span> : null}
    </span>
  );
}
