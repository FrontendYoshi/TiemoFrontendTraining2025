
Wir bauen ein **simples Blog-CMS**, bei dem du Beiträge erstellen (vereinfacht: als Daten speichern) und anzeigen kannst. Fokus liegt auf der Nutzung von TypeScript in verschiedenen Teilen der Anwendung.

**Projektaufbau:**

1. **Projekt aufsetzen:** Next.js mit TypeScript und Tailwind CSS.
2. **Datenmodell definieren:** Wie sieht ein Blogbeitrag aus? Wir definieren die Struktur mit TypeScript.
3. **Beispieldaten erstellen:** Ein paar Blogbeiträge als JavaScript/TypeScript-Objekte.
4. **Datenabruf (Liste):** Alle Beiträge auf der Startseite anzeigen (Server Components Data Fetching).
5. **Komponente für Beitragsvorschau:** Eine Komponente, die einen einzelnen Beitrag in der Liste darstellt (Props-Typisierung).
6. **Dynamische Seite für Einzelansicht:** Eine Seite für jeden Beitrag (Dynamische Routen, Data Fetching).
7. **Komponente für Beitragsdetails:** Eine Komponente, die den vollständigen Beitrag anzeigt (Props-Typisierung).
8. **(Optional) API-Route:** Eine einfache API-Route, die Beiträge zurückgibt (API Route Typisierung).
9. **(Optional) Einfaches State Management:** Ein Beispiel für lokalen State mit TypeScript (z. B. für Filter oder Suche).
10. **Styling:** Grundlegendes Styling mit Tailwind CSS.

Legen wir los!

---

**Schritt 1: Projekt aufsetzen**

Wir verwenden `create-next-app`, um ein neues Next.js-Projekt mit TypeScript und Tailwind CSS zu erstellen.

Öffne dein Terminal und führe den folgenden Befehl aus:

Bash

```
npx create-next-app@latest mein-nextjs-blog --typescript --tailwind --eslint --app # Wähle 'Yes' für alle Fragen (App Router, ESLint, Tailwind, src directory)
```

- `mein-nextjs-blog`: Der Name deines Projekts. Du kannst ihn anpassen.
- `--typescript`: Sagt Next.js, dass wir TypeScript verwenden möchten.
- `--tailwind`: Richtet Tailwind CSS automatisch ein.
- `--eslint`: Richtet ESLint für Code-Qualität ein (gute Praxis mit TS).
- `--app`: Verwendet den neueren App Router, der besser mit modernen React Features und Server Components harmoniert.

Navigiere in das Projektverzeichnis:

Bash

```
cd mein-nextjs-blog
```

Jetzt hast du ein funktionierendes Next.js-Projekt mit TypeScript und Tailwind. Die Hauptdateien für deine Anwendung liegen im `src/app` Ordner.

**Schritt 2: Datenmodell definieren**

Wie sehen unsere Blogbeiträge aus? Wir erstellen ein TypeScript `interface`, um die Struktur zu beschreiben. Interfaces sind ideal, um die Form von Objekten festzulegen.

Erstelle einen Ordner `src/types` und darin eine Datei `src/types/post.ts`.

TypeScript

```TypeScript
// src/types/post.ts

/**
 * TypeScript: Definieren eines Interfaces für die Struktur eines Blogbeitrags.
 * Interfaces sind ein Vertrag, der festlegt, welche Eigenschaften ein Objekt haben muss
 * und welchen Typ diese Eigenschaften haben. Dies hilft uns, Fehler zu erkennen,
 * wenn wir versuchen, auf Eigenschaften zuzugreifen, die nicht existieren, oder
 * den falschen Datentyp zu verwenden.
 */
export interface Post {
  id: string; // Eine eindeutige ID für den Beitrag
  slug: string; // Ein lesbarer Identifier für die URL (z.B. "mein-erster-beitrag")
  title: string; // Der Titel des Beitrags
  content: string; // Der HTML-Inhalt des Beitrags (vereinfacht als String)
  author: string; // Der Name des Autors
  date: string; // Das Veröffentlichungsdatum (wir nutzen String für Einfachheit, Date könnte auch verwendet werden)
  excerpt?: string; // Eine kurze Zusammenfassung (das '?' macht diese Eigenschaft optional)
  category?: string; // Optional: Eine Kategorie für den Beitrag
}
```

