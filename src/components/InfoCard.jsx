import Image from "next/image";
import Link from "next/link";
import { FiThumbsUp } from "react-icons/fi";

export default function InfoCard({ result }) {
    return (
      <div className="cursor-pointer sm:p-3 sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200 group">
        <Link href={`/movie/${result._id}`}>
          <Image
            src={result.img_path}
            width={100}
            height={100}
            className="sm:rounded-t-lg group-hover:opacity-80 transition-opacity duration-200"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            placeholder="blur"
            blurDataURL="/spinner.svg"
            alt="image is not available"
          ></Image>
          <div className="p-2">
            <p className="line-clamp-2 text-md">{result.overview}</p>
            <h2 className="truncate text-lg font-bold">
              {result.title || result.name}
            </h2>
            <p className="flex items-center">
              {result.release_date || result.first_air_date}
              <FiThumbsUp className="h-5 mr-1 ml-3" /> {result.vote_count}
            </p>
            <h2 className="truncate text-lg font-bold">
              {result.length || 0}
            </h2>
          </div>
        </Link>
      </div>
    );
  }