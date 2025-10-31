import { getFormulaBySlug, formulas } from '@/lib/formulas';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ExcelSimulator from '@/components/excel/excel-simulator';
import { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const formula = getFormulaBySlug(params.slug);

  if (!formula) {
    return {
      title: 'Formula Not Found',
    };
  }

  return {
    title: `Excel ${formula.name} Function | ExcelPro`,
    description: `Learn how to use the ${formula.name} function in Excel. ${formula.description}`,
  };
}

export async function generateStaticParams() {
  return formulas.map((formula) => ({
    slug: formula.slug,
  }));
}

export default function FormulaPage({ params }: Props) {
  const formula = getFormulaBySlug(params.slug);

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

      <Card>
        <CardHeader>
          <CardTitle>Syntax</CardTitle>
        </CardHeader>
        <CardContent>
          <code className="bg-muted text-muted-foreground p-4 rounded-md block font-mono text-sm">
            {formula.syntax}
          </code>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Step-by-Step Tutorial</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {formula.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Interactive Simulator</CardTitle>
            <CardDescription>Watch the formula in action.</CardDescription>
          </CardHeader>
          <CardContent>
            <ExcelSimulator simulationKey={formula.simulationKey} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
