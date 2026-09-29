import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"],
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "crumb. — small-batch cupcake shop",
  description:
    "crumb. is a small cupcake shop on Butter Lane. We bake every morning and sell until the case is empty. Order a box for pickup, delivery or a party.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <noscript>
          <style>{`
            .reveal, .reveal--words .w { opacity: 1 !important; transform: none !important; clip-path: none !important; }
            .eyebrow::before { transform: scaleX(1) !important; }
          `}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