**Schritt 3: Beispieldaten erstellen**

Statt einer Datenbank nutzen wir für den Anfang einfache JavaScript-Objekte, die wir exportieren. Diese Objekte müssen unserem gerade definierten `Post`-Interface entsprechen.

Erstelle einen Ordner `src/data` und darin eine Datei `src/data/posts.ts`.

TypeScript

```TypeScript
// src/data/posts.ts

import { Post } from '@/types/post'; // TypeScript: Importieren unseres Post-Interfaces

/**
 * TypeScript: Wir definieren ein Array von Objekten.
 * Durch die Angabe `: Post[]` sagen wir TypeScript, dass dieses Array
 * NUR Objekte vom Typ 'Post' enthalten darf.
 * Wenn wir hier ein Objekt erstellen würden, das nicht dem Post-Interface entspricht
 * (z.B. eine Eigenschaft vergessen oder einen falschen Typ verwenden),
 * würde TypeScript uns sofort einen Fehler anzeigen.
 */
export const samplePosts: Post[] = [
  {
    id: '1',
    slug: 'erster-beitrag',
    title: 'Mein erster Next.js Blogbeitrag mit TypeScript',
    content: '<p>Hallo Welt! Dies ist mein erster Blogbeitrag in meinem neuen CMS.</p>',
    author: 'Dein Name',
    date: '2023-10-27',
    excerpt: 'Ein kurzer Überblick über meinen ersten Beitrag.',
    category: 'Webentwicklung',
  },
  {
    id: '2',
    slug: 'typescript-vorteile',
    title: 'Vorteile von TypeScript in Next.js',
    content: '<p>TypeScript bringt viele Vorteile, besonders in größeren Projekten...</p>',
    author: 'Dein Name',
    date: '2023-11-01',
    excerpt: 'Warum TypeScript eine gute Wahl für Next.js ist.',
    category: 'Programmierung',
  },
  {
    id: '3',
    slug: 'styling-mit-tailwind',
    title: 'Schnelles Styling mit Tailwind CSS',
    content: '<p>Tailwind ermöglicht schnelles und konsistentes Styling direkt im Markup...</p>',
    author: 'Dein Name',
    date: '2023-11-05',
    excerpt: 'Einführung in die Nutzung von Tailwind.',
    category: 'Webdesign',
  },
];

/**
 * TypeScript: Eine einfache Funktion, um alle Posts zurückzugeben.
 * Wir typisieren den Rückgabewert als `Promise<Post[]>`, da Datenabruf oft asynchron ist,
 * auch wenn wir hier nur ein lokales Array zurückgeben.
 */
export const getPosts = async (): Promise<Post[]> => {
  // In einem echten Projekt würdest du hier eine Datenbank oder ein API aufrufen.
  // Die 'await' Simulation macht es realistischer für zukünftige Erweiterungen.
  await new Promise((resolve) => setTimeout(resolve, 100)); // Kleine Verzögerung simulieren
  return samplePosts;
};

/**
 * TypeScript: Eine Funktion, um einen einzelnen Post anhand seines Slugs zu finden.
 * Der Parameter 'slug' ist vom Typ string.
 * Der Rückgabewert ist vom Typ `Post | undefined`.
 * `undefined` wird zurückgegeben, falls kein Post mit dem gegebenen Slug gefunden wird.
 * TypeScript hilft uns später, diesen Fall korrekt zu behandeln.
 */
export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 100)); // Kleine Verzögerung simulieren
  return samplePosts.find(post => post.slug === slug);
};

/**
 * TypeScript: Eine Funktion, um alle Slugs zurückzugeben. Nützlich für die
 * statische Generierung von Seiten (`generateStaticParams` im App Router).
 * Rückgabetyp: Ein Array von Objekten, von denen jedes eine 'slug'-Eigenschaft vom Typ string hat.
 */
export const getPostSlugs = async (): Promise<{ slug: string }[]> => {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Kleine Verzögerung simulieren
    return samplePosts.map(post => ({ slug: post.slug }));
};
```

