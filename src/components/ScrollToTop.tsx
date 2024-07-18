'use client';
import { useEffect, useState } from "react";
import "./components.css";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        };
    
        window.addEventListener("scroll", toggleVisibility);
    
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
    
    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
    };
    
    return (
        <div
        className={`scroll-to-top ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
        >
        {/* <FaCircleArrowUp /> */}
        <FaArrowCircleUp />

        </div>
    );
};

export default ScrollToTop;