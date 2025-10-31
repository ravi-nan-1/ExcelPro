"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestFormulas, SuggestFormulasOutput } from '@/ai/flows/intelligent-formula-suggestion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { getFormulaBySlug } from '@/lib/formulas';
import { Badge } from '../ui/badge';

const formSchema = z.object({
  description: z.string().min(10, {
    message: 'Please describe your problem in at least 10 characters.',
  }),
});

export default function FormulaSuggester() {
  const [result, setResult] = useState<SuggestFormulasOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const suggestion = await suggestFormulas(values);
      setResult(suggestion);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Describe Your Excel Problem</CardTitle>
        <CardDescription>
          For example: "I have a list of full names and I want to get only the first name from each."
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Problem Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your problem here..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Get Suggestions
            </Button>
          </form>
        </Form>
      </CardContent>
      {result && (
        <CardFooter className="flex-col items-start gap-6 pt-6 border-t">
          <div className="w-full space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2"><Lightbulb className="text-primary"/>AI Suggestions</h3>
            
            <div className="space-y-2">
                <h4 className="font-medium">Suggested Formulas:</h4>
                <div className="flex flex-wrap gap-2">
                {result.formulas.map((formulaName, index) => {
                    const formulaSlug = formulaName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                    const matchedFormula = getFormulaBySlug(formulaSlug);
                    if (matchedFormula) {
                        return (
                            <Button asChild variant="secondary" size="sm" key={index}>
                                <Link href={`/formulas/${matchedFormula.slug}`}>
                                    <code>{formulaName}</code>
                                </Link>
                            </Button>
                        )
                    }
                    return (
                        <Badge variant="secondary" key={index} className="text-sm">
                            <code>{formulaName}</code>
                        </Badge>
                    )
                })}
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="font-medium">Reasoning:</h4>
                <p className="text-sm text-muted-foreground bg-muted p-4 rounded-md">{result.reasoning}</p>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
