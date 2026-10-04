"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";

export default function NavBar() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: true,
  });

  return (
    <header className="flex h-16 w-full items-center justify-between gap-2 border-b px-3 sm:px-5 md:px-6">
      <div className="relative min-w-0 flex-1 sm:max-w-80">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <Input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search shortcuts..."
          className="h-10 pl-9 text-sm"
        />
      </div>

      <Button
        asChild
        className="h-10 shrink-0 cursor-pointer gap-2 bg-green-800 px-3 hover:bg-green-900 sm:px-4"
      >
        <Link href="/shortcut/add">
          <Plus className="h-4 w-4" />

          <span className="hidden xs:inline sm:inline">Add Shortcut</span>
        </Link>
      </Button>
    </header>
  );
}
