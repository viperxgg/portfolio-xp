"use client";

import { useEffect, useRef, useState } from "react";
import { playClick } from "../lib/sounds";

const COLORS = ["#000000", "#c62828", "#f4b800", "#2e7d32", "#1d3fbf", "#8e24aa", "#ff7b3d", "#ffffff"];

export default function Paint() {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const [color, setColor] = useState("#1d3fbf");
  const [size, setSize] = useState(3);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cv.width, cv.height);
  }, []);

  const pos = (e) => {
    const cv = canvasRef.current;
    const rect = cv.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * cv.width,
      y: ((e.clientY - rect.top) / rect.height) * cv.height,
    };
  };

  const down = (e) => {
    drawing.current = true;
    last.current = pos(e);
    e.target.setPointerCapture?.(e.pointerId);
  };

  const move = (e) => {
    if (!drawing.current) return;
    const p = pos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };

  const up = () => {
    drawing.current = false;
    last.current = null;
  };

  const clear = () => {
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cv.width, cv.height);
    playClick();
  };

  return (
    <div className="paint">
      <div className="paint-toolbar">
        <div className="paint-colors">
          {COLORS.map((c) => (
            <button
              key={c}
              className={`paint-swatch ${color === c ? "paint-swatch-active" : ""}`}
              style={{ background: c }}
              onClick={() => { setColor(c); playClick(); }}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
        <label className="paint-size">
          Size
          <input type="range" min="1" max="14" value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </label>
        <button onClick={clear}>Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        width={620}
        height={380}
        className="paint-canvas"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
      />
      <p className="paint-hint">Draw something! (Nothing is saved — just like the good old days.)</p>
    </div>
  );
}
