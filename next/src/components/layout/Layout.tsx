import React from "react";
import { MainContainer } from "../../styles/global";
import SideBar from "./SideBar";

interface LayoutProps {
  children: JSX.Element;
  pageName: string;
}

export default function Layout(props: LayoutProps) {
  const { pageName, children } = props;

  return (
    <div>
      <SideBar name={pageName}>
        <MainContainer>{children}</MainContainer>
      </SideBar>
    </div>
  );
}
