"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export default function SidebarLink({
  href,
  label,
  icon: Icon,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");

  const isActive =
    href === "/"
      ? pathname === "/" && !currentCategory
      : href === "/?favorites=true"
        ? pathname === "/" && searchParams.get("favorites") === "true"
        : href.includes("category=")
          ? pathname === "/" &&
            currentCategory ===
              new URLSearchParams(href.split("?")[1]).get("category")
          : pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? "bg-green-100 text-green-800"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}
