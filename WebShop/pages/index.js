import Link from 'next/link';

import Layout from '../components/MyLayout';

const IndexPageContent = <p>Hello Next.js</p>;

export default function Index() {
  return (
    <Layout content={IndexPageContent}/>  
  );
}

