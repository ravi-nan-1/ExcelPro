'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ExcelSimulator from '@/components/excel/excel-simulator';
import { CheckCircle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Formula } from '@/lib/formulas';

export default function FormulaPageClient({ formula }: { formula: Formula }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formula.syntax);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
      <div className="space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
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
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle className="text-xl">Syntax</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
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
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <code className="bg-muted text-muted-foreground p-4 rounded-md block font-mono text-sm w-full">
              {formula.syntax}
            </code>
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
  );
}
