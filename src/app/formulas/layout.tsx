import FormulasSidebar from "@/components/layout/formulas-sidebar";

export default function FormulasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 md:px-6">
      {children}
    </div>
  );
}
