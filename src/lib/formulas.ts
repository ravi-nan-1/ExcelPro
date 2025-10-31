import type { SimulationKey } from './simulations';

export type Formula = {
  name: string;
  slug: string;
  category: 'Text' | 'Logical' | 'Lookup & Reference' | 'Math & Trig' | 'Date & Time';
  subcategory: string;
  syntax: string;
  description: string;
  steps: string[];
  simulationKey: SimulationKey;
};

export const formulas: Formula[] = [
  // Math & Trig
  {
    name: 'SUM',
    slug: 'sum',
    category: 'Math & Trig',
    subcategory: 'Aggregation',
    syntax: 'SUM(number1, [number2], ...)',
    description: 'Adds all the numbers in a range of cells.',
    steps: [
      'Select a cell where you want the result.',
      'Type =SUM(',
      'Select the range of cells you want to add.',
      'Close the parenthesis and press Enter.',
    ],
    simulationKey: 'sum',
  },
  {
    name: 'AVERAGE',
    slug: 'average',
    category: 'Math & Trig',
    subcategory: 'Aggregation',
    syntax: 'AVERAGE(number1, [number2], ...)',
    description: 'Returns the average (arithmetic mean) of its arguments.',
    steps: [
      'Select a cell for the result.',
      'Type =AVERAGE(',
      'Select the range of numbers.',
      'Close the parenthesis and press Enter.',
    ],
    simulationKey: 'average',
  },
  // Lookup & Reference
  {
    name: 'VLOOKUP',
    slug: 'vlookup',
    category: 'Lookup & Reference',
    subcategory: 'Lookup',
    syntax: 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
    description: 'Looks for a value in the leftmost column of a table, and then returns a value in the same row from a column you specify.',
    steps: [
      'Identify the value you want to look up.',
      'Select the table array where the data resides.',
      'Specify the column index number to return a value from.',
      'Choose TRUE for an approximate match or FALSE for an exact match.',
    ],
    simulationKey: 'vlookup',
  },
  // Text
  {
    name: 'CONCATENATE',
    slug: 'concatenate',
    category: 'Text',
    subcategory: 'Joining',
    syntax: 'CONCATENATE(text1, [text2], ...)',
    description: 'Joins several text strings into one string.',
    steps: [
      'Select the cell for the combined text.',
      'Type =CONCATENATE(',
      'Select the cells or type the text strings you want to join, separated by commas.',
      'Close the parenthesis and press Enter.',
    ],
    simulationKey: 'concatenate',
  },
  {
    name: 'TRIM',
    slug: 'trim',
    category: 'Text',
    subcategory: 'Cleaning',
    syntax: 'TRIM(text)',
    description: 'Removes all spaces from a text string except for single spaces between words.',
    steps: [
      'Select a cell for the cleaned text.',
      'Type =TRIM(',
      'Select the cell containing the text with extra spaces.',
      'Close the parenthesis and press Enter.',
    ],
    simulationKey: 'trim',
  },
  // Logical
  {
    name: 'IF',
    slug: 'if',
    category: 'Logical',
    subcategory: 'Conditional',
    syntax: 'IF(logical_test, [value_if_true], [value_if_false])',
    description: 'Checks whether a condition is met, and returns one value if TRUE, and another value if FALSE.',
    steps: [
      'Define the logical test (e.g., A1 > 10).',
      'Specify the value to return if the test is true.',
      'Specify the value to return if the test is false.',
      'Combine them in the formula: =IF(A1>10, "Yes", "No").',
    ],
    simulationKey: 'if',
  },
  // Date & Time
  {
    name: 'TODAY',
    slug: 'today',
    category: 'Date & Time',
    subcategory: 'Current Date',
    syntax: 'TODAY()',
    description: 'Returns the current date, which updates automatically when the worksheet is recalculated.',
    steps: [
      'Select a cell.',
      'Type =TODAY()',
      'Press Enter to see today\'s date.',
    ],
    simulationKey: 'today',
  },
];

export const categories = Array.from(new Set(formulas.map(f => f.category)));

export const getFormulasByCategory = (category: string) => {
  return formulas.filter(f => f.category === category);
};

export const getFormulaBySlug = (slug: string) => {
  return formulas.find(f => f.slug === slug);
};
