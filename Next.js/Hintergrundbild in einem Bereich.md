
Okay, verstanden. Du möchtest das Hintergrundbild nicht auf der ganzen Seite, sondern **nur im Bereich der Feature Cards** haben. Das ist auch sehr gut machbar!

Wir entfernen die Hintergrundbild-Klassen aus dem `app/layout.js` (oder stellen sicher, dass sie dort nicht sind) und fügen sie stattdessen gezielt zu dem `<section>`-Element hinzu, das die Features enthält.

**Schritt 1: Hintergrundbild aus dem Layout entfernen (falls vorhanden)**

1.  Öffne `app/layout.js`.
2.  **Entferne** die folgenden Klassen von der `<body>`-Tag, falls du sie im vorherigen Schritt hinzugefügt hast:
    *   `bg-[url('/background.jpg')]`
    *   `bg-cover`
    *   `bg-center`
    *   `bg-fixed`
    *   `bg-no-repeat`
    *   (Du kannst `min-h-screen` und andere Layout-Klassen dort lassen, wenn gewünscht).

    Die `<body>`-Tag sollte danach wieder einfacher aussehen, z.B.:
    ```javascript
    // app/layout.js
    // ... imports ...
    export default function RootLayout({ children }) {
      return (
        <html lang="de">
          <body className={`${inter.className} min-h-screen`}> {/* Beispiel ohne BG-Image */}
            {children}
          </body>
        </html>
      )
    }
    ```

**Schritt 2: Bild vorbereiten und platzieren (falls noch nicht geschehen)**

1.  Wähle ein Bild speziell für diesen Abschnitt (nennen wir es `features-bg.jpg`).
2.  Platziere es im `public`-Ordner: `public/features-bg.jpg`.

**Schritt 3: Hintergrundbild zur Features-Sektion hinzufügen (`app/page.js`)**

1.  Öffne `app/page.js`.
2.  Finde das `<section id="features" ...>`-Element.
3.  **Füge die Tailwind-Klassen für das Hintergrundbild direkt zu diesem `<section>`-Element hinzu.** Entferne gleichzeitig eventuell vorhandene *Farb*-Hintergrundklassen (wie `bg-gray-100` oder `bg-white`), damit das Bild sichtbar wird.

    ```javascript
    // app/page.js
    // ... imports ...
    import Hero from '../components/Hero';
    import FeatureCard from '../components/FeatureCard';
    import Footer from '../components/Footer';
    // ...

    export default function LandingPage() {
      return (
        <div>
          <Hero />

          {/* Features Section - HIER die Klassen für das Hintergrundbild hinzufügen */}
          <section
            id="features"
            className="
              py-16                     /* Vertikales Padding beibehalten */
              /* --- Hintergrundbild-Klassen für DIESE Sektion --- */
              bg-[url('/features-bg.jpg')] /* Pfad zu deinem spezifischen Bild */
              bg-cover                  /* Bild soll den Bereich bedecken */
              bg-center                 /* Bild zentrieren */
              bg-no-repeat              /* Nicht kacheln */
              /* bg-fixed HIER normalerweise NICHT verwenden, damit der Hintergrund mit der Sektion scrollt */
            "
          >
            <div className="container mx-auto px-4 relative z-10"> {/* z-10 optional, falls Inhalt hinter etwas anderem verschwindet */}

              {/* Überschrift - Textfarbe an das NEUE Hintergrundbild anpassen! */}
              <h2 className="text-3xl font-bold text-center mb-12 text-white md:text-gray-100"> {/* Beispiel: Weißer Text für dunkles Bild */}
                Unsere Top-Features
              </h2>

              {/* Grid für die Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature Cards - Diese haben ihren EIGENEN weißen Hintergrund */}
                {/* Das ist gut, denn so bleibt ihr Inhalt lesbar! */}
                <FeatureCard
                  title="Intelligente Wiederholung"
                  description="Vergiss nie wieder etwas Wichtiges dank unseres Spaced-Repetition-Systems."
                />
                <FeatureCard
                  title="Vielfältige Lernmodi"
                  description="Karteikarten, Quizze, Lückentexte – lerne so, wie es für dich am besten passt."
                />
                <FeatureCard
                  title="Fortschritts-Tracking"
                  description="Behalte deinen Lernfortschritt immer im Blick und bleibe motiviert."
                />
              </div>
            </div>
          </section>

          <Footer />
        </div>
      );
    }
    ```

**Erklärung der Änderungen in `app/page.js`:**

1.  **Klassen zur `<section>` hinzugefügt:**
    *   `bg-[url('/features-bg.jpg')]`
    *   `bg-cover`
    *   `bg-center`
    *   `bg-no-repeat`
    *   Eventuell vorhandene `bg-gray-100` oder `bg-white`/`bg-opacity-*` wurden entfernt.
2.  **Kein `bg-fixed`:** Normalerweise möchte man, dass der Hintergrund einer Sektion mit dem Rest der Sektion scrollt. `bg-fixed` würde ihn wieder am Viewport festmachen.
3.  **Lesbarkeit der Überschrift (`h2`):** Die Klasse `text-white` (oder eine andere helle Farbe wie `text-gray-200`) wurde hinzugefügt, **angenommen, dein `features-bg.jpg` ist eher dunkel**. Wenn dein Bild hell ist, brauchst du eine dunkle Textfarbe (`text-gray-800` oder `text-black`). **Passe dies unbedingt an dein Bild an!**
4.  **Lesbarkeit der Feature Cards:** Die `FeatureCard`-Komponenten selbst haben (aus unserem vorherigen Aufbau) einen eigenen `bg-white`. Das ist hier vorteilhaft, da ihr Inhalt dadurch gut lesbar bleibt, unabhängig vom Hintergrundbild der Sektion. Du musst die Karten selbst wahrscheinlich nicht ändern.
5.  **`z-10` (Optional):** Manchmal können Hintergrundbilder oder andere Elemente dazu führen, dass der Inhalt einer Sektion überdeckt wird. `relative` auf dem Container und `z-10` auf dem Inhalts-`div` können helfen, den Inhalt sicher in den Vordergrund zu bringen. Meist ist es aber nicht nötig.

**Schritt 4: Testen**

1.  **Speichere** `app/layout.js` (falls geändert) und `app/page.js`.
2.  **Starte/Neustarte** den Entwicklungsserver (`npm run dev`).
3.  Öffne `http://localhost:3000`.
4.  Der Hero und der Footer sollten ihren normalen (oder keinen spezifischen) Hintergrund haben.
5.  **Nur der Bereich mit den Feature Cards** sollte jetzt das `features-bg.jpg` als Hintergrund haben.
6.  Überprüfe die Lesbarkeit der Überschrift "Unsere Top-Features" und passe die `text-*`-Klasse bei Bedarf an.
7.  Die Feature Cards sollten ihren weißen Hintergrund behalten und gut lesbar sein.

Jetzt hast du das Hintergrundbild gezielt nur für den gewünschten Abschnitt gesetzt!



** Antwort auf Patrick's Frage

// app/page.js
// ...
<section
  id="features"
  className="
    py-16
    bg-[url('/features-bg.jpg')]
    bg-contain              // <-- Ersetze bg-cover hiermit
    bg-center               // Zentrum beibehalten (oder bg-top, bg-bottom etc.)
    bg-no-repeat            // Verhindert Kacheln
  "
>
  <div className="container mx-auto px-4 relative z-10">
    {/* ... Überschrift (Textfarbe prüfen!) ... */}
    {/* ... Feature Cards ... */}
  </div>
</section>
// ...