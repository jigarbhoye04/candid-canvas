"use client";

import { clsx } from "clsx/lite";
import SiteGrid from "../components/SiteGrid";
import { SHOW_REPO_LINK } from "@/site/config";
import RepoLink from "../components/RepoLink";
import { usePathname } from "next/navigation";
import { PATH_ADMIN_PHOTOS, isPathAdmin, isPathSignIn } from "./paths";
import SubmitButtonWithStatus from "@/components/SubmitButtonWithStatus";
import { signOutAndRedirectAction } from "@/auth/actions";
import Spinner from "@/components/Spinner";
import AnimateItems from "@/components/AnimateItems";
import { useAppState } from "@/state/AppState";
import SocialLinks from "./sociallinks";
import Link from "next/link";
import {
   FaLinkedin,
   FaBehance,
   FaDribbble,
   FaDiscord,
   FaGithub,
   FaInstagram,
   FaFacebook,
   FaSpotify,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
   const pathname = usePathname();
   const { userEmail, setUserEmail } = useAppState();
   const showFooter = !isPathSignIn(pathname);
   const shouldAnimate = !isPathAdmin(pathname);
   const { setIsCommandKOpen } = useAppState();

   return (
      <div className="flex justify-center w-full max-w-7xl py-4 my-10 z-50">
         <SiteGrid
            contentMain={
               <AnimateItems
                  animateOnFirstLoadOnly
                  type={!shouldAnimate ? "none" : "bottom"}
                  distanceOffset={10}
                  items={
                     showFooter
                        ? [
                             <div
                                key="footer"
                                className={clsx(
                                   "flex flex-col gap-4",
                                   "text-dim min-h-10",
                                   "px-4 sm:px-6 md:px-8", // Added padding here
                                   "bg-dim-900"
                                )}
                             >
                                <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
                                   <div className="flex items-center gap-x-2">
                                      {SHOW_REPO_LINK && <RepoLink />}
                                      <span>&nbsp;|&nbsp;</span>
                                      <span>Jigar</span>
                                      <span>&nbsp;|&nbsp;</span>
                                      <span>2024</span>
                                   </div>
                                   <SocialLinks />
                                </div>
                                {isPathAdmin(pathname) && (
                                   <div className="flex gap-x-3 xs:gap-x-4 flex-grow flex-wrap">
                                      {userEmail === undefined && (
                                         <Spinner
                                            size={14}
                                            className="translate-y-[2px]"
                                         />
                                      )}
                                      {userEmail && (
                                         <>
                                            <div
                                               className={clsx(
                                                  "truncate max-w-full"
                                               )}
                                            >
                                               {userEmail}
                                            </div>
                                            <form
                                               action={() =>
                                                  signOutAndRedirectAction().then(
                                                     () =>
                                                        setUserEmail?.(undefined)
                                                  )
                                               }
                                            >
                                               <SubmitButtonWithStatus
                                                  styleAs="link"
                                               >
                                                  Sign out
                                               </SubmitButtonWithStatus>
                                            </form>
                                         </>
                                      )}
                                   </div>
                                )}
                             </div>,
                          ]
                        : []
                  }
               />
            }
         />
      </div>
   );
}
