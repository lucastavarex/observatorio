"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  const isGeoportalPage = pathname.includes("geoportal");
  
  if (isGeoportalPage) {
    return null;
  }
  
  return <Footer />;
}
