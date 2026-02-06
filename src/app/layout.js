import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import FreeConsultation from "./components/FreeConsultation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
export const metadata = {
  title: "Studio — Product & Portrait Photography",
  description:
    "Premium product and editorial portrait photography for brands and creators. View selected works and request a quote.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopBar />
        <Navbar />
        {children}
        <FreeConsultation />
      </body>
    </html>
  );
}
