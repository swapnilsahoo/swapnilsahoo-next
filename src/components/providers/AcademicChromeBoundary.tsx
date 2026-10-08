"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
// Academic navigation and employer-branded footer remain on the academic site.
export function AcademicChromeBoundary({children}:{children:ReactNode}) {
  const pathname=usePathname();
  return pathname?.startsWith("/learning-lab")?null:children;
}
