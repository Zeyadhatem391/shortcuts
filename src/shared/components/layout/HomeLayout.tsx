import { ReactNode } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import MobileCategories from "../MobileCategories";

interface Props {
  children: ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return (
    <div className="min-h-screen lg:flex">
      <div className="hidden md:block">
        <SideBar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <NavBar />
        <main className="flex-1 overflow-y-auto bg-gray-100/50 p-4 lg:p-8">
          {children}
          <MobileCategories />
          <div className="mb-5" />
        </main>
      </div>
    </div>
  );
}
