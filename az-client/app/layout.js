import "../styles/globals.css";
import Header from "../components/header";
// import Footer from "../components/footer";
import "react-toastify/dist/ReactToastify.css";

import ContextProvider from "../context/context-provider";

export const metadata = {
  title: "آزمایشگاه کوچک من",
  description: "یک آزمایشگاه با کلی آزمایش جذاب برای بچه ها",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR">
      <header>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width ,initial-scale=1" />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </header>
      <body className="bg-[#CFFFDC]">
        <ContextProvider>
          <Header />
          {children}
          {/* <Footer /> */}
        </ContextProvider>
      </body>
    </html>
  );
}
