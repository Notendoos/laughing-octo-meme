import type * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}

declare module "react/jsx-dev-runtime" {
  namespace JSX {
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}