**Schritt 4: Datenabruf und Anzeige der Post-Liste auf der Startseite**

Im App Router können wir Daten direkt in Server Components abrufen.

Bearbeite die Datei `src/app/page.tsx`.

TypeScript

```TypeScript
// src/app/page.tsx

import Link from 'next/link'; // Für Links zu den einzelnen Posts
import { getPosts } from '@/data/posts'; // TypeScript: Importieren unserer getPosts-Funktion
import { Post } from '@/types/post'; // TypeScript: Importieren des Post-Interfaces
import PostCard from '@/components/PostCard'; // TypeScript: Importieren der PostCard Komponente (erstellen wir gleich)

/**
 * TypeScript: Eine Server Component. Im App Router sind Komponenten standardmäßig Server Components.
 * Server Components können asynchron sein (`async` Keyword) und Daten direkt abrufen.
 * Der Rückgabetyp ist ein Promise, das JSX-Elemente rendert.
 */
export default async function Home() {
  // TypeScript: Ruft die getPosts-Funktion auf, die ein Promise<Post[]> zurückgibt.
  // TypeScript weiß, dass 'posts' nach dem await ein Array von Post-Objekten ist.
  const posts: Post[] = await getPosts(); // Explizite Typisierung ist optional, aber klar

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Aktuelle Blogbeiträge</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TypeScript: Die map-Funktion iteriert über das 'posts' Array,
            das TypeScript als 'Post[]' kennt.
            TypeScript weiß daher, dass jedes 'post'-Element im Loop vom Typ 'Post' ist.
            Dadurch bekommen wir Autovervollständigung und Typ-Sicherheit beim Zugriff
            auf post.title, post.slug, etc. */}
        {posts.map((post: Post) => ( // Explizite Typisierung im map-Callback ist optional, aber hilft der Klarheit
          // TypeScript: Die PostCard Komponente erwartet Props vom Typ Post.
          // TypeScript prüft hier, ob das 'post'-Objekt alle notwendigen
          // Eigenschaften des Post-Interfaces hat, bevor es an PostCard übergeben wird.
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
```

**Schritt 5: Komponente für Beitragsvorschau (PostCard)**

Wir erstellen eine wiederverwendbare Komponente für die Anzeige eines einzelnen Beitrags in der Liste. Hier typisieren wir die Props.

Erstelle einen Ordner `src/components` und darin die Datei `src/components/PostCard.tsx`.

TypeScript

```TypeScript
// src/components/PostCard.tsx

import Link from 'next/link';
import { Post } from '@/types/post'; // TypeScript: Importieren des Post-Interfaces

/**
 * TypeScript: Definieren eines Interfaces für die Props unserer PostCard Komponente.
 * Diese Komponente benötigt ein einzelnes 'post'-Objekt, das dem 'Post'-Interface entspricht.
 */
interface PostCardProps {
  post: Post; // TypeScript: Die Prop 'post' MUSS vom Typ 'Post' sein.
}

/**
 * TypeScript: Definieren der PostCard Komponente als React Funktionale Komponente.
 * Durch `: React.FC<PostCardProps>` sagen wir React und TypeScript, dass diese
 * Komponente die Props empfängt, die im PostCardProps-Interface definiert sind.
 * Alternativ und oft empfohlen im modernen React/TS:
 * `const PostCard = ({ post }: PostCardProps) => { ... }`
 */
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="border p-6 rounded-lg shadow-lg bg-white">
      {/* TypeScript: Da die 'post'-Prop vom Typ 'Post' ist,
          weiß TypeScript, dass post.title und post.slug existieren und strings sind.
          Das ermöglicht Autovervollständigung und verhindert Tippfehler. */}
      <h2 className="text-2xl font-semibold mb-2">
        {/* Link zur Detailseite des Beitrags. Wir nutzen den Slug. */}
        <Link href={`/posts/${post.slug}`} className="hover:underline text-blue-600">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Von {post.author} am {post.date}
        {/* TypeScript: Die 'category'-Eigenschaft ist optional (siehe Post-Interface).
            Wir prüfen, ob sie existiert, bevor wir sie anzeigen. TypeScript hilft uns hier,
            indem es uns sagt, dass post.category vom Typ 'string | undefined' ist. */}
        {post.category && ` in ${post.category}`}
      </p>
      {/* TypeScript: Die 'excerpt'-Eigenschaft ist optional.
          Wir prüfen, ob sie existiert. */}
      {post.excerpt && <p className="text-gray-700">{post.excerpt}</p>}
      <Link href={`/posts/${post.slug}`} className="mt-4 inline-block text-blue-500 hover:text-blue-700">
        Weiterlesen &rarr;
      </Link>
    </div>
  );
};

export default PostCard;
```

