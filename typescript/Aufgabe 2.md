
### Typisierung von Objekten, Arrays und Funktionen

**Ziel:** Wenden Sie die Typisierung auf komplexere Datenstrukturen wie Objekte und Arrays an und lernen Sie, Funktionen mit typisierten Parametern und Rückgabewerten zu erstellen.

**Szenario:** Wir bleiben bei unserem einfachen Benutzerverwaltungssystem. Statt einzelner Variablen möchten wir nun die Benutzerdaten strukturierter speichern und eine Funktion erstellen, die diese Daten anzeigt.

**Ihre Aufgabe:**

1. Öffnen Sie Ihre TypeScript-Datei (`src/index.ts` oder eine andere `.ts`-Datei).
    
2. **Erstellen Sie ein Benutzerobjekt:**
    
    - Anstatt separate Variablen für Name, Alter usw. zu erstellen, definieren Sie eine Variable namens `currentUser`.
    - Weisen Sie dieser Variable direkt ein Objekt zu, das die folgenden Eigenschaften enthält:
        - `name` (soll ein String sein)
        - `age` (soll eine Zahl sein)
        - `isStudent` (soll ein Boolean sein)
        - `score` (soll eine Zahl sein)
    - **Verwenden Sie eine Inline-Typ-Annotation**, um die Struktur dieses Objekts und die Typen seiner Eigenschaften bei der Variablendeklaration zu definieren.
    
    TypeScript
    
    ```
    // Beispiel-Struktur (vervollständigen und Typisierung hinzufügen!)
    // let currentUser: HIER TYP HINZUFÜGEN = {
    //   name: "Anna",
    //   age: 22,
    //   isStudent: true,
    //   score: 95.5
    // };
    ```
    
3. **Erstellen Sie ein Array von Kursen:**
    
    - Erstellen Sie eine Variable namens `userCourses`.
    - Weisen Sie dieser Variable ein Array zu, das eine Liste von Kursnamen als Strings enthält (z.B. ["Mathematik", "Informatik", "Englisch"]).
    - **Verwenden Sie eine explizite Typ-Annotation**, um festzulegen, dass dieses Array nur Strings enthalten darf.
    
    TypeScript
    
    ```
    // Beispiel-Struktur (vervollständigen und Typisierung hinzufügen!)
    // let userCourses: HIER TYP HINZUFÜGEN = ["Kurs A", "Kurs B"];
    ```
    
4. **Erstellen Sie eine Funktion zur Anzeige der Benutzerdaten:**
    
    - Definieren Sie eine Funktion namens `displayUserInfo`.
    - Diese Funktion soll **zwei Parameter** akzeptieren:
        - Der erste Parameter soll `user` heißen und den Typ des Objekts haben, das Sie in Schritt 2 erstellt haben.
        - Der zweite Parameter soll `courses` heißen und den Typ des Arrays haben, das Sie in Schritt 3 erstellt haben.
    - **Typisieren Sie die Parameter** in der Funktionssignatur.
    - **Typisieren Sie den Rückgabewert** der Funktion. Da die Funktion nur etwas auf die Konsole ausgibt und keinen Wert zurückgibt, sollte der Rückgabetyp `void` sein.
    - Innerhalb der Funktion geben Sie die Benutzerinformationen (Name, Alter, Student-Status, Punktzahl) und die Liste der Kurse (z.B. durch Iterieren über das Array oder einfaches Ausgeben des Arrays) auf der Konsole aus.
    
    TypeScript
    
    ```
    // Beispiel-Funktionssignatur (vervollständigen und Implementierung hinzufügen!)
    // function displayUserInfo(user: HIER TYP HINZUFÜGEN, courses: HIER TYP HINZUFÜGEN): HIER TYP HINZUFÜGEN {
    //   // Implementierung hier...
    // }
    ```
    
5. **Rufen Sie die Funktion auf:**
    
    - Nachdem Sie das Benutzerobjekt und das Kurs-Array erstellt haben, rufen Sie die `displayUserInfo`-Funktion auf und übergeben Sie Ihre erstellten Variablen als Argumente.
    
    TypeScript
    
    ```
    // Beispiel-Aufruf
    // displayUserInfo(currentUser, userCourses);
    ```
    
6. **Experimentieren Sie (Optional):**
    
    - Versuchen Sie, der `userCourses`-Variablen ein Element hinzuzufügen, das _kein_ String ist (z.B. eine Zahl: `userCourses.push(123);`). Kompilieren Sie den Code.
    - Erstellen Sie ein zweites Objekt, das _ähnlich_ wie `currentUser` ist, aber einen Typfehler enthält (z.B. `age: "dreißig"`). Versuchen Sie, es der `currentUser`-Variable zuzuweisen oder als Argument an `displayUserInfo` zu übergeben. Kompilieren Sie den Code.
    - Versuchen Sie, die `displayUserInfo`-Funktion mit Argumenten des falschen Typs aufzurufen (z.B. `displayUserInfo(userCourses, currentUser);`). Kompilieren Sie den Code.

