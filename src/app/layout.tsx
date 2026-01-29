import "../styles/globalStyles.css.ts";
import { lightTheme } from "../styles/theme.css.ts";
import React from "react";
import type { ReactNode } from "react";

export const metadata = {
  title: "WORDINGO",
  description:
    "Timed word rounds, bingo ball draws, and a dramatic bonus finale inspired by TV game shows.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return React.createElement(
    "html",
    { lang: "en" },
    React.createElement(
      "body",
      { className: lightTheme },
      children,
    ),
  );
}
