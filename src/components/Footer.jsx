import { AiFillGithub, AiOutlineTwitter, AiFillInstagram, AiFillCopyrightCircle } from "react-icons/ai";
import Link from "next/link";



export default function Footer() {
  return (
    <div className="flex justify-between mx-2 max-w-6xl sm:mx-auto items-center bg-gray-700 my-4 py-2 mb-0 text-gray-200 px-2">
      <div className="flex space-x-2 items-center">
        <p>NaturNinja</p> 
        <AiFillCopyrightCircle />
      </div>
      <div className="flex items-center space-x-5">
        <AiFillGithub />
        <AiFillInstagram />
        <Link href="/">
          <AiOutlineTwitter />
        </Link>
      </div>
    </div>
  );
}