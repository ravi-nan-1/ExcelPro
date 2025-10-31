export type SimulationHelpers = {
  wait: (ms: number) => Promise<void>;
  typeText: (row: number, col: number, text: string) => Promise<void>;
  setCell: (row: number, col: number, value: string) => void;
  setHighlightedCells: (cells: string[]) => void;
  setActiveCell: (cellId: string | null) => void;
};

export type SimulationFunction = (helpers: SimulationHelpers) => Promise<void>;

const todayDate = new Date().toLocaleDateString();
const nowDateTime = new Date().toLocaleString();

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

const sim_concat: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, 'John');
  setCell(1, 2, 'Smith');
  await wait(500);
  await typeText(1, 3, '=CONCAT(A1," ",B1)');
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

const sim_max: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, '10');
  setCell(2, 1, '50');
  setCell(3, 1, '25');
  setCell(4, 1, '90');
  await wait(500);
  await typeText(5, 1, '=MAX(A1:A4)');
  await wait(500);
  setHighlightedCells(['R1C1', 'R2C1', 'R3C1', 'R4C1']);
  await wait(1000);
  setCell(5, 1, '90');
  setHighlightedCells([]);
};

const sim_min: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, '10');
  setCell(2, 1, '50');
  setCell(3, 1, '25');
  setCell(4, 1, '90');
  await wait(500);
  await typeText(5, 1, '=MIN(A1:A4)');
  await wait(500);
  setHighlightedCells(['R1C1', 'R2C1', 'R3C1', 'R4C1']);
  await wait(1000);
  setCell(5, 1, '10');
  setHighlightedCells([]);
};

const sim_count: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, '10');
  setCell(2, 1, 'Text');
  setCell(3, 1, '30');
  setCell(4, 1, '');
  await wait(500);
  await typeText(5, 1, '=COUNT(A1:A4)');
  await wait(500);
  setHighlightedCells(['R1C1', 'R2C1', 'R3C1', 'R4C1']);
  await wait(1000);
  setCell(5, 1, '2');
  setHighlightedCells([]);
};

const sim_counta: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, '10');
  setCell(2, 1, 'Text');
  setCell(3, 1, '30');
  setCell(4, 1, '');
  await wait(500);
  await typeText(5, 1, '=COUNTA(A1:A4)');
  await wait(500);
  setHighlightedCells(['R1C1', 'R2C1', 'R3C1', 'R4C1']);
  await wait(1000);
  setCell(5, 1, '3');
  setHighlightedCells([]);
};

const sim_round: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, '123.456');
  await wait(500);
  await typeText(1, 2, '=ROUND(A1, 2)');
  await wait(500);
  setCell(1, 2, '123.46');
};

const sim_roundup: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, '123.451');
  await wait(500);
  await typeText(1, 2, '=ROUNDUP(A1, 2)');
  await wait(500);
  setCell(1, 2, '123.46');
};

const sim_rounddown: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, '123.459');
  await wait(500);
  await typeText(1, 2, '=ROUNDDOWN(A1, 2)');
  await wait(500);
  setCell(1, 2, '123.45');
};

const sim_textjoin: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, 'Red');
  setCell(2, 1, 'Green');
  setCell(3, 1, 'Blue');
  await wait(500);
  await typeText(1, 2, '=TEXTJOIN(", ", TRUE, A1:A3)');
  await wait(500);
  setHighlightedCells(['R1C1', 'R2C1', 'R3C1']);
  await wait(1000);
  setCell(1, 2, 'Red, Green, Blue');
  setHighlightedCells([]);
};

const sim_upper: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, 'text');
  await wait(500);
  await typeText(1, 2, '=UPPER(A1)');
  await wait(500);
  setCell(1, 2, 'TEXT');
};

const sim_lower: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, 'TEXT');
  await wait(500);
  await typeText(1, 2, '=LOWER(A1)');
  await wait(500);
  setCell(1, 2, 'text');
};

const sim_proper: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, 'john doe');
  await wait(500);
  await typeText(1, 2, '=PROPER(A1)');
  await wait(500);
  setCell(1, 2, 'John Doe');
};

