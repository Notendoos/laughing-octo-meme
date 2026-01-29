import "../styles/globalStyles.css.ts";
import { DEFAULT_THEME } from "../styles/theme.css.ts";
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
    { lang: "en", "data-theme": DEFAULT_THEME },
    React.createElement("body", null, children),
  );
}
