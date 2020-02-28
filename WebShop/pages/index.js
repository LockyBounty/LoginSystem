import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout';

const Index = props => (
    <Layout>
        <h1>
            Batman TV Shows
        </h1>
        <ul>
            {props.shows.map(
                show=>(
                    <li key={show.id}>
                        <Link href="/p/[id]" as={`/p/${show.id}`}>
                            <a>{show.name}</a>
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

