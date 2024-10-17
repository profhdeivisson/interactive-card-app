export const metadata = {
  title: "WebApp Interactive Card",
  description: "WebApp Interactive Card by Deivisson",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="../../public/images/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
