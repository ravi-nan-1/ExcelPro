'use server';

/**
 * @fileOverview A flow that suggests relevant Excel formulas based on user input.
 *
 * - suggestFormulas - A function that suggests Excel formulas based on a description of a problem.
 * - SuggestFormulasInput - The input type for the suggestFormulas function.
 * - SuggestFormulasOutput - The return type for the suggestFormulas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFormulasInputSchema = z.object({
  description: z.string().describe('A description of the problem the user is trying to solve in Excel.'),
});
export type SuggestFormulasInput = z.infer<typeof SuggestFormulasInputSchema>;

const SuggestFormulasOutputSchema = z.object({
  formulas: z.array(z.string()).describe('An array of relevant Excel formulas.'),
  reasoning: z.string().describe('The reasoning behind suggesting these formulas.'),
});
export type SuggestFormulasOutput = z.infer<typeof SuggestFormulasOutputSchema>;

export async function suggestFormulas(input: SuggestFormulasInput): Promise<SuggestFormulasOutput> {
  return suggestFormulasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFormulasPrompt',
  input: {schema: SuggestFormulasInputSchema},
  output: {schema: SuggestFormulasOutputSchema},
  prompt: `You are an expert in Excel formulas. A user will describe a problem they are trying to solve in Excel, and you will suggest the most relevant formulas to use.

Problem description: {{{description}}}

Suggest the most relevant Excel formulas and explain your reasoning. Enclose the formulas in backticks.
`,
});

const suggestFormulasFlow = ai.defineFlow(
  {
    name: 'suggestFormulasFlow',
    inputSchema: SuggestFormulasInputSchema,
    outputSchema: SuggestFormulasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
