
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
    // context.query est un objet qui va servir à fetch data 
    const {id} = context.query;
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await res.json();
    console.log(`Fetch result = ${data.name}`);
    return {data};
}
export default Post;