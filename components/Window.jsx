"use client";

import { useCallback, useRef } from "react";

export default function Window({ win, focused, onFocus, onClose, onMinimize, onMaximize, onMove, isMobile }) {
  const dragState = useRef(null);

  const onTitlePointerDown = useCallback(
    (e) => {
      if (isMobile || win.maximized) return;
      if (e.target.closest("button")) return;
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: win.pos.x,
        origY: win.pos.y,
      };
      const onMovePointer = (ev) => {
        const s = dragState.current;
        if (!s) return;
        const x = Math.max(-win.size.w + 120, s.origX + (ev.clientX - s.startX));
        const y = Math.max(0, Math.min(window.innerHeight - 80, s.origY + (ev.clientY - s.startY)));
        onMove(win.id, { x, y });
      };
      const onUp = () => {
        dragState.current = null;
        window.removeEventListener("pointermove", onMovePointer);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMovePointer);
      window.addEventListener("pointerup", onUp);
    },
    [win, onMove, isMobile]
  );

  const style = isMobile
    ? { left: 4, right: 4, top: 8, bottom: 44, position: "fixed", zIndex: win.z }
    : win.maximized
      ? { left: 0, top: 0, width: "100vw", height: "calc(100vh - 34px)", position: "fixed", zIndex: win.z }
      : {
          left: win.pos.x,
          top: win.pos.y,
          width: win.size.w,
          height: win.size.h,
          position: "fixed",
          zIndex: win.z,
        };

  return (
    <div
      className={`window xp-window ${focused ? "" : "xp-window-blurred"}`}
      style={{ ...style, display: win.minimized ? "none" : "flex" }}
      onPointerDown={() => onFocus(win.id)}
    >
      <div className="title-bar" onPointerDown={onTitlePointerDown} onDoubleClick={() => !isMobile && onMaximize(win.id)}>
        <div className="title-bar-text">
          <span className="xp-title-icon">{win.icon}</span> {win.title}
        </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={() => onMinimize(win.id)} />
          <button aria-label="Maximize" onClick={() => onMaximize(win.id)} />
          <button aria-label="Close" onClick={() => onClose(win.id)} />
        </div>
      </div>
      <div className="window-body xp-window-body">{win.content}</div>
    </div>
  );
}