const sim_left: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, 'ExcelPro');
  await wait(500);
  await typeText(1, 2, '=LEFT(A1, 5)');
  await wait(500);
  setCell(1, 2, 'Excel');
};

const sim_right: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, 'ExcelPro');
  await wait(500);
  await typeText(1, 2, '=RIGHT(A1, 3)');
  await wait(500);
  setCell(1, 2, 'Pro');
};

const sim_hlookup: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells, setActiveCell }) => {
  setCell(1, 2, 'Q1'); setCell(2, 2, '1000');
  setCell(1, 3, 'Q2'); setCell(2, 3, '1200');
  setCell(1, 4, 'Q3'); setCell(2, 4, '1500');
  await wait(500);
  setCell(1, 1, 'Q2');
  await wait(500);
  await typeText(2, 1, '=HLOOKUP(A1,B1:D2,2,FALSE)');
  await wait(500);
  setHighlightedCells(['R1C1']);
  await wait(1000);
  setHighlightedCells(['R1C2', 'R2C2', 'R1C3', 'R2C3', 'R1C4', 'R2C4']);
  await wait(1000);
  setActiveCell('R1C3');
  await wait(500);
  setActiveCell('R2C3');
  await wait(500);
  setHighlightedCells([]);
  setCell(2, 1, '1200');
};

const sim_index_match: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells, setActiveCell }) => {
  setCell(1, 2, 'P001'); setCell(1, 3, 'Pen');
  setCell(2, 2, 'P002'); setCell(2, 3, 'Pencil');
  setCell(3, 2, 'P003'); setCell(3, 3, 'Notebook');
  await wait(500);
  setCell(1, 1, 'P002');
  await wait(500);
  await typeText(2, 1, '=INDEX(C1:C3,MATCH(A1,B1:B3,0))');
  await wait(500);
  setHighlightedCells(['R1C1']); // lookup value
  await wait(1000);
  setHighlightedCells(['R1C2', 'R2C2', 'R3C2']); // match lookup array
  setActiveCell('R2C2');
  await wait(1000);
  setHighlightedCells(['R1C3', 'R2C3', 'R3C3']); // index array
  setActiveCell('R2C3');
  await wait(1000);
  setHighlightedCells([]);
  setCell(2, 1, 'Pencil');
};

const sim_xlookup: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells, setActiveCell }) => {
  setCell(1, 2, 'P001'); setCell(1, 3, 'Pen');
  setCell(2, 2, 'P002'); setCell(2, 3, 'Pencil');
  setCell(3, 2, 'P003'); setCell(3, 3, 'Notebook');
  await wait(500);
  setCell(1, 1, 'P002');
  await wait(500);
  await typeText(2, 1, '=XLOOKUP(A1,B1:B3,C1:C3)');
  await wait(500);
  setHighlightedCells(['R1C1']);
  await wait(1000);
  setHighlightedCells(['R1C2', 'R2C2', 'R3C2']);
  await wait(1000);
  setHighlightedCells(['R1C3', 'R2C3', 'R3C3']);
  await wait(1000);
  setActiveCell('R2C2');
  await wait(200);
  setActiveCell('R2C3');
  await wait(500);
  setHighlightedCells([]);
  setCell(2, 1, 'Pencil');
};

const sim_indirect: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, 'B1');
  setCell(1, 2, 'Hello!');
  await wait(500);
  await typeText(1, 3, '=INDIRECT(A1)');
  await wait(500);
  setHighlightedCells(['R1C1']);
  await wait(1000);
  setHighlightedCells(['R1C2']);
  await wait(1000);
  setCell(1, 3, 'Hello!');
  setHighlightedCells([]);
};

const sim_now: SimulationFunction = async ({ wait, typeText, setCell }) => {
  await typeText(1, 1, '=NOW()');
  await wait(500);
  setCell(1, 1, nowDateTime);
};

const sim_datedif: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, '1/1/2024');
  setCell(1, 2, '1/31/2024');
  await wait(500);
  await typeText(1, 3, '=DATEDIF(A1, B1, "d")');
  await wait(500);
  setHighlightedCells(['R1C1', 'R1C2']);
  await wait(1000);
  setCell(1, 3, '30');
  setHighlightedCells([]);
};

