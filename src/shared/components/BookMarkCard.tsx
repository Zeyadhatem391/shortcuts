"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, EllipsisVertical, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shortcuts } from "../types/type";
import BookmarkIcon from "./BookmarkIcon";
import { useShortcutsStore } from "../store/shortcuts.store";

interface BookMarkCardProps {
  bookmark: Shortcuts;
}

export default function BookMarkCard({ bookmark }: BookMarkCardProps) {
  const hasDescription = Boolean(bookmark.des?.trim());

  const removeShortcut = useShortcutsStore((state) => state.removeShortcut);
  const toggleFavorite = useShortcutsStore((state) => state.toggleFavorite);

  const domain = new URL(bookmark.url).hostname;

  return (
    <div className="group rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <Link
          href={bookmark.url}
          target="_blank"
          className="flex min-w-0 items-center gap-2.5"
        >
          <BookmarkIcon url={bookmark.url} />

          <div className="flex min-w-0 flex-col">
            <p className="truncate font-semibold text-gray-900">
              {bookmark.title}
            </p>

            <span className="truncate text-sm text-gray-500">{domain}</span>
          </div>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              aria-label="Bookmark actions"
            >
              <EllipsisVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onClick={() => toggleFavorite(bookmark.id)}
              className="cursor-pointer gap-2"
            >
              <Heart
                className={`h-4 w-4 ${
                  bookmark.favorite ? "fill-red-500 text-red-500" : ""
                }`}
              />

              <span>
                {bookmark.favorite
                  ? "Remove from favorites"
                  : "Add to favorites"}
              </span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => removeShortcut(bookmark.id)}
              className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
            >
              <Trash className="h-4 w-4" />
              <span>Delete bookmark</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {hasDescription && (
        <Link href={bookmark.url} target="_blank">
          <div className="flex flex-col gap-4 border-t border-green-200 pt-4 mt-4">
            {hasDescription && (
              <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                {bookmark.des}
              </p>
            )}
          </div>
        </Link>
      )}
    </div>
  );
}