**Schritt 6: Dynamische Seite für Einzelansicht**

Wir erstellen eine dynamische Route, um für jeden Beitrag eine eigene Seite zu haben, z. B. `/posts/erster-beitrag`.

Erstelle einen Ordner `src/app/posts/[slug]` und darin die Datei `src/app/posts/[slug]/page.tsx`.

Im App Router können wir `generateStaticParams` verwenden, um Next.js mitzuteilen, welche Pfade (Slugs) statisch generiert werden sollen. Dann holen wir die Daten für den spezifischen Slug in der `page.tsx` selbst (wenn sie als Server Component gerendert wird).

TypeScript

```TypeScript
// src/app/posts/[slug]/page.tsx

import { getPostBySlug, getPostSlugs } from '@/data/posts'; // TypeScript: Import der Datenfunktionen
import { Post } from '@/types/post'; // TypeScript: Import des Post-Interfaces
import PostDetail from '@/components/PostDetail'; // TypeScript: Import der Detail Komponente (erstellen wir gleich)
import { notFound } from 'next/navigation'; // Hilfsfunktion für 404 Seiten

/**
 * TypeScript: Definieren des Typs für die Parameter, die diese dynamische Seite erhält.
 * Im App Router kommen dynamische Segmente (hier '[slug]') als Eigenschaften im `params`-Objekt an.
 * Der Typ des `slug` ist ein string.
 */
interface PostPageProps {
  params: {
    slug: string; // TypeScript: Das dynamische Segment '[slug]' ist vom Typ string
  };
}

/**
 * TypeScript: generateStaticParams Funktion.
 * Wird zur Build-Zeit ausgeführt, um eine Liste aller möglichen `params`-Objekte zu generieren.
 * Next.js erstellt dann für jedes dieser Objekte eine statische Seite.
 * Wir typisieren den Rückgabewert als Array von Objekten, die die Struktur der params haben.
 */
export async function generateStaticParams() {
  // TypeScript: getPostSlugs gibt uns { slug: string }[] zurück. generateStaticParams erwartet genau dieses Format.
  const slugs = await getPostSlugs();
  return slugs;
}


/**
 * TypeScript: Die Page Component für die Einzelansicht eines Posts.
 * Sie ist eine Server Component und kann daher Daten direkt abrufen.
 * Die Props sind vom Typ 'PostPageProps', den wir oben definiert haben.
 * TypeScript stellt sicher, dass wir auf params.slug zugreifen können.
 */
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params; // TypeScript: TypeScript weiß, dass 'slug' ein string ist.

  // TypeScript: Ruft die getPostBySlug Funktion auf.
  // TypeScript weiß, dass 'post' vom Typ 'Post | undefined' sein wird.
  const post: Post | undefined = await getPostBySlug(slug); // Explizite Typisierung ist optional, aber klar

  // TypeScript: Prüfen, ob der Post gefunden wurde.
  // Falls nicht, rufen wir die next/navigation notFound Funktion auf, die eine 404 Seite rendert.
  if (!post) {
    notFound(); // Next.js eigene 404 Seite
  }

  // TypeScript: Wenn der Post gefunden wurde, übergeben wir das getypte 'post' Objekt an die PostDetail Komponente.
  // TypeScript prüft, ob das 'post' Objekt dem von PostDetail erwarteten Typ (Post) entspricht.
  return (
    <main className="container mx-auto px-4 py-8">
        {/* Wir übergeben das gefundene und getypte Post-Objekt an die Detail-Komponente */}
        <PostDetail post={post} />
    </main>
  );
}

// (Optional) Metadaten für die Seite typisieren - gut für SEO
import type { Metadata } from 'next'

// TypeScript: Definieren des Typs für die generateMetadata Funktion Props
interface GenerateMetadataProps {
    params: {
        slug: string
    }
    // searchParams: { [key: string]: string | string[] | undefined } // Falls Suchparameter relevant wären
}

/**
 * TypeScript: generateMetadata Funktion zum Generieren von Metadaten basierend auf dem Inhalt.
 * Wird auf dem Server zur Build- oder Request-Zeit ausgeführt.
 * Wir typisieren die Props und den Rückgabetyp.
 */
export async function generateMetadata(
    { params }: GenerateMetadataProps,
    // parent: ResolvingMetadata // Falls wir Metadaten vom Layout übernehmen wollten
  ): Promise<Metadata> {
    // read route params
    const slug = params.slug

    // fetch data
    // TypeScript: Wir wissen, dass post vom Typ 'Post | undefined' ist
    const post = await getPostBySlug(slug)

    // Falls Post nicht gefunden, Standard-Metadaten zurückgeben
    if (!post) {
        return {
            title: 'Post nicht gefunden',
        }
    }

    // generate metadata based on post data
    // TypeScript: Wir wissen, dass post existiert und vom Typ 'Post' ist
    return {
        title: post.title,
        description: post.excerpt || `Details zu "${post.title}"`, // Fallback, falls excerpt fehlt
        // Weitere Metadaten wie Keywords, Open Graph etc. hier hinzufügen
    }
}
```

