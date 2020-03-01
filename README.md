# LoginSystem
Next.js framework pour creer des sites d'un rendu backend

Avantages:
-routes dynamiques
-rendu à partir d'un server
-chargement rapide
-accepte CSS
-Hot Module Replacement
-route pour API avec fonctions serverless


1. Start :

mkdir hello-next
cd hello-next
npm init -y
npm install --save react react-dom next

mkdir pages

2. remplacer dans le fichier package.json "scripts" :

"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}

3.
npm run dev

4. Creer et mettre contenus dans premiere page dans pages/index.js:

export default function Index() {
  return (
    <div>
      <p>Hello Next.js</p>
    </div>
  );
}

5. Ajouter lien :
import Link from 'next/link';

export default function Index() {
  return (
    <div>
    <Link href="/about">
    <a>About page</a>
    </Link>
      <p>Hello Next.js</p>
    
    </div>
  );
}
6. Ajouter une prop:

<a title='about page'>About page</a>

7. Ajouter component:
-creer dossier component et mettre Header.js:

import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default Header;

-dans index.js

import Header from '../components/Header';

export default function Index() {
  return (
    <div>
    <Header/>
      <p>Hello Next.js</p>
    
    </div>
  );
}

8. Dossiers spéciaux:

Les dossiers spéciaux sont /pages et /public.
Il n'y a pas de regles pour nommer les autres

9. Layouts + props.children:
-creer MyLayout.js dans components

import Header from './Header';
const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};
const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children} //*
  </div>
);
export default Layout;

-dans index.js:

import Layout from '../components/MyLayout';
export default function Index() {
  return (
    <Layout>
      <p>Hello Next.js</p> //le contenu de Layout sera le props.children
    </Layout>
  );
}

-autres méthodes :
https://nextjs.org/learn/basics/using-shared-components/rendering-children-components

utiliser contenu en tant que prop: 
-remplacer dans Layout : {props.children} par {props.content}
-remplacer dans index :
const IndexPageContent = <p>Hello Next.js</p>
export default function Index() {
  return (
    <Layout content={IndexPageContent}/>  
  );
}

9. Créer pages dynamiques: (générer une page à partir d'un lien)
-index.js:
const PostLink = props => (
    <li>
        <Link href={`/post?title=${props.title}`}>{/*Attention backtick! */}
            <a>{props.title}</a>
        </Link>
    </li>
);
export default function Index() {
  return (
    <Layout>

      <h1>My Shop LokiCorp</h1>
        <ul>
            <PostLink title='Hello Next.js'/> {/*Lien vers post.js*/}
            <PostLink title='lol2'/>
            <PostLink title='lol3'/>
        </ul>
    </Layout>
  );
}

-creer pages/post.js:

import { useRouter } from 'next/router'; //<-fct useRouter de React Hook
import Layout from '../components/MyLayout';
const Page = () => {
  const router = useRouter();   //<---- userouter
  return (
    <Layout>
      <h1>{router.query.title}</h1>
        {/* router query utilise un string en param */}
      <p>This is the blog post content.</p>
    </Layout>
  );
};
export default Page;

-Version améliorée: (Attention aux types de fermetures () et {} !!
const Content = () => {
  const router = useRouter(); 
  return (
    <>
        <h1>{router.query.title}</h1>
         <p>This is the blog post content.</p>
    </>
  );
};
const Page = () => (
    <Layout>
      <Content />
    </Layout>
)
export default Page;

-résultat lorsqu'on clique sur le 1er lien : 
http://localhost:3000/post?title=Hello%20Next.js

10. Améliorer l'url:
- Arriver à passer de ".../post?title=Hello%20Next.js" à ".../p/hello-nextjs"
- Creer /pages/p/[id].js  et y mettre : (oui avec le bracket)


import { useRouter } from 'next/router';
import Layout from '../../components/MyLayout'; //(Attention chemin)

export default function Post() {
  const router = useRouter(); 
  return (
    <Layout>
      <h1>{router.query.id}</h1>
         <p>`This is the {router.query.id} content.`</p>
    </Layout>
  );
}
- index.js:

const PostLink = props => (
    <li>
        {/* le [] permet le routage dynamique */}
        <Link href="/p/[id]" as={`/poll/${props.id}`}> 
            <a>{props.id}</a>
        </Link>
    </li>
);
export default function Index() {
  return (
    <Layout>
      <h1>My Shop LokiCorp</h1>
        <ul>
            <PostLink id='Hello Next.js'/>
            <PostLink id='lol2'/>
            <PostLink id='lol3'/>
        </ul>
    </Layout>
  );
}

- Note: on peut faire backward et forward sur la page, l'historique de nav.
est pris en compte grace à 'as'.
- Note2 : Attention syntaxe de as ex: as={`/p/${maRech.id}`}

11. Choper des donnees et les mettre sur une page : (Fetching data)
- Note : getInitialProps ne peut seulement être inclus dans un default component
exporté par une page, sinon ça marche pas !
- On va travailler avec un api --> https://www.tvmaze.com/api
- Chaque api a sa manière de faire, ici on doit connaitre la structure 
(id, show, name, etc.)
- lancer -->  npm i --save isomorphic-unfetch
-index.js :

import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout';

const Index = props => (
   <Layout>
        <h1>
            Pokemon TV Shows
        </h1>
        <ul>
            {props.shows.map(
                maRecherche=>(
                    <li key={maRecherche.id}>
                        <Link href="/p/[id]" as={`/p/${maRecherche.id}`}>
                            <a>{maRecherche.name}</a>
                        </Link>
                    </li>
                )
            )}
        </ul>
    </Layout>
);
// getInitialProps est une fct asynchrone qu'on peut mettre sur 
// n'importe quelle page de l'app, grace à ça on peut chercher les
// donnees et les envoyer en prop à la page.
Index.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);
    return {
        shows: data.map(entree => entree.show)
    };
};
export default Index;

