"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
   FaBook,
   FaDiscord,
   FaGithub,
   FaInstagram,
   FaLinkedin,
   FaSpotify,
   FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialLinks() {
   const { theme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) {
      return null;
   }

   return (
      <div className="flex flex-col items-center sm:flex-row sm:gap-4">
        <h4 className="text-lg font-semibold pt-2 pb-4 sm:pt-0 sm:pb-0">Follow Me</h4>
         <ul className="flex space-x-4">
            <li>
               <a
                  href="https://github.com/jigarbhoye04"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  {theme === "dark" ? (
                     <FaGithub className="text-gray-100 w-6 h-8" />
                  ) : (
                     <FaGithub className="text-black w-6 h-8" />
                  )}
               </a>
            </li>
            <li>
               <a
                  href="https://x.com/jigarbhoye04"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  {theme === "dark" ? (
                     <FaXTwitter className="text-gray-100 w-6 h-8" />
                  ) : (
                     <FaXTwitter className="text-black w-6 h-8" />
                  )}
               </a>
            </li>
            <li>
               <a
                  href="https://discord.com/channels/jigx.04"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <FaDiscord className="bg-blue-700 rounded-full p-1 text-gray-200 w-8 h-8" />
               </a>
            </li>
            <li>
               <a
                  href="https://instagram.com/iamjigx"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <FaInstagram className="text-pink-500 w-6 h-8" />
               </a>
            </li>
            <li>
               <a
                  href="https://open.spotify.com/user/rlf9k73tkyeg4n0o34ezact5f"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <FaSpotify className="text-green-500 w-6 h-8" />
               </a>
            </li>
         </ul>
      </div>
   );
}
