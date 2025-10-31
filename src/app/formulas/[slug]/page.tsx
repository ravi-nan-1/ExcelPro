'use client';

import { getFormulaBySlug } from '@/lib/formulas';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ExcelSimulator from '@/components/excel/excel-simulator';
import { CheckCircle, Copy, Check } from 'lucide-react';
import { useState, use } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// NOTE: generateMetadata and generateStaticParams are removed because they are only supported in Server Components.
// This component is now a Client Component to handle the copy-to-clipboard state.

export default function FormulaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const formula = getFormulaBySlug(slug);
  const [isCopied, setIsCopied] = useState(false);

  if (!formula) {
    notFound();
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(formula.syntax);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

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

      <div className="space-y-8">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-xl">Step-by-Step Tutorial</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ul className="space-y-2">
              {formula.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-xl">Syntax</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="relative">
              <code className="bg-muted text-muted-foreground p-4 pr-12 rounded-md block font-mono text-sm w-full">
                {formula.syntax}
              </code>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8"
                      onClick={handleCopy}
                    >
                      {isCopied ? <Check className="text-primary" /> : <Copy />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isCopied ? 'Copied!' : 'Copy to clipboard'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interactive Demo</CardTitle>
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