**Schritte zur Durchführung:**

1. Navigieren Sie im Terminal zu Ihrem Projektordner.
2. Stellen Sie sicher, dass Sie eine TypeScript-Datei (`.ts`) haben.
3. Bearbeiten Sie die `.ts`-Datei in Ihrem Code-Editor und fügen Sie den Code für das Objekt, das Array und die Funktion hinzu.
4. Speichern Sie die Datei.
5. Kompilieren Sie Ihren Code im Terminal (`npx tsc`). Achten Sie auf Fehlermeldungen.
6. Wenn die Kompilierung erfolgreich ist, führen Sie den kompilierten JavaScript-Code aus (`node dist/index.js`). Überprüfen Sie die Konsolenausgabe.

**Erwartete Ausgabe (ohne die optionalen Fehler-Experimente):**

Ihre Konsolenausgabe sollte die Benutzerinformationen und die Kursliste anzeigen, ähnlich wie dies:

```
Benutzerinformationen:
  Name: [Name des Benutzers]
  Alter: [Alter des Benutzers]
  Ist Student: [true oder false]
  Punktzahl: [Punktzahl des Benutzers]
Kurse: [Liste der Kursnamen, z.B. Mathematik, Informatik, Englisch]
```

Nehmen Sie sich Zeit, die Typisierungen korrekt anzuwenden und beobachten Sie, wie TypeScript Sie dabei unterstützt, Fehler frühzeitig zu erkennen.

---


## Lösung





```TypeScript
// 1. Erstellen Sie ein Benutzerobjekt mit Inline-Typ-Annotation
// Wir definieren hier direkt die Form des Objekts, das currentUser sein wird
let currentUser: {
  name: string;
  age: number;
  isStudent: boolean;
  score: number;
} = {
  name: "Anna Musterfrau",
  age: 22,
  isStudent: true,
  score: 95.5,
};

// 2. Erstellen Sie ein Array von Kursen mit expliziter Typ-Annotation
// Wir legen fest, dass dieses Array nur Strings enthalten darf
let userCourses: string[] = ["Mathematik", "Informatik", "Englisch"];

// 3. Erstellen Sie eine Funktion zur Anzeige der Benutzerdaten
// Wir typisieren die Parameter (user hat die gleiche Form wie currentUser, courses ist ein string[])
// und den Rückgabetyp (void, da die Funktion nichts zurückgibt)
function displayUserInfo(user: { name: string; age: number; isStudent: boolean; score: number }, courses: string[]): void {
  console.log("Benutzerinformationen:");
  // Ausgabe ohne Template-Literale
  console.log("  Name: " + user.name);
  console.log("  Alter: " + user.age);
  console.log("  Ist Student: " + user.isStudent);
  console.log("  Punktzahl: " + user.score);

  console.log("Kurse:");
  // Ausgabe der Kurse (Weiterhin über das Array iterieren, aber Ausgabe ohne $)
  courses.forEach(course => {
      console.log("  - " + course);
  });
  // Oder einfach: console.log("  ", courses); // Diese Zeile verwendet keine $
}

// 4. Rufen Sie die Funktion auf
displayUserInfo(currentUser, userCourses);

// --- Optional: Experimente (auskommentiert, um keine Fehler zu verursachen) ---

// Beispiel für Zuweisung eines falschen Typs zum Array
// userCourses.push(123); // TypeScript FEHLER: Argument vom Typ 'number' kann Parameter vom Typ 'string' nicht zugewiesen werden.

// Beispiel für ein Objekt mit falschem Eigenschaftstyp
// let anotherUserWithErrors: { name: string; age: number; isStudent: boolean; score: number } = {
//     name: "Bob",
//     age: "dreißig", // TypeScript FEHLER: Typ 'string' kann Typ 'number' nicht zugewiesen werden.
//     isStudent: false,
//     score: 80
// };

// Beispiel für den Aufruf der Funktion mit falschen Argumenttypen
// displayUserInfo(userCourses, currentUser); // TypeScript FEHLER: Argumente passen nicht zu den Parametertypen

// --- Ende der Experimente ---
```

**So verwenden Sie die Lösung:**

1. Kopieren Sie den obigen Code.
2. Fügen Sie ihn in Ihre `.ts`-Datei ein und speichern Sie die Datei.
3. Öffnen Sie Ihr Terminal im Root-Ordner Ihres Projekts.
4. Kompilieren Sie den Code mit:
    
    Bash
    
    ```
    npx tsc
    ```
    
    Wenn Sie die optionalen Fehler-Experimente _nicht_ auskommentiert haben, wird der Compiler Fehlermeldungen anzeigen. Kommentieren Sie diese Zeilen aus, um die Kompilierung erfolgreich durchzuführen.
5. Führen Sie den kompilierten JavaScript-Code aus:
    
    Bash
    
    ```
    node dist/index.js
    ```
    

Die Ausgabe in Ihrer Konsole wird identisch sein, aber der Code, der diese Ausgabe erzeugt, verwendet nun String-Verkettung statt Template-Literale.

---