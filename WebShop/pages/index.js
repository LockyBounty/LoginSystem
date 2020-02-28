import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout';


const Index = props => (
    <Layout>
        <h2>My Tv Show</h2>
        <ul>
            {props.shows.map( maRech =>(
                <li key={maRech.id}>
                    <Link href="/p/[id]" as ={`/p/${maRech.id}`}>
                        <a>{maRech.name}</a>
                    </Link>
                </li>
            )

            )}
        </ul>
    </Layout>

);


Index.getInitialProps = async function () {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();
    console.log(data.length)
    return {
        shows: data.map(entree=>entree.show)
    }
}



export default Index;