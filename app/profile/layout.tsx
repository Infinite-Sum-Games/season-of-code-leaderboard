import localFont from "next/font/local";
import "../globals.css";

const CinzelDecorative = localFont({
  src: "../fonts/CinzelDecorative-Bold.woff2",
  variable: "--font-cinzel",
  weight: "700",
  display: "swap",
});

const Cormorant = localFont({
  src: "../fonts/CormorantGaramond-Regular.woff2",
  variable: "--font-cormorant",
  weight: "400",
  display: "swap",
});

const Spectral = localFont({
  src: "../fonts/Spectral-Regular.woff2",
  variable: "--font-spectral",
  weight: "400",
  display: "swap",
});



export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${CinzelDecorative.variable} ${Cormorant.variable} ${Spectral.variable}`}>
      {children}
    </div>
  );
}
