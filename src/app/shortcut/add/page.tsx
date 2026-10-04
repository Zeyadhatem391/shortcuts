"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import {
  AddShortcut,
  AddShortcutInput,
  AddShortcutOutput,
} from "@/shared/schema/schema";

import HomeLayout from "@/shared/components/layout/HomeLayout";
import { Category } from "@/shared/types/type";
import { useShortcutsStore } from "@/shared/store/shortcuts.store";

const availableCategory: Category[] = [
  { id: "1", title: "Development" },
  { id: "2", title: "Learning" },
  { id: "3", title: "Design" },
  { id: "4", title: "Tools" },
  { id: "5", title: "Inspiration" },
  { id: "6", title: "Work" },
];

function Page() {
  const router = useRouter();

  const [openCategory, setOpenCategory] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddShortcutInput, unknown, AddShortcutOutput>({
    resolver: zodResolver(AddShortcut),
    defaultValues: {
      title: "",
      url: "",
      des: "",
      category: [],
    },
    mode: "all",
  });

  const selectedCategory = watch("category") ?? [];

  const toggleCategory = (category: Category) => {
    const exists = selectedCategory.some(
      (selected) => selected.id === category.id,
    );

    if (exists) {
      setValue(
        "category",
        selectedCategory.filter((selected) => selected.id !== category.id),
        { shouldValidate: true, shouldDirty: true },
      );
    } else {
      setValue("category", [...selectedCategory, category], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const removeCategory = (categoryId: string) => {
    setValue(
      "category",
      selectedCategory.filter((category) => category.id !== categoryId),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  const addShortcut = useShortcutsStore((state) => state.addShortcut);

  const onSubmit = async (data: AddShortcutOutput) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    addShortcut({
      id: crypto.randomUUID(),
      title: data.title,
      url: data.url,
      des: data.des || undefined,
      category: data.category,
      favorite: false,
    });

    console.log(data);

    reset();
    router.push("/");
  };

  return (
    <HomeLayout>
      <div className="flex w-full justify-center px-3 sm:px-5 lg:px-6">
        <div className="w-full max-w-2xl rounded-xl bg-white p-3 shadow-sm sm:p-6 lg:p-7">
          <h1 className="pb-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Add Shortcut
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label
                  htmlFor="title"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Title
                </Label>

                <Input
                  id="title"
                  type="text"
                  {...register("title")}
                  placeholder="Enter shortcut title"
                  className="h-10 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-0"
                />

                {errors.title && (
                  <p className="text-xs text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div className="grid gap-1.5">
                <Label
                  htmlFor="url"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  URL
                </Label>

                <Input
                  id="url"
                  type="url"
                  {...register("url")}
                  placeholder="https://example.com"
                  className="h-10 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-0"
                />

                {errors.url && (
                  <p className="text-xs text-red-600">{errors.url.message}</p>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Categories
                <span className="font-normal normal-case text-muted-foreground">
                  (Optional)
                </span>
              </Label>

              <Popover open={openCategory} onOpenChange={setOpenCategory}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCategory}
                    className="min-h-10 w-full justify-between rounded-xl border-gray-200 bg-gray-50 px-3 font-normal hover:bg-gray-100"
                  >
                    <div className="flex flex-wrap gap-1">
                      {selectedCategory.length > 0 ? (
                        selectedCategory.map((category) => (
                          <Badge
                            key={category.id}
                            variant="secondary"
                            className="rounded-md"
                          >
                            {category.title}

                            <span
                              role="button"
                              tabIndex={0}
                              aria-label={`Remove ${category.title}`}
                              onClick={(event) => {
                                event.stopPropagation();
                                removeCategory(category.id);
                              }}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  removeCategory(category.id);
                                }
                              }}
                              className="ml-1 cursor-pointer"
                            >
                              <X className="h-3 w-3" />
                            </span>
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground">
                          Select categories...
                        </span>
                      )}
                    </div>

                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Search categories..." />

                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>

                      <CommandGroup>
                        {availableCategory.map((category) => {
                          const isSelected = selectedCategory.some(
                            (selected) => selected.id === category.id,
                          );

                          return (
                            <CommandItem
                              key={category.id}
                              value={category.title}
                              onSelect={() => toggleCategory(category)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  isSelected ? "opacity-100" : "opacity-0",
                                )}
                              />

                              {category.title}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Description */}
            <div className="grid gap-1.5">
              <Label
                htmlFor="description"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Description{" "}
                <span className="font-normal normal-case text-muted-foreground">
                  (Optional)
                </span>
              </Label>

              <Textarea
                id="description"
                {...register("des")}
                placeholder="Add a short description..."
                className="min-h-24 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-0"
              />

              {errors.des && (
                <p className="text-xs text-red-600">{errors.des.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
              <Button
                onClick={() => {
                  reset();
                  router.back();
                }}
                type="button"
                variant="outline"
                disabled={isSubmitting}
                className="h-11 w-full cursor-pointer rounded-xl border-border font-semibold sm:w-28"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full cursor-pointer gap-2 rounded-xl bg-blue-700 font-semibold text-white shadow-sm transition-all hover:bg-blue-800 hover:shadow-md sm:w-40"
              >
                <Plus className="h-4 w-4" />

                {isSubmitting ? "Adding..." : "Add Shortcut"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Page;
