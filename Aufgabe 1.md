
### Aufgabe: Grundlagen der Variablentypisierung

**Ziel:** Vertiefen Sie Ihr Verständnis für die Deklaration von Variablen in TypeScript und die explizite Typisierung mit den grundlegenden Typen `string`, `number` und `boolean`.

**Szenario:** Stellen Sie sich vor, Sie arbeiten an einem einfachen System zur Verwaltung von Benutzerinformationen. Für jeden Benutzer müssen einige grundlegende Daten gespeichert werden.

**Ihre Aufgabe:**

1. Öffnen Sie Ihre TypeScript-Datei (`src/index.ts` oder eine neue Datei, z.B. `src/user.ts`).
    
2. Erstellen Sie die folgenden Variablen und weisen Sie ihnen passende Anfangswerte zu. **Verwenden Sie für jede Variable eine explizite Typ-Annotation.**
    
    - Eine Variable namens `userName` für den Namen des Benutzers (soll Text speichern).
    - Eine Variable namens `userAge` für das Alter des Benutzers (soll eine ganze Zahl speichern).
    - Eine Variable namens `isStudent` für die Information, ob der Benutzer Student ist (soll wahr oder falsch speichern).
    - Eine Variable namens `userScore` für die Punktzahl des Benutzers (soll eine Zahl mit Nachkommastellen speichern).
3. Geben Sie die Werte der erstellten Variablen auf der Konsole aus, um zu überprüfen, ob alles funktioniert.
    
    TypeScript
    
    ```
    // Beispiel für die Konsolenausgabe:
    // console.log("Name:", IhreVariableHier);
    ```
    
4. **Experimentieren Sie (Optional):**
    
    - Versuchen Sie, einer der Variablen _nach_ der Initialisierung einen Wert mit einem **falschen Typ** zuzuweisen (z.B. einer `number`-Variable einen `string`). Beobachten Sie, was Ihr Code-Editor und der TypeScript-Compiler anzeigen.
    - Löschen Sie testweise die explizite Typ-Annotation bei einer der Variablen, die Sie direkt mit einem Wert initialisieren (z.B. `let userAge = 45;` statt `let userAge: number = 45;`). Kompilieren Sie den Code. Erkennt TypeScript den Typ trotzdem korrekt? Dies demonstriert die Typ-Inferenz.


**Erwartete Ausgabe (ohne die optionalen Fehler-Experimente):**

Ihre Konsolenausgabe sollte in etwa so aussehen (mit den Werten, die Sie gewählt haben):

```
Name: [Der Name, den Sie gewählt haben]
Alter: [Das Alter, das Sie gewählt haben]
Ist Student: [true oder false, das Sie gewählt haben]
Punktzahl: [Die Punktzahl, die Sie gewählt haben]
```

Nehmen Sie sich Zeit, die Aufgabe zu lösen, und experimentieren Sie ruhig, um das Verhalten der Typisierung zu verstehen.

---