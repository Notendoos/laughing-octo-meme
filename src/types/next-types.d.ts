import type {
  ResolvingMetadata as NextResolvingMetadata,
  ResolvingViewport as NextResolvingViewport,
} from "next/dist/lib/metadata/types/metadata-interface.js";

declare module "next/types.js" {
  export type ResolvingMetadata = NextResolvingMetadata;
  export type ResolvingViewport = NextResolvingViewport;
}
