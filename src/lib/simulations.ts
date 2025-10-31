export type SimulationHelpers = {
  wait: (ms: number) => Promise<void>;
  typeText: (row: number, col: number, text: string) => Promise<void>;
  setCell: (row: number, col: number, value: string) => void;
  setHighlightedCells: (cells: string[]) => void;
  setActiveCell: (cellId: string | null) => void;
};

export type SimulationFunction = (helpers: SimulationHelpers) => Promise<void>;

const todayDate = new Date().toLocaleDateString();

// Default placeholder for new simulations
const sim_placeholder: SimulationFunction = async ({ setCell }) => {
  setCell(1, 1, 'Coming');
  setCell(1, 2, 'Soon!');
};

const sim_sum: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, '10');
  setCell(2, 1, '20');
  setCell(3, 1, '30');
  setCell(4, 1, '40');
  await wait(500);
  await typeText(5, 1, '=SUM(A1:A4)');
  await wait(500);
  setHighlightedCells(['R1C1', 'R2C1', 'R3C1', 'R4C1']);
  await wait(1000);
  setCell(5, 1, '100');
  setHighlightedCells([]);
};

const sim_average: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, '10');
  setCell(2, 1, '20');
  setCell(3, 1, '30');
  setCell(4, 1, '60');
  await wait(500);
  await typeText(5, 1, '=AVERAGE(A1:A4)');
  await wait(500);
  setHighlightedCells(['R1C1', 'R2C1', 'R3C1', 'R4C1']);
  await wait(1000);
  setCell(5, 1, '30'); // (10+20+30+60)/4
  setHighlightedCells([]);
};

const sim_vlookup: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells, setActiveCell }) => {
  setCell(1, 2, 'P001'); setCell(1, 3, 'Pen');
  setCell(2, 2, 'P002'); setCell(2, 3, 'Pencil');
  setCell(3, 2, 'P003'); setCell(3, 3, 'Notebook');
  await wait(500);
  setCell(1, 1, 'P002');
  await wait(500);
  await typeText(2, 1, '=VLOOKUP(A1,B1:C3,2,FALSE)');
  await wait(500);
  setHighlightedCells(['R1C1']);
  await wait(1000);
  setHighlightedCells(['R1C2', 'R1C3', 'R2C2', 'R2C3', 'R3C2', 'R3C3']);
  await wait(1000);
  setActiveCell('R2C2');
  await wait(500);
  setActiveCell('R2C3');
  await wait(500);
  setHighlightedCells([]);
  setCell(2, 1, 'Pencil');
};

const sim_concatenate: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, 'John');
  setCell(1, 2, 'Smith');
  await wait(500);
  await typeText(1, 3, '=CONCATENATE(A1," ",B1)');
  await wait(500);
  setHighlightedCells(['R1C1', 'R1C2']);
  await wait(1000);
  setCell(1, 3, 'John Smith');
  setHighlightedCells([]);
};

const sim_trim: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, '  Extra   Spaces  ');
  await wait(500);
  await typeText(1, 2, '=TRIM(A1)');
  await wait(500);
  setCell(1, 2, 'Extra Spaces');
};

const sim_if: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, '75');
  setCell(2, 1, '40');
  await wait(500);
  await typeText(1, 3, '=IF(A1>50, "Pass", "Fail")');
  await wait(1000);
  setCell(1, 3, 'Pass');
  await wait(500);
  await typeText(2, 3, '=IF(A2>50, "Pass", "Fail")');
  await wait(1000);
  setCell(2, 3, 'Fail');
};

const sim_today: SimulationFunction = async ({ wait, typeText, setCell }) => {
  await typeText(1, 1, '=TODAY()');
  await wait(500);
  setCell(1, 1, todayDate);
};

export const simulations = {
  sum: sim_sum,
  average: sim_average,
  vlookup: sim_vlookup,
  trim: sim_trim,
  if: sim_if,
  today: sim_today,

  // New Stubs
  max: sim_placeholder,
  min: sim_placeholder,
  count: sim_placeholder,
  counta: sim_placeholder,
  round: sim_placeholder,
  roundup: sim_placeholder,
  rounddown: sim_placeholder,
  concat: sim_concatenate, // Re-using because it's similar
  textjoin: sim_placeholder,
  upper: sim_placeholder,
  lower: sim_placeholder,
  proper: sim_placeholder,
  left: sim_placeholder,
  right: sim_placeholder,
  hlookup: sim_placeholder,
  index_match: sim_placeholder,
  xlookup: sim_placeholder,
  indirect: sim_placeholder,
  now: sim_placeholder,
  datedif: sim_placeholder,
  year: sim_placeholder,
  month: sim_placeholder,
  text_weekday: sim_placeholder,
  'nested_if': sim_placeholder,
  and: sim_placeholder,
  or: sim_placeholder,
  rank: sim_placeholder,
  subtotal: sim_placeholder,
  unique: sim_placeholder,
  filter: sim_placeholder,
  pmt: sim_placeholder,
  sln: sim_placeholder,
  npv: sim_placeholder,
  irr: sim_placeholder,
};

export type SimulationKey = keyof typeof simulations;
