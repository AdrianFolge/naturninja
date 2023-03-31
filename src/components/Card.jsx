
import Image from "next/image";
import Link from "next/link";
import { FiThumbsUp } from "react-icons/fi";

export default function Card({ result }) {

  const date = result._createdAt.slice(0, 10)
  return (
    <div className="cursor-pointer p-3 hover:shadow-slate-400 shadow-md rounded-lg border border-slate-400 m-2 transition-shadow duration-200 group">
      <Link href={`/movie/${result._id}`}>
        <div
          className="bg-cover bg-center h-64 flex items-end"
          style={{
            backgroundImage: `url(${result.img_path})`,
            opacity: 0.5,
            transition: "opacity 0.3s ease",
            borderRadius: "15px",
          }}
        >
          <div className="p-2 text-Stone-950">
            <h2 className="text-lg font-bold truncate">
              {result.title || result.name}
            </h2>
            <p className="line-clamp-2">{result.overview}</p>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <p>
            {date}
            <FiThumbsUp className="h-5 ml-3" /> {result.vote_count}
          </p>
          <h2 className="ml-auto font-bold">{result.length || 0}</h2>
        </div>
      </Link>
    </div>
  );
}
