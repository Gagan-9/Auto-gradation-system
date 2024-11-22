import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "Solve It",
  description: "Best Coding platform for all your needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <SessionWrapper>
          {children}
        </SessionWrapper>
        <Footer />
      </body>
    </html>
  );
}

