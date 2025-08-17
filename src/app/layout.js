import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

export const metadata = {
  title: "Studio Gravitas - Architecture Studio",
  description: "Architecture studio firm based in Italy and Australia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