**Schritt 7: Komponente für Beitragsdetails**

Eine einfache Komponente zur Anzeige des vollständigen Beitragsinhalts. Wieder typisieren wir die Props.

Erstelle die Datei `src/components/PostDetail.tsx`.

TypeScript

```TypeScript
// src/components/PostDetail.tsx

import React from 'react'; // Wichtig, wenn JSX verwendet wird
import { Post } from '@/types/post'; // TypeScript: Import des Post-Interfaces

/**
 * TypeScript: Definieren eines Interfaces für die Props unserer PostDetail Komponente.
 * Diese Komponente benötigt ein einzelnes 'post'-Objekt vom Typ 'Post'.
 */
interface PostDetailProps {
  post: Post; // TypeScript: Die Prop 'post' MUSS vom Typ 'Post' sein.
}

/**
 * TypeScript: Definieren der PostDetail Komponente als React Funktionale Komponente.
 * Wir empfangen die Props vom Typ 'PostDetailProps'.
 */
const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return (
    <article className="prose lg:prose-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      {/* TypeScript: Wir greifen auf Eigenschaften des getypten 'post'-Objekts zu.
          TypeScript stellt sicher, dass diese Eigenschaften existieren und den richtigen Typ haben. */}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-6">
        Von {post.author} am {post.date}
        {/* TypeScript: Wieder die optionale Kategorie prüfen */}
        {post.category && ` in ${post.category}`}
      </p>
      {/* TypeScript: post.content ist vom Typ string. Wir nutzen dangerouslySetInnerHTML,
          da unser content einfacher HTML-String ist. Vorsicht bei echtem User-Input! */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};

export default PostDetail;
```

**Schritt 8: (Optional) API-Route mit TypeScript**

Wir erstellen eine einfache API-Route, die alle Posts als JSON zurückgibt. Dies zeigt, wie man API-Anfragen und -Antworten typisiert.

Erstelle den Ordner `src/app/api/posts` und darin die Datei `src/app/api/posts/route.ts`.

TypeScript

