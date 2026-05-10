import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sub/Sup Converter",
  description: "Text to unicode subscript/superscript converter",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <noscript>
          JavaScript が無効なため、このページのリアルタイム変換は動作しません。ブラウザ設定で JavaScript を有効にしてください。
        </noscript>
        {children}
      </body>
    </html>
  );
}
