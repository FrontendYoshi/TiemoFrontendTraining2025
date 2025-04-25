
**Schritt 1: Voraussetzungen**

1.  **GitHub Repository:** Dein Projektcode muss auf GitHub sein (das haben wir ja schon vorbereitet).
2.  **Vercel Account:** Erstelle einen kostenlosen Account auf [https://vercel.com/](https://vercel.com/). Du kannst dich direkt mit deinem GitHub-Account anmelden, was den Prozess vereinfacht.



**Schritt 2: Änderungen auf GitHub pushen**

Da wir `next.config.js` geändert haben, müssen wir das auf GitHub aktualisieren, damit Vercel die richtige Konfiguration verwendet.

1.  Füge die Änderung zu Git hinzu:
    ```bash
    git add next.config.js
    ```
2.  Commite die Änderung:
    ```bash
    git commit -m "Revert Next.js config for Vercel deployment"
    ```
3.  Pushe auf GitHub:
    ```bash
    git push origin main
    ```

**Schritt 4: Projekt in Vercel importieren**

1.  Logge dich in dein Vercel-Dashboard ein.
2.  Klicke auf **"Add New..."** und wähle **"Project"**.
3.  Vercel wird dich auffordern, dich mit einem Git-Provider zu verbinden. Wähle **"Continue with GitHub"** (oder verbinde dich, falls noch nicht geschehen).
4.  Autorisiere Vercel, auf deine Repositories zuzugreifen (du kannst "All repositories" oder nur das spezifische auswählen).
5.  Suche und **importiere** dein Next.js-Projekt-Repository (z.B. `nextjs-streaming-beispiel`).
6.  Vercel erkennt normalerweise automatisch, dass es sich um ein Next.js-Projekt handelt und schlägt die richtigen Build-Einstellungen vor. Du musst hier in der Regel **nichts ändern**.
    *   **Framework Preset:** Sollte auf "Next.js" stehen.
    *   **Build Command:** Sollte `next build` sein (oder Vercel überschreibt es intern korrekt).
    *   **Output Directory:** Sollte `.next` sein (oder Vercel weiß es).
    *   **Install Command:** Sollte `npm install`, `yarn install` oder `pnpm install` sein.
7.  Du kannst hier optional **Environment Variables** hinzufügen, wenn dein Projekt API-Schlüssel oder andere Geheimnisse benötigt (unter dem "Environment Variables"-Tab). Gib diese **niemals** direkt in deinen Code oder die `next.config.js` ein!
8.  Klicke auf **"Deploy"**.

**Schritt 5: Deployment beobachten und Testen**

1.  Vercel beginnt nun automatisch, dein Projekt von GitHub zu holen, die Abhängigkeiten zu installieren, den Build (`npm run build`) auszuführen und die Anwendung bereitzustellen.
2.  Du kannst den Fortschritt live im Vercel-Dashboard verfolgen (Logs etc.).
3.  Nach ein paar Minuten ist das Deployment abgeschlossen. Vercel gibt dir eine oder mehrere URLs (z.B. `dein-projekt-xyz.vercel.app`), unter denen deine Seite jetzt live erreichbar ist.
4.  **Besuche die URL** und teste deine Webseite gründlich!
    *   Funktionieren die Links?
    *   Funktioniert das Streaming mit Suspense?
    *   Wenn du API-Routen hättest, würden diese jetzt funktionieren?
    *   Funktionieren alle dynamischen Features?

**Wie funktionieren zukünftige Updates?**

Das ist das Schöne an Vercel:

1.  Mache Änderungen an deinem Code lokal.
2.  Commite die Änderungen mit Git.
3.  Pushe die Änderungen auf deinen `main`-Branch auf GitHub (`git push origin main`).
4.  **Das war's!** Vercel erkennt den Push automatisch (über Webhooks), startet einen neuen Build und ein neues Deployment. Nach kurzer Zeit sind deine Änderungen live.


## Domains

**1. Automatische Vercel-Domain (Immer kostenlos enthalten)**

*   **Was du bekommst:** Jedes Mal, wenn du ein Projekt deployst, generiert Vercel automatisch eine **eindeutige URL** für dieses Deployment. Die Standard-Produktionsdomain sieht normalerweise so aus:
    *   `dein-projektname-<zufälliger-hash>-<dein-vercel-account>.vercel.app`
    *   Oder manchmal eine etwas kürzere Version wie: `dein-projektname.vercel.app` (Vercel versucht, diese zuzuordnen, wenn möglich).
*   **Funktionalität:** Diese Domain ist voll funktionsfähig, live im Internet erreichbar und **automatisch mit HTTPS/SSL gesichert**.
*   **Zweck:** Perfekt zum Testen, für Vorschau-Deployments (Preview Deployments), für Hobby-Projekte oder wenn du (noch) keine eigene Domain kaufen möchtest.

**2. Eigene (Custom) Domain hinzufügen (Auch im kostenlosen Plan möglich!)**

*   **Was du tun kannst:** Du kannst **deine eigene Domain**, die du bei einem Domain-Registrar (wie GoDaddy, IONOS, Namecheap, Strato, etc.) gekauft hast, **mit deinem Vercel-Projekt verbinden**. Zum Beispiel `www.meine-tolle-seite.de` oder `meine-tolle-seite.com`.
*   **Kosten:**
    *   Das **Hinzufügen und Verwenden** deiner eigenen Domain auf Vercel ist im **kostenlosen Hobby-Plan enthalten**. Vercel berechnet dir dafür nichts extra.
    *   Du musst natürlich die **jährlichen Gebühren für die Domain selbst** an deinen Domain-Registrar bezahlen. Vercel verkauft keine Domains, sie hosten nur deine Webseite.
*   **Wie es geht:**
    1.  **Domain kaufen:** Falls du noch keine hast, kaufe eine bei einem Registrar deiner Wahl.
    2.  **Vercel Dashboard:** Gehe zu deinem Projekt in Vercel.
    3.  **Settings -> Domains:** Navigiere zu den Domain-Einstellungen deines Projekts.
    4.  **Domain hinzufügen:** Gib deine gekaufte Domain ein (z.B. `meine-tolle-seite.de`).
    5.  **Konfiguration (DNS):** Vercel zeigt dir nun Anweisungen, wie du die **DNS-Einstellungen** bei deinem Domain-Registrar ändern musst. Das beinhaltet normalerweise:
        *   Das Hinzufügen eines `A`-Records, der auf eine von Vercel bereitgestellte IP-Adresse zeigt.
        *   *Oder* das Ändern von `CNAME`-Records (insbesondere für `www`-Subdomains).
        *   *Oder* die Verwendung von `ALIAS`- oder `ANAME`-Records, falls dein Registrar das unterstützt (oft die beste Option für die Root-Domain).
    6.  **DNS-Änderungen beim Registrar vornehmen:** Logge dich bei deinem Domain-Registrar ein und trage die von Vercel vorgegebenen DNS-Einträge ein.
    7.  **Warten:** Es kann einige Minuten bis Stunden dauern, bis DNS-Änderungen weltweit übernommen werden (DNS Propagation). Vercel überprüft die Konfiguration automatisch und zeigt dir an, wenn alles korrekt eingerichtet ist.
*   **Vorteile:**
    *   Professionelles Aussehen mit deiner eigenen Marke.
    *   Vercel kümmert sich **automatisch** um die Erstellung und Erneuerung von **kostenlosen SSL/TLS-Zertifikaten** (Let's Encrypt) für deine Custom Domain, sodass sie über HTTPS sicher ist.

**3. Subdomains**

*   Du kannst sowohl Subdomains der automatischen Vercel-Domain nutzen (z.B. für Vorschau-Deployments von Branches) als auch **eigene Subdomains** deiner Custom Domain hinzufügen (z.B. `blog.meine-tolle-seite.de`). Der Prozess zum Hinzufügen eigener Subdomains ist derselbe wie für die Hauptdomain (in Vercel hinzufügen, DNS-Einträge beim Registrar setzen).

**Zusammenfassend:**

*   Du bekommst **immer** eine kostenlose `.vercel.app`-Domain.
*   Du kannst **kostenlos** (im Hobby-Plan) deine **eigene Domain** hinzufügen, musst diese aber separat bei einem Registrar kaufen und bezahlen.
*   Vercel macht die Konfiguration eigener Domains relativ einfach und kümmert sich um kostenlose SSL-Zertifikate.

Für den Anfang reicht die automatische Vercel-Domain oft aus. Wenn dein Projekt "ernsthafter" wird, ist das Hinzufügen einer eigenen Domain der nächste logische Schritt.