import React, { FC, ReactNode } from "react";
import { Navbar } from "./NavBar";

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
interface MainLayoutProps {
  children: ReactNode;
}
