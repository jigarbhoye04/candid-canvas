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
import ThemeSwitcher from "./ThemeSwitcher";
import "../site/customFonts.css";

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
                          <>
                             <div className="font-aspect-range text-center text-3xl font-bold p-8">
                                <a href="/" className="text-inherit">
                                   JIGRAA
                                </a>
                             </div>
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
                                      "hidden md:block"
                                   )}
                                >
                                   {renderLink(siteDomainOrTitle, PATH_ROOT)}
                                   {/* Photos By JIGAR */}
                                </div>
                                <div
                                   className={clsx(
                                      "flex gap-x-3 xs:gap-x-4 flex-grow flex-wrap",
                                      "justify-end"
                                   )}
                                >
                                   <ThemeSwitcher />
                                </div>
                             </div>
                             ,
                          </>,
                       ]
                     : []
               }
            />
         }
      />
   );
}
