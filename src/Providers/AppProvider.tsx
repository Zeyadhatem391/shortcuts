import { ReactNode } from "react";
import ZustandProviders from "./ZustendProviders";
import { NuqsAdapter } from "nuqs/adapters/next";

interface Props {
  children: ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <>
      <ZustandProviders><NuqsAdapter>{children}</NuqsAdapter></ZustandProviders>
    </>
  );
}
