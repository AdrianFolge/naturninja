import Image from "next/image"
import Link from "next/link";

function Smallcard({result}) {
    return (
        <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-grey-100 hover:scale-105 transition transform duration-200 ease-out">
            <Link href={`/movie/${result._id}`}>
                <div className="relative h-16 w-16">
                    <Image 
                        src={result.img_path}
                        layout="fill"
                        className="rounded-lg"
                    />
                </div>

                <div>
                    <h2>{result.title}</h2>
                    <h3 className="text-gray-500">{result.city}</h3>
                </div>
            </Link>
            
        </div>
    )
}

export default Smallcard