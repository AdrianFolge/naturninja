import Image from "next/image";
import UserResults from "@/components/UserResults";
import { client } from '../../../lib/client';


export default async function About() {
  const query = '*[_type == "hikes"]';
  const dbHikes  = await client.fetch(query);

  const antall = dbHikes.length
  let length = 0;

  for (let i = 0; i < dbHikes.length; i++) {
    length+=dbHikes[i].length;
  }
  
  return (
      <div className="items-center mx-auto max-w-6xl">
        <div className="grid grid-cols-3 gap-4 items-center">
        <div className="col-span-1 p-4  mx-auto flex flex-col justify-center items-center">
          <div className="h-32 w-32 rounded-full overflow-hidden">
            <Image
                src="/explore.jpeg"
                alt="Profile"
                width={128}
                height={128}
              />
            </div>
            <h1 className="font-bold">Adrian Folge</h1>
            <h1>24 år</h1>
            <div className="flex space-x-2">
              <h1 className="bg-slate-100 rounded-xl p-2 font-bold">{antall} turer</h1>
              <h1 className="bg-slate-100 rounded-xl p-2 font-bold">{Math.ceil(length)} km</h1>
            </div>
        </div>
        <div className="col-span-2 p-4">
          <div className="relative h-60 min-w-[300px]">
              <Image
                  src="/explore.jpeg"
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
        </div>
        </div>
        <div>
        <UserResults results={dbHikes} />
        </div>
    </div>
  );
}