```TypeScript
// src/app/api/posts/route.ts

import { NextResponse } from 'next/server'; // Hilfsfunktion für API-Antworten
import { getPosts } from '@/data/posts'; // Unsere Datenabruffunktion
import { Post } from '@/types/post'; // TypeScript: Import des Post-Interfaces

/**
 * TypeScript: Handler für GET-Anfragen an /api/posts.
 * Wir definieren die Funktion als 'async', da getPosts ein Promise zurückgibt.
 * Der Rückgabetyp ist implizit ein Promise<NextResponse<Post[]>>,
 * da NextResponse automatisch den Inhalt typisiert, wenn wir getypte Daten übergeben.
 */
export async function GET() {
  // TypeScript: Ruft die getPosts-Funktion auf, die ein getyptes Array von Posts zurückgibt.
  const posts: Post[] = await getPosts();

  // TypeScript: NextResponse.json() nimmt die Daten und typisiert die Antwort entsprechend.
  // Die API-Antwort wird automatisch JSON sein und der Body wird als Post[] getypt.
  return NextResponse.json(posts);
}

// Beispiel für eine POST-Route (nicht implementiert, nur zur Typ-Demo)
/*
import { NextRequest } from 'next/server'; // Für typisierte Request-Objekte

// TypeScript: Definieren des erwarteten Request Bodys für eine POST-Anfrage
interface CreatePostRequestBody {
    title: string;
    content: string;
    author?: string; // Autor optional bei Erstellung?
    category?: string;
}

// TypeScript: Handler für POST-Anfragen.
// Wir können den Request-Parameter typisieren, um auf den Body zuzugreifen.
export async function POST(req: NextRequest) {
    // TypeScript: Parsen des Request Bodys. Wir können den erwarteten Typ angeben.
    const body: CreatePostRequestBody = await req.json();

    // Hier würde die Logik zum Speichern des neuen Posts folgen...
    console.log('Received new post data:', body);

    // TypeScript: Rückgabe einer Bestätigung mit getyptem Body (z.B. den erstellten Post)
    // Hier nur eine einfache Erfolgsmeldung
    return NextResponse.json({ message: 'Post created successfully', received: body }, { status: 201 });
}
*/
```

**Schritt 9: (Optional) Einfaches State Management mit TypeScript**

Angenommen, wir möchten eine einfache Suchfunktion auf der Startseite hinzufügen, die Posts nach Titel filtert. Wir verwenden `useState`.

Bearbeite die Datei `src/app/page.tsx` erneut.

TypeScript

