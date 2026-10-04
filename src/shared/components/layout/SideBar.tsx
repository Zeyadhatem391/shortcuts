import {
  Bookmark,
  Home,
  Star,
  Code2,
  BookOpen,
  Palette,
  Wrench,
  Lightbulb,
  BriefcaseBusiness,
} from "lucide-react";

import SidebarLink from "./SidebarLink";

const navigation = [
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
];

const categories = [
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

export default function SideBar() {
  return (
    <aside className="min-h-screen w-64 shrink-0 border-r px-5 py-8">
      {/* Logo */}
      <div className="flex items-center gap-2 whitespace-nowrap">
        <div className="shrink-0 rounded-lg bg-green-800 p-1.5">
          <Bookmark className="h-5 w-5 text-white" />
        </div>

        <p className="text-lg font-bold tracking-tight">Shortcut Manager</p>
      </div>

      {/* Navigation */}
      <div className="mt-10">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Navigation
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <SidebarLink key={item.label} {...item} />
          ))}
        </nav>
      </div>

      {/* Collections */}
      <div className="mt-8">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Collections
        </p>

        <nav className="space-y-1">
          {categories.map((item) => (
            <SidebarLink key={item.label} {...item} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
