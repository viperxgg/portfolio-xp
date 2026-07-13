"use client";

import { useEffect, useRef, useState } from "react";

const SOLVED = [...Array.from({ length: 15 }, (_, index) => index + 1), null];

function neighbours(index) {
  const row = Math.floor(index / 4);
  const column = index % 4;
  const result = [];
  if (row > 0) result.push(index - 4);
  if (row < 3) result.push(index + 4);
  if (column > 0) result.push(index - 1);
  if (column < 3) result.push(index + 1);
  return result;
}

function shuffledBoard() {
  const tiles = [...SOLVED];
  let emptyIndex = 15;
  let previousEmpty = -1;

  for (let move = 0; move < 180; move += 1) {
    const options = neighbours(emptyIndex).filter((index) => index !== previousEmpty);
    const tileIndex = options[Math.floor(Math.random() * options.length)];
    tiles[emptyIndex] = tiles[tileIndex];
    tiles[tileIndex] = null;
    previousEmpty = emptyIndex;
    emptyIndex = tileIndex;
  }

  return tiles.every((tile, index) => tile === SOLVED[index]) ? shuffledBoard() : tiles;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export default function RetroPuzzle() {
  const [tiles, setTiles] = useState(shuffledBoard);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef({});
  const successTimerRef = useRef(null);

  useEffect(() => {
    audioRef.current = {
      move: new Audio("/audio/kenney-ui/puzzle-move.mp3"),
      blocked: new Audio("/audio/kenney-ui/puzzle-blocked.mp3"),
      success1: new Audio("/audio/kenney-ui/puzzle-success-1.mp3"),
      success2: new Audio("/audio/kenney-ui/puzzle-success-2.mp3"),
    };
    Object.values(audioRef.current).forEach((audio) => {
      audio.preload = "auto";
      audio.volume = 0.58;
    });
    return () => {
      window.clearTimeout(successTimerRef.current);
      Object.values(audioRef.current).forEach((audio) => audio.pause());
    };
  }, []);

  useEffect(() => {
    if (!started || won) return undefined;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [started, won]);

  const play = (name) => {
    if (muted) return;
    const audio = audioRef.current[name];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const celebrate = () => {
    play("success1");
    successTimerRef.current = window.setTimeout(() => play("success2"), 130);
  };

  const moveTile = (tileIndex) => {
    if (won) return;
    const emptyIndex = tiles.indexOf(null);
    if (!neighbours(emptyIndex).includes(tileIndex)) {
      play("blocked");
      return;
    }

    const next = [...tiles];
    next[emptyIndex] = next[tileIndex];
    next[tileIndex] = null;
    const completed = next.every((tile, index) => tile === SOLVED[index]);
    setTiles(next);
    setMoves((value) => value + 1);
    setStarted(true);
    setWon(completed);
    play("move");
    if (completed) celebrate();
  };

  const reset = () => {
    setTiles(shuffledBoard());
    setMoves(0);
    setSeconds(0);
    setStarted(false);
    setWon(false);
    play("move");
  };

  const emptyIndex = tiles.indexOf(null);

  return (
    <section className="retro-puzzle" aria-labelledby="retro-puzzle-title">
      <header className="retro-puzzle__header">
        <div>
          <p>FORMPUZZEL 15 · RETRO / FUTURE</p>
          <h2 id="retro-puzzle-title">Ordna formen. Hitta rytmen.</h2>
          <span>Flytta brickorna tills siffrorna ligger 1–15. Tryck eller använd Tab + Enter.</span>
        </div>
        <div className="retro-puzzle__score" aria-label="Spelstatus">
          <span><small>DRAG</small><strong>{String(moves).padStart(3, "0")}</strong></span>
          <span><small>TID</small><strong>{formatTime(seconds)}</strong></span>
        </div>
      </header>

      <div className="retro-puzzle__layout">
        <div className={`retro-puzzle__board${won ? " is-complete" : ""}`} aria-label="Femtonspussel med femton brickor">
          {tiles.map((tile, index) => {
            if (tile === null) return <span className="retro-puzzle__empty" aria-hidden="true" key="empty" />;
            const movable = neighbours(emptyIndex).includes(index);
            return (
              <button
                aria-label={movable ? `Flytta bricka ${tile}` : `Bricka ${tile}, kan inte flyttas`}
                className={movable ? "is-movable" : ""}
                key={tile}
                onClick={() => moveTile(index)}
                type="button"
              >
                <span>{tile}</span>
              </button>
            );
          })}
        </div>

        <aside className="retro-puzzle__controls">
          <div className="retro-puzzle__signal" role="status" aria-live="polite">
            <span aria-hidden="true" />
            <strong>{won ? "Pusslet är klart!" : started ? "Spelet pågår" : "Redo när du är"}</strong>
            <p>{won ? `${moves} drag på ${formatTime(seconds)}.` : "Den tomma rutan visar vart en bricka kan flyttas."}</p>
          </div>
          <button type="button" onClick={reset}>Ny omgång</button>
          <button type="button" className="is-secondary" aria-pressed={!muted} onClick={() => setMuted((value) => !value)}>
            {muted ? "Slå på ljud" : "Ljud på"}
          </button>
          <small>Ljud: Kenney UI Audio · CC0</small>
        </aside>
      </div>
    </section>
  );
}
