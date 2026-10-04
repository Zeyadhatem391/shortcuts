"use client";

import {
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Home,
  Lightbulb,
  Palette,
  Star,
  Tags,
  Wrench,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import SidebarLink from "./layout/SidebarLink";

const categories = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Favorites",
    href: "/?favorites=true",
    icon: Star,
  },
  {
    label: "Development",
    href: "/?category=development",
    icon: Code2,
  },
  {
    label: "Learning",
    href: "/?category=learning",
    icon: BookOpen,
  },
  {
    label: "Design",
    href: "/?category=design",
    icon: Palette,
  },
  {
    label: "Tools",
    href: "/?category=tools",
    icon: Wrench,
  },
  {
    label: "Inspiration",
    href: "/?category=inspiration",
    icon: Lightbulb,
  },
  {
    label: "Work",
    href: "/?category=work",
    icon: BriefcaseBusiness,
  },
];

export default function MobileCategories() {
  return (
    <div className="fixed right-5 bottom-5 z-50 md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-green-800 shadow-lg hover:bg-green-900"
          >
            <Tags className="h-5 w-5" />
            <span className="sr-only">Open categories</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          side="top"
          sideOffset={10}
          className="w-52 p-2"
        >
          <div className="mb-1 px-3 py-2 text-sm font-semibold text-gray-900">
            Categories
          </div>

          <div className="space-y-1">
            {categories.map((item) => (
              <SidebarLink key={item.label} {...item} />
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
