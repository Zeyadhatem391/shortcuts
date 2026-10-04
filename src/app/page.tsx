"use client";

import { useSearchParams } from "next/navigation";

import BookMarkCard from "@/shared/components/BookMarkCard";
import HomeLayout from "@/shared/components/layout/HomeLayout";
import { useShortcutsStore } from "@/shared/store/shortcuts.store";

export default function Home() {
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("category");
  const favorites = searchParams.get("favorites");
  const search = searchParams.get("search");

  const shortcuts = useShortcutsStore((state) => state.shortcuts);

  const filteredShortcuts = shortcuts.filter((shortcut) => {
    const matchesSearch =
      !search || shortcut.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !categoryId ||
      shortcut.category?.some(
        (category) => category.title.toLowerCase() === categoryId.toLowerCase(),
      );

    const matchesFavorites = favorites !== "true" || shortcut.favorite;

    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const isFavoritesPage = favorites === "true";

  const hasCategoryFilter = Boolean(categoryId);
  const hasSearchFilter = Boolean(search);

  return (
    <HomeLayout>
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isFavoritesPage
              ? "Favorite Shortcuts"
              : hasCategoryFilter
                ? "Filtered Shortcuts"
                : hasSearchFilter
                  ? "Search Results"
                  : "All Shortcuts"}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {isFavoritesPage
              ? "Shortcuts you added to your favorites."
              : hasCategoryFilter
                ? "Shortcuts belonging to the selected category."
                : hasSearchFilter
                  ? `Shortcuts matching "${search}".`
                  : "Manage and organize your saved shortcuts."}
          </p>
        </div>

        {filteredShortcuts.length > 0 ? (
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredShortcuts.map((bookmark) => (
              <BookMarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-60 flex-col items-center justify-center rounded-xl border border-dashed text-center">
            <p className="font-semibold text-gray-700">
              {isFavoritesPage ? "No favorite shortcuts" : "No shortcuts found"}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {isFavoritesPage
                ? "Add a shortcut to your favorites to see it here."
                : "No shortcuts match your current filters."}
            </p>
          </div>
        )}
      </section>
    </HomeLayout>
  );
}
