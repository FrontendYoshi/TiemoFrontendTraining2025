
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