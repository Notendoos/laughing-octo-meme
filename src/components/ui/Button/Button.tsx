import type { ButtonHTMLAttributes, ReactElement } from "react";
import * as styles from "./Button.css.ts";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({
  variant = "primary",
  disabled,
  children,
  ...rest
}: ButtonProps): ReactElement {
  return (
    <button
      className={`${styles.base} ${styles.variants[variant]} ${
        disabled ? styles.disabled : ""
      }`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
