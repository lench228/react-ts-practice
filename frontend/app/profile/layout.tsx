import Image from "next/image";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="m-16 mt-0">{children}</main>;
}