- Note : le message du console.log est seulement affiché dans le serveur pas
chez le client lorsque l'on refresh la page, car on a déjà les datas pas besoin
de les fetch chez le client.
- Note2 : on peut raccourcir en 1 ligne 
const res = await fetch("https://...").then(r=> r.json);
puis return avec res.map(...)

12. Implémenter les données aux pages: (fetching data2)

- dans pages/p/[id].js :

import { useRouter } from 'next/router';
import Layout from '../../components/MyLayout';
import fetch from "isomorphic-unfetch";

const Post = props => (
    <Layout>
        <h1>{props.data.name}</h1>
        <p>{props.data.summary.replace(/<[/]?[pb]>/g, '')}</p>
        {props.data.image ? <img src={props.data.image.medium}/> :null}
    </Layout>
);
Post.getInitialProps = async function(context){
    // context.query est un Objet qui va servir à fetch la data 
    const {id} = context.query;
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await res.json();
    console.log(`Fetch result = ${data.name}`);
    return {data};
}
export default Post;

- Note : ici, le message du console.log aparaitra dans la console du nav,
car après avoir cliqué sur le <Link>, on navigue coté client. Mais si on
y accède directement ex: http://localhost:3000/p/975 le message sera 
affiché coté serveur.

13. Styling Components : 
- Next.js contient un framework appellé styled-jsx (CSS dans un framework js)
et nous permet de faire nos rules en CSS traditionnel pour les components mais
pas les enfants des components ! (css scoped)
- ajouter dans Header.js:
    <Link href="/styled">
      <a style={linkStyle}>Styled Page</a>
    </Link>
- creer la page pages/styled.js et y mettre :

import Link from 'next/link';
import Layout from '../components/MyLayout';

