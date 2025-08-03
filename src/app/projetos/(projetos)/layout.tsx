import { Header } from "@/components/header";
export default function ProjetosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute bg-white sticky top-0 left-0 w-full z-50">
        <Header />
      </div>
      {children}
    </>
  );
}