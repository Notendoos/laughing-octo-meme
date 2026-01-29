import "../styles/globalStyles.css";
import { lightTheme } from "../styles/theme.css";

export const metadata = {
  title: "WORDINGO",
  description:
    "Timed word rounds, bingo ball draws, and a dramatic bonus finale inspired by TV game shows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lightTheme}>{children}</body>
    </html>
  );
}
