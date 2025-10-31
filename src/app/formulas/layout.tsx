import FormulasSidebar from "@/components/layout/formulas-sidebar";

export default function FormulasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] gap-8 py-8">
        <aside className="hidden md:block">
          <FormulasSidebar />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