```TypeScript
// src/app/page.tsx (aktualisiert)

'use client'; // TypeScript: Dieses Modul ist eine Client Component, da wir Hooks (useState) verwenden

import { useState, useEffect } from 'react'; // TypeScript: Importieren von React Hooks
import Link from 'next/link';
import { getPosts } from '@/data/posts';
import { Post } from '@/types/post';
import PostCard from '@/components/PostCard';

/**
 * TypeScript: Dieses Mal ist es eine Client Component (wegen 'use client').
 * Client Components können keine `async` Funktion sein, daher holen wir die Daten
 * im `useEffect` Hook oder direkt beim Initialisieren des States, wenn die Daten
 * bereits vom Server als Prop übergeben wurden (wie es mit getStaticProps/getServerSideProps
 * im Pages Router der Fall wäre). Im App Router holen wir sie hier im Client nach.
 * Eine alternative im App Router wäre es, die initiale Liste auf dem Server zu holen
 * (wie in der vorherigen Version dieser Datei) und dann Client-Side-Filtering hinzuzufügen.
 * Für dieses Beispiel demonstrieren wir Client-Side Fetching und State Management.
 */
export default function Home() {
  // TypeScript: Definieren des States für die Liste der Posts.
  // Initialwert ist ein leeres Array. TypeScript weiß, dass 'posts' vom Typ 'Post[]' ist.
  const [posts, setPosts] = useState<Post[]>([]);

  // TypeScript: Definieren des States für den Suchbegriff.
  // Initialwert ist ein leerer String. TypeScript weiß, dass 'searchTerm' vom Typ 'string' ist.
  const [searchTerm, setSearchTerm] = useState<string>('');

  // TypeScript: Effekt, um die Posts zu laden, wenn die Komponente gemountet wird.
  useEffect(() => {
    const fetchPosts = async () => {
      // TypeScript: Die getPosts-Funktion gibt Promise<Post[]> zurück.
      // Nach dem await ist 'fetchedPosts' vom Typ 'Post[]'.
      const fetchedPosts: Post[] = await getPosts();
      // TypeScript: Wir setzen den State mit dem getypten Array.
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []); // Leeres Array als Abhängigkeit bedeutet, Effekt läuft nur einmal beim Mounten

  /**
   * TypeScript: Handler für die Änderung des Suchinput-Feldes.
   * Das Event-Objekt wird automatisch von React/TypeScript typisiert (`React.ChangeEvent<HTMLInputElement>`).
   * Dadurch können wir sicher auf `event.target.value` zugreifen.
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TypeScript: event.target.value ist ein string. Wir setzen den State damit.
    setSearchTerm(event.target.value);
  };

  /**
   * TypeScript: Filtern der Posts basierend auf dem Suchbegriff.
   * 'posts' ist vom Typ 'Post[]'. Die filter-Methode erstellt ein neues Array.
   * TypeScript weiß, dass jedes 'post'-Element im filter-Callback vom Typ 'Post' ist.
   * Die toLowerCase()-Methode ist sicher, da title und excerpt vom Typ string sind.
   */
  const filteredPosts: Post[] = posts.filter((post: Post) => // Explizite Typisierung optional
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) // excerpt ist optional
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Aktuelle Blogbeiträge</h1>

      {/* TypeScript: Der Input-Wert ist mit dem 'searchTerm' State verbunden. */}
      {/* onChange Handler ist mit der getypten Funktion verbunden. */}
      <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Beiträge suchen..."
            className="p-2 border border-gray-300 rounded-md w-full max-w-md"
            value={searchTerm}
            onChange={handleSearchChange} // TypeScript: Übergabe des Event-Handlers
          />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TypeScript: Wir rendern das gefilterte Array.
            Dieses Array enthält immer noch Objekte vom Typ 'Post'. */}
        {filteredPosts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* TypeScript: Wenn nach dem Filtern keine Beiträge übrig sind, zeigen wir eine Nachricht. */}
        {filteredPosts.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">Keine Beiträge gefunden.</p>
        )}
      </div>
    </main>
  );
}
```

**Schritt 10: Styling mit Tailwind CSS**

Tailwind CSS wurde beim Setup bereits eingerichtet. Du kannst die im Code verwendeten Klassen wie `container`, `mx-auto`, `px-4`, `py-8`, `text-4xl`, `font-bold`, `mb-8`, `text-center`, `grid`, `gap-6`, `border`, `p-6`, `rounded-lg`, `shadow-lg`, `bg-white`, `prose`, `lg:prose-xl`, `hover:underline`, `text-blue-600` verwenden, um dem Blog ein einfaches, aber ansprechendes Aussehen zu geben.

Um sicherzustellen, dass der `prose` Plugin funktioniert (für das Styling des HTML-Inhalts in `PostDetail`), stelle sicher, dass es in deiner `tailwind.config.ts` enthalten ist:

TypeScript

```TypeScript
// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Füge das Typography-Plugin hinzu
  ],
}
export default config
```

**Projekt starten:**

Führe im Terminal im Projektverzeichnis aus:

Bash

```
npm run dev
```

Öffne deinen Browser und gehe zu `http://localhost:3000`. Du solltest die Liste der Blogbeiträge sehen können. Klicke auf einen Beitrag, um zur Detailansicht zu gelangen.

**Zusammenfassung der TypeScript-Anwendung in diesem Projekt:**

