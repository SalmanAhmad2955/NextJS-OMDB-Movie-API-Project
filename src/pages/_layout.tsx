import React, { PropsWithChildren } from "react";
import NavBar from "@/components/navbar/NavBar";
import Provider from "./provider";

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <Provider>
    <>
      <NavBar />
      <main>{children}</main>
    </>
  </Provider>
);

export default Layout;
