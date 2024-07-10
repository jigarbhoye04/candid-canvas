"use client";

import { clsx } from "clsx/lite";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SiteGrid from "../components/SiteGrid";
import ViewSwitcher, { SwitcherSelection } from "@/site/ViewSwitcher";
import {
   PATH_ROOT,
   isPathAdmin,
   isPathGrid,
   isPathProtected,
   isPathSignIn,
} from "@/site/paths";
import AnimateItems from "../components/AnimateItems";
import { useAppState } from "@/state/AppState";

export default function Nav({
   siteDomainOrTitle,
}: {
   siteDomainOrTitle: string;
}) {
   const pathname = usePathname();

   const { isUserSignedIn } = useAppState();

   const showNav = !isPathSignIn(pathname);

   const renderLink = (text: string, linkOrAction: string | (() => void)) =>
      typeof linkOrAction === "string" ? (
         <Link href={linkOrAction}>{text}</Link>
      ) : (
         <button onClick={linkOrAction}>{text}</button>
      );

   const switcherSelectionForPath = (): SwitcherSelection | undefined => {
      if (pathname === PATH_ROOT) {
         return "full-frame";
      } else if (isPathGrid(pathname)) {
         return "grid";
      } else if (isPathProtected(pathname)) {
         return "admin";
      }
   };

   return (
      <SiteGrid
         contentMain={
            <AnimateItems
               animateOnFirstLoadOnly
               type={!isPathAdmin(pathname) ? "bottom" : "none"}
               distanceOffset={10}
               items={
                  showNav
                     ? [
                          <div
                             key="nav"
                             className={clsx(
                              // "fixed top-0 left-0 p-5",
                                "flex items-center",
                                "w-full min-h-[4rem]"
                             )}
                          >
                             <ViewSwitcher
                                currentSelection={switcherSelectionForPath()}
                                showAdmin={isUserSignedIn}
                             />
                             <div
                                className={clsx(
                                   "flex-grow text-right text-ellipsis overflow-hidden",
                                   "hidden xs:block"
                                )}
                             >
                                {renderLink(siteDomainOrTitle, PATH_ROOT)}
                             </div>
                          </div>,
                       ]
                     : []
               }
            />
         }
      />
   );
}


/*
"use client";

import { clsx } from "clsx/lite";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SiteGrid from "../components/SiteGrid";
import ViewSwitcher, { SwitcherSelection } from "@/site/ViewSwitcher";
import {
   PATH_ROOT,
   isPathAdmin,
   isPathGrid,
   isPathProtected,
   isPathSignIn,
} from "@/site/paths";
import AnimateItems from "../components/AnimateItems";
import { useAppState } from "@/state/AppState";

export default function Nav({
   siteDomainOrTitle,
}: {
   siteDomainOrTitle: string;
}) {
   const pathname = usePathname();

   const { isUserSignedIn } = useAppState();

   const showNav = !isPathSignIn(pathname);

   const renderLink = (text: string, linkOrAction: string | (() => void)) =>
      typeof linkOrAction === "string" ? (
         <Link href={linkOrAction}>{text}</Link>
      ) : (
         <button onClick={linkOrAction}>{text}</button>
      );

   const switcherSelectionForPath = (): SwitcherSelection | undefined => {
      if (pathname === PATH_ROOT) {
         return "full-frame";
      } else if (isPathGrid(pathname)) {
         return "grid";
      } else if (isPathProtected(pathname)) {
         return "admin";
      }
   };

   return (
      <>
         <div className="fixed top-0 left-0 w-full z-50 bg-opacity-60 backdrop-blur-md">
            <div
               className={clsx(
                  "flex items-center",
                  "w-full min-h-[4rem]",
                  "px-4 sm:px-6 md:px-8" // Added padding here
               )}
            >
               <ViewSwitcher
                  currentSelection={switcherSelectionForPath()}
                  showAdmin={isUserSignedIn}
               />
               <div
                  className={clsx(
                     "flex-grow text-right text-ellipsis overflow-hidden",
                     "hidden xs:block"
                  )}
               >
                  {renderLink(siteDomainOrTitle, PATH_ROOT)}
               </div>
            </div>
         </div>
         <SiteGrid
            contentMain={
               <AnimateItems
                  animateOnFirstLoadOnly
                  type={!isPathAdmin(pathname) ? "bottom" : "none"}
                  distanceOffset={10}
                  items={showNav ? [] : []}
               />
            }
         />
      </>
   );
}

*/