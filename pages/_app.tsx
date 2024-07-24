import { AppProps } from "next/app";
import "../styles/index.css";
import { Red_Hat_Display, Merriweather } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const rhd = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rhd",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${rhd.variable} ${merriweather.variable}`}>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-FJZBCYDNY5" />
    </div>
  );
}

export default MyApp;