const sim_year: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, '12/25/2024');
  await wait(500);
  await typeText(1, 2, '=YEAR(A1)');
  await wait(500);
  setCell(1, 2, '2024');
};

const sim_month: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, '12/25/2024');
  await wait(500);
  await typeText(1, 2, '=MONTH(A1)');
  await wait(500);
  setCell(1, 2, '12');
};

const sim_text_weekday: SimulationFunction = async ({ wait, typeText, setCell }) => {
  setCell(1, 1, '12/25/2024'); // A Wednesday
  await wait(500);
  await typeText(1, 2, '=TEXT(A1, "dddd")');
  await wait(500);
  setCell(1, 2, 'Wednesday');
};

const sim_nested_if: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, '85');
  setCell(2, 1, '70');
  setCell(3, 1, '50');
  await wait(500);
  await typeText(1, 2, '=IF(A1>80,"A",IF(A1>60,"B","C"))');
  await wait(1000);
  setCell(1, 2, 'A');
  setHighlightedCells(['R1C1']);
  await wait(500);
  setHighlightedCells([]);

  await typeText(2, 2, '=IF(A2>80,"A",IF(A2>60,"B","C"))');
  await wait(1000);
  setCell(2, 2, 'B');
  setHighlightedCells(['R2C1']);
  await wait(500);
  setHighlightedCells([]);

  await typeText(3, 2, '=IF(A3>80,"A",IF(A3>60,"B","C"))');
  await wait(1000);
  setCell(3, 2, 'C');
  setHighlightedCells(['R3C1']);
  await wait(500);
  setHighlightedCells([]);
};

const sim_and: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, '60'); setCell(1, 2, '70');
  setCell(2, 1, '40'); setCell(2, 2, '80');
  await wait(500);
  await typeText(1, 3, '=IF(AND(A1>50,B1>50),"Pass","Fail")');
  await wait(1000);
  setHighlightedCells(['R1C1', 'R1C2']);
  await wait(500);
  setCell(1, 3, 'Pass');
  setHighlightedCells([]);
  await wait(500);

  await typeText(2, 3, '=IF(AND(A2>50,B2>50),"Pass","Fail")');
  await wait(1000);
  setHighlightedCells(['R2C1', 'R2C2']);
  await wait(500);
  setCell(2, 3, 'Fail');
  setHighlightedCells([]);
};

const sim_or: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, '60'); setCell(1, 2, '30');
  setCell(2, 1, '40'); setCell(2, 2, '20');
  await wait(500);
  await typeText(1, 3, '=IF(OR(A1>50,B1>50),"Pass","Fail")');
  await wait(1000);
  setHighlightedCells(['R1C1', 'R1C2']);
  await wait(500);
  setCell(1, 3, 'Pass');
  setHighlightedCells([]);
  await wait(500);

  await typeText(2, 3, '=IF(OR(A2>50,B2>50),"Pass","Fail")');
  await wait(1000);
  setHighlightedCells(['R2C1', 'R2C2']);
  await wait(500);
  setCell(2, 3, 'Fail');
  setHighlightedCells([]);
};

const sim_rank: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, '88');
  setCell(2, 1, '95');
  setCell(3, 1, '72');
  await wait(500);
  await typeText(1, 2, '=RANK(A1,A$1:A$3)');
  await wait(1000);
  setHighlightedCells(['R1C1', 'R2C1', 'R3C1']);
  await wait(500);
  setCell(1, 2, '2');
  setHighlightedCells([]);
};

const sim_subtotal: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, '10');
  setCell(2, 1, '20');
  setCell(3, 1, '30 (Hidden)');
  setCell(4, 1, '40');
  await wait(500);
  await typeText(5, 1, '=SUBTOTAL(9, A1:A4)');
  await wait(500);
  // In a real scenario, row 3 would be hidden. We simulate by just showing the result.
  setHighlightedCells(['R1C1', 'R2C1', 'R4C1']);
  await wait(1000);
  setCell(5, 1, '70');
  setHighlightedCells([]);
};

