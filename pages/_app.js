import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={`${inter.className} text-slate-800 bg-slate-50 min-h-screen selection:bg-indigo-500 selection:text-white`}>
      <Component {...pageProps} />
    </div>
  );
}
