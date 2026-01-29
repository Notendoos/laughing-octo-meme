import { globalStyle } from "@vanilla-extract/css";
import { themeContract } from "./theme.css.ts";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("body", {
  fontFamily: themeContract.font.primary,
  color: themeContract.color.text,
  background:
    `radial-gradient(circle at 15% 15%, rgba(250, 204, 21, 0.15), transparent 55%), ${themeContract.color.background}`,
  margin: 0,
  minHeight: themeContract.layout.pageMinHeight,
});

globalStyle("#__next", {
  minHeight: themeContract.layout.pageMinHeight,
});

globalStyle(".sr-only", {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  border: 0,
});
