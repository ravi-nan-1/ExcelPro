"use client";

import { formulas } from '@/lib/formulas';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';

type GroupedFormulas = {
  [category: string]: {
    [subcategory: string]: typeof formulas;
  };
};

export default function FormulasSidebar() {
  const pathname = usePathname();

  const groupedFormulas = formulas.reduce<GroupedFormulas>((acc, formula) => {
    const { category, subcategory } = formula;
    if (!acc[category]) {
      acc[category] = {};
    }
    if (!acc[category][subcategory]) {
      acc[category][subcategory] = [];
    }
    acc[category][subcategory].push(formula);
    return acc;
  }, {});

  const currentCategory = formulas.find(f => pathname === `/formulas/${f.slug}`)?.category;

  return (
    <Card className="p-4 sticky top-20">
        <h2 className="text-lg font-semibold mb-4 px-2">Formula Explorer</h2>
      <Accordion type="single" collapsible defaultValue={currentCategory || Object.keys(groupedFormulas)[0]}>
        {Object.entries(groupedFormulas).map(([category, subcategories]) => (
          <AccordionItem value={category} key={category}>
            <AccordionTrigger className="text-base font-medium">{category}</AccordionTrigger>
            <AccordionContent>
              {Object.entries(subcategories).map(([subcategory, formulaList]) => (
                <div key={subcategory} className="pl-2">
                  <h4 className="font-semibold text-sm text-muted-foreground my-2">{subcategory}</h4>
                  <ul className="space-y-1">
                    {formulaList.map((formula) => (
                      <li key={formula.slug}>
                        <Link
                          href={`/formulas/${formula.slug}`}
                          className={cn(
                            'block p-2 rounded-md text-sm transition-colors',
                            pathname === `/formulas/${formula.slug}`
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'hover:bg-accent/50 text-foreground/80'
                          )}
                        >
                          {formula.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