function getPosts(){
    return [
        { id: 'hello-nextjs', title: 'Hello Next.js' },
        { id: 'learn-nextjs', title: 'Learn Next.js is awesome' },
        { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT' }
    ];
}
export default function Blog() {
    return (
      <Layout>
        <h1>My Blog</h1>
        <ul>
          {getPosts().map(post => (
            <li key={post.id}>
              <Link href="/p/[id]" as={`/p/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>{`
          h1,
          a {
            font-family: 'Arial';
          }
  
          ul {
            padding: 0;
          }
  
          li {
            list-style: none;
            margin: 5px 0;
          }
  
          a {
            text-decoration: none;
            color: orange;
          }
  
          a:hover {
            opacity: 0.6;
          }
        `}</style>
      </Layout>
    );
  }

- Note : on remarque bien qu'après <style jsx> on a {` `}, car styled jsx
marche comme un plugin babel.

- Le jsx ne s'appliquera pas sur des nested components à l'intérieur du 
component principal par ex ici dans <Layout> si on ajoute un component child à 
l'interieur alors ce meme component ne recevra pas de style. Pour remédier à
cela il faut il faudra définir un style jsx dans ce meme component child,
utiliser un global selector.

14. Global styles :
- On va ici utiliser les styles sur un component child pour l'exemple
- npm i --save react-markdown (notre child sera un component type markdown)
- on va utiliser <style jsx global> 

- dans styled.js:

import { useRouter } from 'next/router';
import Markdown from 'react-markdown';
import Layout from '../../components/MyLayout';

export default () => {
  const router = useRouter();
  return (
    <Layout>
      <h1>{router.query.id}</h1>
      <div className="markdown">
        <Markdown
          source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
      `}
        />
      </div>
      <style jsx global>{`
        .markdown {
          font-family: 'Arial';
            color: red;
        }

        .markdown a {
          text-decoration: none;
          color: blue;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    </Layout>
  );
};

- Note: On remarque que les styles s'applique au component child
- Note2 : meme si c'est pratique, il est préfèrable d'utiliser le style scoped
- Note3: Sinon on peut importer un fichier sass voir doc :
https://github.com/zeit/next-plugins/tree/master/packages/next-sass

15. Routes API:

- Note: les routes API sont lambdas (des fonctions serverless) et
qui tournent dans Node. 
Et dans Next.js chaque page dans "pages/api/" est une route API, se qui le distingue 
d'un component.

- Creer une route API: (res.status et res.json sont des response helpers de Next.js)
- Creer fichier pages/api/randomQuote.js et y mettre :

export default (req, res) => {
  res.status(200).json({
    quote: 'Write tests, not too many, mostly integration',
    author: 'Guillermo Rauch'
  });
};

- Voir notre route créée : http://localhost:3000/api/randomQuote.

16. Fetching d'une route API : 
- Installer 'swr' qui est un React Hook pour le data fetching à distance

npm i swr

- Créer fichier quotes.json au meme niveau que package.json (pour l'exemple)
et y mettre:

[
  {
    "quote": "Write tests, not too many, mostly integration",
    "author": "Guillermo Rauch"
  },
  {
    "quote": "Where there is a will, there is a way",
    "author": "Unknown"
  },
  {
    "quote": "You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character.",
    "author": "Unknown"
  },
  {
    "quote": "Every passing moment, we are nearing death and a new Javascript framework",
    "author": "Amandeep Singh"
  }
]

- Dans /pages/api/randomQuote.js remplacer par: 

import quotes from '../../quotes.json';
export default (req, res) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  res.status(200).json(quote);
};

- Ajouter ces lignes dans Headers.js :

<Link href="/random">
      <a style={linkStyle}>Random Page</a>
    </Link>

- Creer pages/random.js y mettre :

import useSWR from 'swr';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}
export default function Index() {
  const { data, error } = useSWR('/api/randomQuote', fetcher);
  // The following line has optional chaining, added in Next.js v9.1.5,
  // is the same as `data && data.author`
  const author = data?.author;
  let quote = data?.quote;

  if (!data) quote = 'Loading...';
  if (error) quote = 'Failed to fetch the quote.';

  return (
    <main className="center">
      <div className="quote">{quote}</div>
      {author && <span className="author">- {author}</span>}

      <style jsx>{`
        main {
          width: 90%;
          max-width: 900px;
          margin: 300px auto;
          text-align: center;
        }
        .quote {
          font-family: cursive;
          color: #e243de;
          font-size: 24px;
          padding-bottom: 10px;
        }
        .author {
          font-family: sans-serif;
          color: #559834;
          font-size: 20px;
        }
      `}</style>
    </main>
  );
}

17. Middlewares :

- Les routes API fournissent des built in middlewares qui vont parser 
les 'req' tel que 'req.query'

- Remplacer dans pages/api/randomQuote.js :

import allQuotes from '../../quotes.json';

export default (req, res) => {
  const { author } = req.query;
  let quotes = allQuotes;

  if (author) {
    quotes = quotes.filter(quote => quote.author.toLowerCase().includes(author.toLowerCase()));
  }
  if (!quotes.length) {
    quotes = allQuotes.filter(quote => quote.author.toLowerCase() === 'unknown');
  }

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  res.status(200).json(quote);
};
- Note : si "author" du req.query n'est pas trouvé on met les quotes de "unknown"

- Dans ramdom.js tout remplacer par :

import { useRouter } from 'next/router';
import useSWR from 'swr';

function fetcher(url) {
    return fetch(url).then(r => r.json());
  }
  export default function Randomer() {
    const { query } = useRouter();
    const { data, error } = useSWR(
      `/api/randomQuote${query.author ? '?author=' + query.author : ''}`,
      fetcher
    );
    // The following line has optional chaining, added in Next.js v9.1.5,
    // is the same as `data && data.author`
    const author = data?.author;
    let quote = data?.quote;
  
    if (!data) quote = 'Loading...';
    if (error) quote = 'Failed to fetch the quote.';
  
    return (
      <main className="center">
        <div className="quote">{quote}</div>
        {author && <span className="author">- {author}</span>}
  
        <style jsx>{`
          main {
            width: 90%;
            max-width: 900px;
            margin: 300px auto;
            text-align: center;
          }
          .quote {
            font-family: cursive;
            color: #e243de;
            font-size: 24px;
            padding-bottom: 10px;
          }
          .author {
            font-family: sans-serif;
            color: #559834;
            font-size: 20px;
          }
        `}</style>
      </main>
    );
  }

- si on entre l'url : "http://localhost:3000/random?author=rauch" on aura 
toujours la quote de l'auteur "rauch"
-  const { query } = useRouter(); va prendre l'url de la page actuelle 
comme base, par ex pour l'index ce sera "/"

18. Deployer l'app sur zeit:

- aller à la racine de l'app et taper dans le terminal : 'now'



