
**Annahme:** Du hast bereits eine `Hero`-Komponente in `components/Hero.js`.

**Schritt 1: Unterseiten erstellen**

1.  **Ordner erstellen:** Lege für jede neue Seite einen Ordner im `app/`-Verzeichnis an. Der Ordnername wird zum URL-Pfad.
    *   Beispiel: Erstelle `app/preise/` für die Seite `/preise`.
    *   Beispiel: Erstelle `app/kontakt/` für die Seite `/kontakt`.

2.  **`page.js` erstellen:** Erstelle in *jedem* dieser neuen Ordner eine Datei namens `page.js`.
    *   Beispiel: `app/preise/page.js`
    *   Beispiel: `app/kontakt/page.js`

3.  **Inhalt für `page.js` hinzufügen:** Schreibe eine einfache React-Komponente in jede `page.js`-Datei.

    ```javascript
    // Beispiel für app/preise/page.js

    // Standard-Export einer Funktion als Seitenkomponente
    export default function PreiseSeite() {
      return (
        <div>
          <h1>Unsere Preise</h1>
          <p>Hier finden Sie Informationen zu unseren Preisen.</p>
          {/* Füge hier später mehr Inhalt hinzu */}
        </div>
      );
    }
    ```

    *   Mach dasselbe für `app/kontakt/page.js`, passe nur den Text an (z.B. `<h1>Kontakt</h1>`).

**Schritt 2: Im Hero-Bereich verlinken**

1.  **`Hero.js` öffnen:** Gehe zur Datei `components/Hero.js`.
2.  **`Link` importieren:** Füge oben den Import hinzu:
    ```javascript
    import Link from 'next/link';
    ```
3.  **Navigation hinzufügen/anpassen:** Suche die Stelle im Hero, wo die Links hin sollen (oft eine `<nav>` oder eine `<ul>`-Liste). Füge die `<Link>`-Komponenten hinzu:

    ```javascript
    // In components/Hero.js, innerhalb des return(...)

    // Beispiel: In einer <nav> oder <ul> Liste
    <ul className="flex space-x-4"> {/* Beispiel-Styling mit Tailwind */}
      <li>
        {/* Interner Link zur Features-Sektion (falls vorhanden) */}
        <a href="#features" className="hover:text-gray-200">Features</a>
      </li>
      <li>
        {/* Externer Link zur neuen Preise-Seite */}
        <Link href="/preise" legacyBehavior>
          <a className="hover:text-gray-200">Preise</a>
        </Link>
      </li>
      <li>
        {/* Externer Link zur neuen Kontakt-Seite */}
        <Link href="/kontakt" legacyBehavior>
         <a className="hover:text-gray-200">Kontakt</a>
        </Link>
      </li>
      {/* Füge hier weitere Links hinzu */}
    </ul>
    ```

    *   **`Link href="/preise"`:** Erstellt einen Link zur Seite `/preise`. Der `href`-Wert entspricht dem Ordnernamen unter `app/`.
    *   **`legacyBehavior` + `<a>`:** Verwende dies, wenn du dem Link (dem `<a>`-Tag) direkt Klassen oder andere Attribute geben möchtest.
    *   **Styling:** Passe die Tailwind-Klassen (`flex`, `space-x-4`, `hover:text-gray-200`) nach Bedarf an.

**Schritt 3: Testen**

1.  **Speichere alle geänderten Dateien.**
2.  **Starte/prüfe deinen Dev-Server (`npm run dev`).**
3.  **Öffne die Seite im Browser (`http://localhost:3000`).**
4.  Du solltest die neuen Links im Hero-Bereich sehen.
5.  Klicke auf die Links "Preise" und "Kontakt". Du solltest zu den neu erstellten (noch einfachen) Seiten weitergeleitet werden.