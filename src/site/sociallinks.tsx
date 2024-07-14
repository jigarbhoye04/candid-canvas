'use client';

import { useState,useEffect } from "react";
import { useTheme } from "next-themes";

import { FaBook, FaInstagram,FaTwitter } from "react-icons/fa";

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
        <div className="flex space-x-4">
            <a
                href="https://www.instagram.com/iamjigx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-gray-500"
            >
                <FaInstagram className="w-5 h-8"/>
            </a>
            <a
                href="https://www.x.com/jigarbhoye04"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-gray-500"
            >
                <FaTwitter className="w-5 h-8"/>
            </a>
            <a
                href="https://blogsbyjigar.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-gray-500"
            >
                <FaBook className="w-5 h-8"/>
            </a>
        </div>
    );
}
