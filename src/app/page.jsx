// Fix the problem for "search params object is empty in production with next 13 app dir"

// for more info "https://github.com/vercel/next.js/issues/43077"
export const dynamic = "force-dynamic"; // this is the fix
import { client } from '../../lib/client';
import Results from "@/components/Results";
import Map from "@/components/Map";
import FrontPageComp from '@/components/FrontPageComp';

const API_KEY = process.env.API_KEY;



export default async function Home({ searchParams }) {
  const query = '*[_type == "hikes"]';
  const dbHikes  = await client.fetch(query);

  return (
    <div>
        <FrontPageComp dbHikes={dbHikes}/>
    </div>
  );
}
