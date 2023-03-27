import Image from "next/image";
import { client } from '../../../../lib/client';
import Map from "@/components/Map";

async function getHike(hikeId) {
  const query = `*[_id == "${hikeId}"]`;
  const dbHikes  = await client.fetch(query);
  return dbHikes
}

export default async function MoviePage({ params }) {
  const hikeId = params.id;
  const hikeResult = await getHike(hikeId);
  const hike = hikeResult[0]
  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6">
        <Image
          src={hike.img_path}
          width={500}
          height={300}
          className="rounded-lg"
          style={{
            maxWidth: "100%",
            height: "100%",
          }}
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="Movie poster"
        ></Image>
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">
            {hike.title}
          </h2>
          <p className="text-lg mb-3">
            <span className="font-semibold mr-1">Overview:</span>
            {hike.overview}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {hike.release_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {hike.upvotes}
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto space-y-4 p-4">
        <Map mapData={hikeResult} />
      </div>
    </div>
  );
}
