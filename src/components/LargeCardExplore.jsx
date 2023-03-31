import Image from "next/image";
import Link from "next/link";

function LargeCardExplore({ link, image }) {
    return (
        <section className="relative py-16 cursor-pointer">
            <div className="relative h-96 min-w-[300px]">
                <Image src={image} layout="fill" objectFit="cover" className="rounded-2xl" />
            </div>

            <div className="absolute top-32 left-12">
                <h3 className="text-4xl mb-3 w-64 text-grey-700">Explore</h3>
                <p className="text-grey-700">Find populare hikes!</p>
                <Link href={link}>
                    <button className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5">Explore</button>
                </Link>
            </div>
            
        </section>
    );
    
}

export default LargeCardExplore