const sim_unique: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, 'Apple');
  setCell(2, 1, 'Banana');
  setCell(3, 1, 'Apple');
  setCell(4, 1, 'Orange');
  await wait(500);
  await typeText(1, 2, '=UNIQUE(A1:A4)');
  await wait(500);
  setHighlightedCells(['R1C1', 'R2C1', 'R3C1', 'R4C1']);
  await wait(1000);
  setCell(1, 2, 'Apple');
  setCell(2, 2, 'Banana');
  setCell(3, 2, 'Orange');
  setHighlightedCells([]);
};

const sim_filter: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, 'Apple'); setCell(1, 2, '10');
  setCell(2, 1, 'Banana'); setCell(2, 2, '60');
  setCell(3, 1, 'Orange'); setCell(3, 2, '30');
  setCell(4, 1, 'Grape'); setCell(4, 2, '80');
  await wait(500);
  await typeText(1, 3, '=FILTER(A1:A4, B1:B4>50)');
  await wait(500);
  setHighlightedCells(['R1C1', 'R1C2', 'R2C1', 'R2C2', 'R3C1', 'R3C2', 'R4C1', 'R4C2']);
  await wait(1000);
  setCell(1, 3, 'Banana');
  setCell(2, 3, 'Grape');
  setHighlightedCells([]);
};

const sim_pmt: SimulationFunction = async ({ wait, typeText, setCell }) => {
  await typeText(1, 1, '=PMT(5%/12, 36, 20000)');
  await wait(1000);
  setCell(1, 1, '-599.42');
};

const sim_sln: SimulationFunction = async ({ wait, typeText, setCell }) => {
  await typeText(1, 1, '=SLN(30000, 7500, 10)');
  await wait(1000);
  setCell(1, 1, '2250');
};

const sim_npv: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, 'Rate: 10%');
  setCell(2, 1, 'CF1: -1000');
  setCell(3, 1, 'CF2: 300');
  setCell(4, 1, 'CF3: 400');
  setCell(5, 1, 'CF4: 500');
  await wait(500);
  await typeText(1, 2, '=NPV(10%, B2:B5)');
  await wait(500);
  setHighlightedCells(['R2C1','R3C1','R4C1','R5C1']);
  await wait(1000);
  setCell(1, 2, '86.40');
  setHighlightedCells([]);
};

const sim_irr: SimulationFunction = async ({ wait, typeText, setCell, setHighlightedCells }) => {
  setCell(1, 1, 'CF0: -100');
  setCell(2, 1, 'CF1: 20');
  setCell(3, 1, 'CF2: 30');
  setCell(4, 1, 'CF3: 40');
  setCell(5, 1, 'CF4: 50');
  await wait(500);
  await typeText(1, 2, '=IRR(A1:A5)');
  await wait(500);
  setHighlightedCells(['R1C1', 'R2C1', 'R3C1', 'R4C1', 'R5C1']);
  await wait(1000);
  setCell(1, 2, '14%');
  setHighlightedCells([]);
};

export const simulations = {
  sum: sim_sum,
  average: sim_average,
  vlookup: sim_vlookup,
  trim: sim_trim,
  if: sim_if,
  today: sim_today,
  max: sim_max,
  min: sim_min,
  count: sim_count,
  counta: sim_counta,
  round: sim_round,
  roundup: sim_roundup,
  rounddown: sim_rounddown,
  concat: sim_concat, 
  textjoin: sim_textjoin,
  upper: sim_upper,
  lower: sim_lower,
  proper: sim_proper,
  left: sim_left,
  right: sim_right,
  hlookup: sim_hlookup,
  index_match: sim_index_match,
  xlookup: sim_xlookup,
  indirect: sim_indirect,
  now: sim_now,
  datedif: sim_datedif,
  year: sim_year,
  month: sim_month,
  text_weekday: sim_text_weekday,
  'nested_if': sim_nested_if,
  and: sim_and,
  or: sim_or,
  rank: sim_rank,
  subtotal: sim_subtotal,
  unique: sim_unique,
  filter: sim_filter,
  pmt: sim_pmt,
  sln: sim_sln,
  npv: sim_npv,
  irr: sim_irr,
};

export type SimulationKey = keyof typeof simulations;
