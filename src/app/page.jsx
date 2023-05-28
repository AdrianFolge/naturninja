// Fix the problem for "search params object is empty in production with next 13 app dir"

// for more info "https://github.com/vercel/next.js/issues/43077"
export const dynamic = "force-dynamic"; // this is the fix
import { client } from '../../lib/client';
import UserResults from '@/components/UserResults';
import Map from '@/components/Map';
import ResultsSmallcard from '@/components/ResultsSmallcard';
import LargeCard from '@/components/LargeCard';
import LargeCardExplore from '@/components/LargeCardExplore';

const API_KEY = process.env.API_KEY;



export default async function Home({ searchParams }) {
  const query = '*[_type == "hikes"]';
  const dbHikes  = await client.fetch(query);

  return (
    <div>
        <div className='max-w-6xl mx-auto py-4'>
          <Map mapData={dbHikes}/>
        </div>
        <div className='max-w-6xl mx-auto py-4'>
          <h2 className="text-4xl font-semibold pb-5">Explore nearby</h2>
          <ResultsSmallcard results={dbHikes} />
        </div>
        <h2 className="text-4xl font-semibold pb-5 max-w-6xl mx-auto py-4">Your hikes</h2>
        <UserResults results={dbHikes}/>
        <div className='max-w-6xl mx-auto py-4 space-x-2 grid grid-cols-1 gap-2 sm:grid-cols-2 px-2'>
          <LargeCard link={"/new"} image={"/banner_image.jpeg"}/>
          <LargeCardExplore  link={"/find"} image={"/explore.jpeg"}/>
        </div>
    </div>
  );
}
