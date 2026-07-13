import "xp.css/dist/XP.css";
import "./globals.css";

export const metadata = {
  title: "Azzam Khalaf & FRAMFORM — Interaktiv portfolio",
  description:
    "Utforska Azzam Khalafs projekt och FRAMFORMs arbete med webb, digitala system och automation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
