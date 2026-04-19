import Image from "next/image";
import Link from "next/link";
import { recipes } from "@/lib/recipes";

export default function HomePage() {
  return (
    <div className="page">
      <header className="topbar">
        <div className="mark">
          <span className="dot" />
          <span>R-Rezepte · Sammlung</span>
        </div>
        <div className="actions">
          <span>
            {recipes.length} Rezept{recipes.length === 1 ? "" : "e"}
          </span>
        </div>
      </header>

      <section className="index-hero">
        <div className="kicker reveal d1">Eine kleine Sammlung</div>
        <h1 className="reveal d2">
          Rezepte, in Ruhe
          <br />
          <em>gesetzt.</em>
        </h1>
        <p className="reveal d3">
          Jedes Rezept bekommt eine eigene, sorgfältig gestaltete Seite – mit
          skalierbaren Mengen, abhakbaren Schritten und einer Prise Typografie.
        </p>
      </section>

      <div className="recipe-list reveal d4">
        {recipes.map((r) => (
          <Link
            key={r.slug}
            href={`/rezepte/${r.slug}`}
            className={
              r.heroImage ? "recipe-card recipe-card--with-image" : "recipe-card"
            }
          >
            <div className="n">{r.number}</div>
            {r.heroImage && (
              <div className="thumb">
                <Image
                  src={r.heroImage.src}
                  alt={r.heroImage.alt}
                  width={r.heroImage.width}
                  height={r.heroImage.height}
                  sizes="120px"
                />
              </div>
            )}
            <div>
              <div className="meta-row">
                {r.category} · {r.totalTime} · {r.yieldBase} {r.yieldUnit}
              </div>
              <h2>{r.title}</h2>
            </div>
            <div className="arrow">→</div>
          </Link>
        ))}
      </div>

      <footer className="site-footer">
        <div>R-Rezepte</div>
        <div>Gesetzt in Fraunces &amp; Geist</div>
      </footer>
    </div>
  );
}
