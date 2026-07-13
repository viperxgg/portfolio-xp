"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { playBoom, playClick, playWin } from "../lib/sounds";

const ROWS = 9;
const COLS = 9;
const MINES = 10;
const NUM_COLORS = ["", "#1d3fbf", "#2e7d32", "#c62828", "#1a237e", "#6d2c26", "#00838f", "#212121", "#757575"];

function buildBoard(safeIndex = -1) {
  const cells = Array.from({ length: ROWS * COLS }, () => ({ mine: false, open: false, flag: false, n: 0 }));
  let placed = 0;
  while (placed < MINES) {
    const i = Math.floor(Math.random() * cells.length);
    if (i !== safeIndex && !cells[i].mine) {
      cells[i].mine = true;
      placed++;
    }
  }
  const idx = (r, c) => r * COLS + c;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (cells[idx(r, c)].mine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const rr = r + dr, cc = c + dc;
          if (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLS && cells[idx(rr, cc)].mine) n++;
        }
      cells[idx(r, c)].n = n;
    }
  }
  return cells;
}

export default function Minesweeper() {
  const [board, setBoard] = useState(buildBoard);
  const [state, setState] = useState("play"); // play | dead | won
  const [mode, setMode] = useState("reveal"); // reveal | flag
  const [ticks, setTicks] = useState(0);
  const timer = useRef(null);
  const started = useRef(false);
  const hasRevealed = useRef(false);

  useEffect(() => {
    if (state !== "play" && timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    return () => timer.current && clearInterval(timer.current);
  }, [state]);

  const startTimer = () => {
    if (!started.current) {
      started.current = true;
      timer.current = setInterval(() => setTicks((t) => Math.min(t + 1, 999)), 1000);
    }
  };

  const flags = useMemo(() => board.filter((c) => c.flag).length, [board]);

  const reset = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    started.current = false;
    hasRevealed.current = false;
    setTicks(0);
    setBoard(buildBoard());
    setState("play");
    setMode("reveal");
    playClick();
  };

  const reveal = (i) => {
    if (state !== "play") return;
    const firstReveal = !hasRevealed.current;
    hasRevealed.current = true;
    startTimer();
    setBoard((prev) => {
      const source = firstReveal ? buildBoard(i) : prev;
      const b = source.map((c, index) => ({
        ...c,
        flag: firstReveal ? prev[index].flag && index !== i : c.flag,
      }));
      if (b[i].flag || b[i].open) return b;
      if (b[i].mine) {
        b.forEach((c) => c.mine && (c.open = true));
        b[i].boom = true;
        setState("dead");
        playBoom();
        return b;
      }
      // flood fill
      const stack = [i];
      while (stack.length) {
        const j = stack.pop();
        const cell = b[j];
        if (cell.open || cell.flag || cell.mine) continue;
        cell.open = true;
        if (cell.n === 0) {
          const r = Math.floor(j / COLS), c = j % COLS;
          for (let dr = -1; dr <= 1; dr++)
            for (let dc = -1; dc <= 1; dc++) {
              const rr = r + dr, cc = c + dc;
              if (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLS) stack.push(rr * COLS + cc);
            }
        }
      }
      if (b.filter((c) => !c.mine).every((c) => c.open)) {
        setState("won");
        playWin();
      } else {
        playClick();
      }
      return b;
    });
  };

  const toggleFlag = (i) => {
    if (state !== "play") return;
    startTimer();
    setBoard((prev) => {
      const b = prev.map((c) => ({ ...c }));
      if (!b[i].open) {
        const canAddFlag = b.filter((cell) => cell.flag).length < MINES;
        b[i].flag = b[i].flag ? false : canAddFlag;
      }
      return b;
    });
  };

  const face = state === "dead" ? "😵" : state === "won" ? "😎" : "🙂";

  return (
    <div className="ms">
      <div className="ms-top">
        <span className="ms-lcd">{String(MINES - flags).padStart(3, "0")}</span>
        <button type="button" className="ms-face" onClick={reset} aria-label="Nytt spel">{face}</button>
        <span className="ms-lcd">{String(ticks).padStart(3, "0")}</span>
      </div>
      <div className="ms-modes" aria-label="Spelläge">
        <button type="button" aria-pressed={mode === "reveal"} onClick={() => setMode("reveal")}>Öppna</button>
        <button type="button" aria-pressed={mode === "flag"} onClick={() => setMode("flag")}>Flagga</button>
      </div>
      <div className="ms-grid" aria-label="Minfält med 81 rutor" onContextMenu={(e) => e.preventDefault()}>
        {board.map((cell, i) => (
          <button
            key={i}
            type="button"
            className={`ms-cell ${cell.open ? "ms-open" : ""} ${cell.boom ? "ms-boom" : ""}`}
            onClick={() => mode === "flag" ? toggleFlag(i) : reveal(i)}
            onContextMenu={(event) => {
              event.preventDefault();
              toggleFlag(i);
            }}
            onKeyDown={(event) => {
              if (event.key.toLowerCase() !== "f") return;
              event.preventDefault();
              toggleFlag(i);
            }}
            aria-label={
              cell.open
                ? cell.mine
                  ? "Mina"
                  : cell.n > 0
                    ? `${cell.n} minor i närheten`
                    : "Tom ruta"
                : cell.flag
                  ? "Flaggad ruta"
                  : `Täckt ruta ${i + 1}`
            }
            aria-pressed={cell.open ? undefined : cell.flag}
            disabled={state !== "play" && !cell.open}
          >
            {cell.open
              ? cell.mine
                ? "💣"
                : cell.n > 0
                  ? <b style={{ color: NUM_COLORS[cell.n] }}>{cell.n}</b>
                  : ""
              : cell.flag
                ? "🚩"
                : ""}
          </button>
        ))}
      </div>
      <p className="ms-hint">
        {state === "won"
          ? "Du vann! 🎉"
          : state === "dead"
            ? "Pang! Klicka på ansiktet för att försöka igen."
            : "Välj Öppna eller Flagga · Tangentbord: F sätter en flagga"}
      </p>
    </div>
  );
}
