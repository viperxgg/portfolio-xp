import "xp.css/dist/XP.css";
import "./globals.css";

export const metadata = {
  title: "Azzam Khalaf – Portfolio XP",
  description:
    "Interactive Windows XP-style portfolio of Azzam Khalaf – web developer & digital creator. Log in and explore the desktop.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
