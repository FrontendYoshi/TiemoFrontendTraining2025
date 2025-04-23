
Der beste Ort, um einen Stil anzuwenden, der die *gesamte* Seite betrifft, ist die **`<body>`**-Tag. Im Next.js App Router steuerst du die `<body>`-Tag hauptsächlich über die Root-Layout-Datei: **`app/layout.js`**.

**Schritt 1: Bild vorbereiten und platzieren**

1.  **Wähle ein Bild:** Such dir ein passendes Hintergrundbild aus. Achte darauf, dass es eine ausreichend hohe Auflösung hat, aber auch für das Web optimiert ist (nicht unnötig riesig in Dateigröße). Tools wie TinyPNG können helfen.
2.  **Platziere das Bild:** Lege deine Bilddatei (nennen wir sie z.B. `background.jpg`) in den **`public`**-Ordner deines Projekts.
    ```
    nextjs-streaming-beispiel/  (oder dein Projektname)
    ├── app/
    │   ├── layout.js  <-- Diese Datei bearbeiten wir gleich
    │   └── page.js
    ├── components/
    ├── public/
    │   └── background.jpg  <-- Dein Bild hier rein
    └── ... (andere Dateien)
    ```
    Wenn das Bild im `public`-Ordner liegt, kannst du im Code darauf mit `/background.jpg` verweisen.

**Schritt 2: Hintergrundbild im Root-Layout (`app/layout.js`) festlegen**

1.  **Öffne die Datei `app/layout.js`.** Diese Datei definiert die grundlegende HTML-Struktur deiner gesamten Anwendung.
2.  **Finde die `<body>`-Tag.**
3.  **Füge Tailwind-Klassen** zur `<body>`-Tag hinzu, um das Hintergrundbild zu definieren und zu steuern:

    ```javascript
    // app/layout.js
    import './globals.css' // Stellt sicher, dass Tailwind-Basis geladen wird
    import { Inter } from 'next/font/google' // Standard-Schriftart (kann variieren)

    const inter = Inter({ subsets: ['latin'] })

    export const metadata = {
      title: 'SchnellLern App', // Beispiel-Metadaten
      description: 'Lerne schneller als je zuvor',
    }

    export default function RootLayout({ children }) {
      return (
        <html lang="de"> {/* Setze die Sprache */}
          {/* Füge die Klassen zur body-Tag hinzu */}
          <body
            className={`
              ${inter.className} {/* Fügt die Standard-Schriftart hinzu */}

              /* --- Hintergrundbild-Klassen --- */
              bg-[url('/background.jpg')] /* Pfad zu deinem Bild im public-Ordner */
              bg-cover                    /* Skaliert das Bild, sodass es den Container bedeckt (wichtig!) */
              bg-center                   /* Zentriert das Bild im Container */
              bg-fixed                    /* Fixiert das Bild, sodass es beim Scrollen nicht mitbewegt wird */
              bg-no-repeat                /* Verhindert, dass das Bild gekachelt wird */
              min-h-screen                /* Stellt sicher, dass der Body mindestens die Bildschirmhöhe hat */
            `}
          >
            {/* Der 'children'-Prop repräsentiert den Inhalt deiner Seiten (page.js etc.) */}
            {children}
          </body>
        </html>
      )
    }
    ```



**Schritt 3: Lesbarkeit des Inhalts sicherstellen (SEHR WICHTIG!)**

Dein Hintergrundbild könnte dunkel oder sehr unruhig sein. Der Text und die Elemente deiner Komponenten (Hero, Features, Footer) könnten dadurch schwer lesbar werden!

Du musst wahrscheinlich den **Hintergrund** deiner Hauptinhaltsbereiche anpassen, damit sie sich vom Hintergrundbild abheben.

1.  **Öffne `app/page.js`.**
2.  **Passe die Sektionen an:** Gib z.B. der Features-Sektion einen leicht transparenten weißen Hintergrund:

    ```javascript
    // app/page.js
    // ... imports ...
    import Hero from '../components/Hero';
    import FeatureCard from '../components/FeatureCard';
    import Footer from '../components/Footer';
    // ...

    export default function LandingPage() {
      return (
        <div> {/* Dieser äußere div ist jetzt optional, da der Body den Hintergrund hat */}
          <Hero />

          {/* Features Section - Hintergrund hinzufügen für Lesbarkeit */}
          <section id="features" className="py-16 bg-white bg-opacity-80 md:bg-opacity-90 backdrop-blur-sm"> {/* NEU: z.B. weiß mit 80% Deckkraft und leichtem Blur */}
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900"> {/* Textfarbe evtl. anpassen */}
                Unsere Top-Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature Cards (Diese haben bereits einen weißen Hintergrund) */}
                <FeatureCard title="..." description="..." />
                <FeatureCard title="..." description="..." />
                <FeatureCard title="..." description="..." />
              </div>
            </div>
          </section>

          {/* Footer (Hat bereits einen eigenen dunklen Hintergrund) */}
          <Footer />
        </div>
      );
    }
    ```

*   **`bg-white bg-opacity-80`**: Gibt der Sektion einen weißen Hintergrund mit 80% Deckkraft. Du kannst den Wert (z.B. `bg-opacity-90`) oder die Farbe anpassen. Die Kurzschreibweise in neuerem Tailwind ist `bg-white/80`.
*   **`md:bg-opacity-90`**: Beispiel: Auf größeren Schirmen wird die Deckkraft leicht erhöht.
*   **`backdrop-blur-sm`**: (Optional) Fügt einen leichten "Frosted Glass"-Effekt hinzu, indem der Bereich *hinter* diesem Element (also das Hintergrundbild) leicht verschwommen wird. Das kann die Lesbarkeit weiter verbessern.
*   **Textfarben:** Überprüfe auch die Textfarben in deinem Hero und anderen Abschnitten. Eventuell musst du sie anpassen (`text-gray-900`, `text-white` etc.), damit sie einen guten Kontrast zum *neuen* Hintergrund der jeweiligen Sektion haben.

**Schritt 4: Testen**

1.  **Speichere** `app/layout.js` und `app/page.js`.
2.  **Starte/Neustarte** deinen Entwicklungsserver (`npm run dev`).
3.  Öffne `http://localhost:3000`.
4.  Du solltest jetzt das Hintergrundbild sehen, das die gesamte Seite abdeckt.
5.  Scrolle die Seite: Das Bild sollte fixiert bleiben.
6.  Überprüfe die Lesbarkeit: Sind alle Texte gut zu erkennen? Passe bei Bedarf die Hintergrundfarben/Deckkraft der Sektionen oder die Textfarben an.

