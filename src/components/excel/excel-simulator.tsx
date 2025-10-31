"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { simulations, SimulationKey, SimulationFunction } from '@/lib/simulations';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const COLS = 8;
const ROWS = 10;

type GridData = { [key: string]: string };
type AnimationState = 'idle' | 'playing' | 'paused';

interface CellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  isActive?: boolean;
  isHighlighted?: boolean;
}

const Cell: React.FC<CellProps> = ({ isActive, isHighlighted, className, ...props }) => (
  <td
    className={cn(
      'border border-gray-200 p-1.5 h-8 min-w-[70px] text-sm transition-colors duration-300',
      {
        'outline-2 outline-primary outline -outline-offset-1 bg-primary/10': isActive,
        'bg-accent': isHighlighted,
      },
      className
    )}
    {...props}
  />
);

export default function ExcelSimulator({ simulationKey }: { simulationKey: SimulationKey }) {
  const [gridData, setGridData] = useState<GridData>({});
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<string[]>([]);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const animationStateRef = useRef<AnimationState>(animationState);
  animationStateRef.current = animationState;

  const simulationFunction = simulations[simulationKey];

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const resetState = useCallback(() => {
    clearTimers();
    setGridData({});
    setActiveCell(null);
    setHighlightedCells([]);
    setAnimationState('idle');
  }, [clearTimers]);

  useEffect(() => {
    resetState();
  }, [simulationKey, resetState]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const wait = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      const id = setTimeout(() => {
        if (animationStateRef.current === 'playing') {
          resolve();
        }
      }, ms);
      timersRef.current.push(id);
    });
  }, []);

  const typeText = useCallback(
    async (row: number, col: number, text: string) => {
      const cellId = `R${row}C${col}`;
      setActiveCell(cellId);
      for (let i = 0; i < text.length; i++) {
        if (animationStateRef.current !== 'playing') return;
        setGridData((prev) => ({ ...prev, [cellId]: text.slice(0, i + 1) }));
        await wait(70);
      }
      await wait(140);
    },
    [wait]
  );
  
  const setCell = useCallback((row: number, col: number, value: string) => {
    const cellId = `R${row}C${col}`;
    setGridData((prev) => ({...prev, [cellId]: value}));
  }, []);

  const runAnimation = useCallback(async (isReplay = false) => {
    if (!simulationFunction || (animationState === 'playing' && !isReplay)) return;

    if (animationState === 'paused' && !isReplay) {
        setAnimationState('playing');
        return;
    }

    resetState();
    setAnimationState('playing');

    const helpers = { wait, typeText, setCell, setHighlightedCells, setActiveCell };
    await wait(200);
    try {
        await (simulationFunction as SimulationFunction)(helpers);
    } catch(e) {
        console.error("Animation failed", e);
    } finally {
        if(animationStateRef.current === 'playing') {
             setAnimationState('idle');
        }
    }
  }, [simulationFunction, animationState, resetState, wait, typeText, setCell]);

  const handlePlay = () => runAnimation(false);
  const handlePause = () => setAnimationState('paused');
  const handleReplay = () => runAnimation(true);

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="bg-white p-2 rounded-lg border overflow-x-auto">
          <table className="border-collapse table-fixed">
            <thead>
              <tr>
                <th className="w-10 border border-gray-200 bg-gray-50"></th>
                {[...Array(COLS)].map((_, i) => (
                  <th key={i} className="border border-gray-200 bg-gray-50 font-semibold text-sm text-gray-600">
                    {String.fromCharCode(65 + i)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(ROWS)].map((_, r) => (
                <tr key={r}>
                  <th className="border border-gray-200 bg-gray-50 font-semibold text-sm text-gray-600">{r + 1}</th>
                  {[...Array(COLS)].map((_, c) => {
                    const cellId = `R${r + 1}C${c + 1}`;
                    return (
                      <Cell
                        key={c}
                        isActive={activeCell === cellId}
                        isHighlighted={highlightedCells.includes(cellId)}
                      >
                        {gridData[cellId] || ''}
                      </Cell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2">
            <Tooltip>
                <TooltipTrigger asChild><Button size="icon" variant="secondary" onClick={handlePlay} disabled={animationState === 'playing'}><Play className="w-4 h-4" /></Button></TooltipTrigger>
                <TooltipContent><p>Play</p></TooltipContent>
            </Tooltip>
             <Tooltip>
                <TooltipTrigger asChild><Button size="icon" variant="secondary" onClick={handlePause} disabled={animationState !== 'playing'}><Pause className="w-4 h-4" /></Button></TooltipTrigger>
                <TooltipContent><p>Pause</p></TooltipContent>
            </Tooltip>
             <Tooltip>
                <TooltipTrigger asChild><Button size="icon" variant="secondary" onClick={handleReplay}><RefreshCw className="w-4 h-4" /></Button></TooltipTrigger>
                <TooltipContent><p>Replay</p></TooltipContent>
            </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
