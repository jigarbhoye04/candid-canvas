"use client";

import { clsx } from "clsx/lite";
import SiteGrid from "../components/SiteGrid";
import ThemeSwitcher from "@/site/ThemeSwitcher";
import Link from "next/link";
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
import Switcher from "@/components/Switcher";
import SwitcherItem from "@/components/SwitcherItem";
import IconSearch from "./IconSearch";

export default function Footer() {
   const pathname = usePathname();

   const { userEmail, setUserEmail } = useAppState();

   const showFooter = !isPathSignIn(pathname);

   const shouldAnimate = !isPathAdmin(pathname);

   const { setIsCommandKOpen } = useAppState();

   return (
      <>
         {/* <div className="fixed bottom-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-md"> */}
         <div className="bottom-0 left-0 right-0 z-50">
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
                                      "flex items-center justify-between gap-1",
                                      "text-dim min-h-10",
                                      "px-4 sm:px-6 md:px-8" // Added padding here
                                   )}
                                >
                                   <div className="flex gap-x-3 xs:gap-x-4 flex-grow flex-wrap">
                                      {isPathAdmin(pathname) ? (
                                         <>
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
                                                              setUserEmail?.(
                                                                 undefined
                                                              )
                                                        )
                                                     }
                                                  >
                                                     <SubmitButtonWithStatus styleAs="link">
                                                        Sign out
                                                     </SubmitButtonWithStatus>
                                                  </form>
                                               </>
                                            )}
                                         </>
                                      ) : (
                                         <>
                                            {/* <Link href={PATH_ADMIN_PHOTOS}>
                                               Admin
                                            </Link> */}
                                            {SHOW_REPO_LINK && <RepoLink />}
                                         </>
                                      )}
                                   </div>
                                   <div className="flex items-center h-10 justify-between">
                                      <SocialLinks />
                                   </div>
                                </div>,
                             ]
                           : []
                     }
                  />
               }
            />
         </div>
      </>
   );
}
