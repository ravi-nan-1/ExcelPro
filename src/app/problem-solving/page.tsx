import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AlertCircle } from "lucide-react";

const commonProblems = [
  {
    error: "#VALUE!",
    cause: "This error occurs when the formula has the wrong type of argument. For example, trying to add a number to a text string.",
    solution: "Check the data types of the cells your formula refers to. Make sure numbers are formatted as numbers, not text."
  },
  {
    error: "#NAME?",
    cause: "Excel doesn't recognize a formula or function name. This is often due to a typo.",
    solution: "Double-check the spelling of your function name (e.g., `VLOOKUP` not `VLLOOKUP`). Ensure you've enabled any necessary Add-ins."
  },
  {
    error: "#DIV/0!",
    cause: "This happens when a formula attempts to divide a number by zero or an empty cell.",
    solution: "Use an `IF` statement to check if the divisor is zero. For example, `IF(B2=0, \"\", A2/B2)` will return an empty string instead of an error."
  },
  {
    error: "#REF!",
    cause: "The error appears when a formula refers to a cell that is not valid. This happens if you delete a cell, row, or column that a formula was using.",
    solution: "Undo the deletion if possible. Otherwise, you'll need to correct the formula to refer to valid cells."
  },
  {
    error: "####",
    cause: "This isn't an error, but an indication that the column is not wide enough to display the entire cell content.",
    solution: "Simply double-click the right border of the column header to automatically resize it to fit the content."
  }
];

export default function ProblemSolvingPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block bg-primary/10 p-4 rounded-full">
            <AlertCircle className="w-10 h-10 text-primary"/>
          </div>
          <h1 className="text-4xl font-bold tracking-tight font-headline">
            Troubleshooting Guide
          </h1>
          <p className="text-lg text-muted-foreground">
            Common Excel formula errors and how to fix them.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {commonProblems.map((problem, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg">
                <code className="bg-destructive/10 text-destructive font-mono p-1 rounded-sm">{problem.error}</code> Error
              </AccordionTrigger>
              <AccordionContent className="space-y-4 text-base">
                <div>
                  <h3 className="font-semibold">Cause:</h3>
                  <p className="text-muted-foreground">{problem.cause}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Solution:</h3>
                  <p className="text-muted-foreground">{problem.solution}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
