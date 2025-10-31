'use server';

import { formulas, getFormulaBySlug } from '@/lib/formulas';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import FormulaPageClient from './FormulaPageClient';

export function generateStaticParams() {
  return formulas.map((formula) => ({
    slug: formula.slug,
  }));
}

export default function FormulaPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const formula = getFormulaBySlug(slug);

  if (!formula) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">{formula.category}</Badge>
          <Badge variant="outline">{formula.subcategory}</Badge>
        </div>
        <h1 className="text-4xl font-bold mt-4 font-headline">{formula.name} Function</h1>
        <p className="text-lg text-muted-foreground mt-2">{formula.description}</p>
      </header>
      
      <FormulaPageClient formula={formula} />

    </div>
  );
}
