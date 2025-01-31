export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="container row-span-7 p-[2rem]">{children}</section>
  );
}
