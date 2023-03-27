// Fix the problem for "search params object is empty in production with next 13 app dir"

// for more info "https://github.com/vercel/next.js/issues/43077"

export const dynamic = "force-dynamic"; // this is the fix
import { client } from '../../lib/client';
import Results from "@/components/Results";
import Map from "@/components/Map";

const API_KEY = process.env.API_KEY;



export default async function Home({ searchParams }) {
  const query = '*[_type == "hikes"]';
  const dbHikes  = await client.fetch(query);
  
  const genre = searchParams.genre || "fetchTrending";
  const res = await fetch(
    `https://api.themoviedb.org/3/${
      genre === "fetchTopRated" ? "movie/top_rated" : "trending/all/week"
    }?api_key=${API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 10000 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data"); // this will be caught by the error page and passed to the page as props
  }

  const data = await res.json();

  const results = data.results;

  return (
    <div>
      <div className='max-w-6xl mx-auto space-y-4 p-4'>
        <Map mapData={dbHikes}/>
      </div>
      <Results results={dbHikes} />
    </div>
  );
}