- **Datenstrukturen:** Wir haben ein klares `interface` (`Post`) definiert, das die Form unserer Blogbeiträge vorgibt.
- **Datenabruf:** Wir haben die Rückgabetypen unserer Datenabruffunktionen (`getPosts`, `getPostBySlug`, `getPostSlugs`) typisiert (`Promise<Post[]>`, `Promise<Post | undefined>`, `Promise<{ slug: string }[]>`), was uns hilft zu wissen, welche Daten wir erwarten und wie wir sie sicher handhaben können (insbesondere der `| undefined` Fall).
- **Komponenten-Props:** Wir haben Interfaces (`PostCardProps`, `PostDetailProps`) verwendet, um zu definieren, welche Props unsere Komponenten erwarten und welchen Typ diese haben müssen. TypeScript prüft dann automatisch, ob die übergebenen Props passen.
- **Dynamische Routen & Parameter:** Wir haben die `params` für dynamische Routen (`PostPageProps`, `GenerateMetadataProps`) typisiert, sodass wir wissen, dass wir sicher auf `params.slug` als string zugreifen können.
- **API-Routen:** Wir haben die Request- und Response-Objekte typisiert, um die Daten, die in unsere API-Route hereinkommen und herausgehen, klar zu definieren.
- **State Management (useState):** Wir haben den State (`useState<Post[]>`, `useState<string>`) explizit typisiert, was uns hilft, den Überblick über den Datentyp des States zu behalten und sicherzustellen, dass wir nur Werte des richtigen Typs zuweisen.
- **Event-Handler:** TypeScript typisiert automatisch Standard-DOM-Events (`React.ChangeEvent<HTMLInputElement>`), sodass wir wissen, welche Eigenschaften das Event-Objekt hat (z. B. `event.target.value`).
- **Array-Methoden:** Beim Verwenden von `map`, `filter` etc. auf getypten Arrays (`Post[]`), weiß TypeScript den Typ der einzelnen Elemente im Callback, was die Arbeit mit den Daten erleichtert und sicherer macht.
- **Optionale Eigenschaften:** Das `?` im `Post`-Interface erlaubt uns, Eigenschaften als optional zu markieren. TypeScript zwingt uns dann, beim Zugriff auf diese Eigenschaften zu prüfen, ob sie existieren (`post.excerpt && ...`).

Dieses Projekt bietet eine solide Grundlage, um die Integration von TypeScript in einem realen Next.js-Projekt zu verstehen. Du hast gesehen, wie TypeScript dir hilft, Fehler frühzeitig zu erkennen, die Code-Qualität zu verbessern und das Verständnis der Datenflüsse zu erleichtern.

**Nächste Schritte zum weiteren Lernen:**

- **Füge ein echtes Backend/Datenbank hinzu:** Ersetze das statische Daten-Array durch eine API, die du selbst baust (z. B. mit Next.js API Routes und einer Datenbank wie PostgreSQL, MongoDB oder einem Service wie Supabase/Firebase) oder binde ein Headless CMS an. Dabei wirst du die API-Response-Typisierung weiter vertiefen.
- **Implementiere CRUD-Operationen:** Füge Funktionen zum Erstellen, Bearbeiten und Löschen von Beiträgen hinzu. Dies erfordert die Typisierung von Formularen, API-Anfragen (POST, PUT, DELETE) und möglicherweise komplexeres State Management.
- **Füge Authentifizierung hinzu:** Sichere das CMS ab, sodass nur eingeloggte Benutzer Beiträge bearbeiten können. Hier musst du Benutzerdaten, Sessions und geschützte Routen typisieren.
- **Erkunde Zod oder Yup:** Diese Bibliotheken helfen bei der Laufzeitvalidierung von Daten, was besonders in API-Routen und Formularen nützlich ist und sich gut mit TypeScript integrieren lässt (sie können TypeScript-Typen aus den Validierungsschemata generieren).
- **Erkunde TanStack Query (React Query) oder SWR:** Diese Bibliotheken für Datenabruf im Client-Side bieten exzellente TypeScript-Unterstützung.
- **Verwende Context API oder eine State Management Library (Zustand, Redux Toolkit):** Für komplexeren globalen State ist die Typisierung dieser Lösungen eine weitere gute Übung.