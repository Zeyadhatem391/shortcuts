"use client";

import { useEffect, useState } from "react";

import { useShortcutsStore } from "@/shared/store/shortcuts.store";

function ZustandProviders({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      await Promise.all([useShortcutsStore.persist.rehydrate()]);

      setHydrated(true);
    };

    hydrate();
  }, []);

  if (!hydrated) {
    return null;
  }

  return children;
}

export default ZustandProviders;
