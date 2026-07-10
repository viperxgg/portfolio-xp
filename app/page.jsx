"use client";

import { useState } from "react";
import Desktop from "../components/Desktop";
import { playStartup } from "../lib/sounds";

function LoginScreen({ onLogin }) {
  return (
    <div className="xp-login">
      <div className="xp-login-topband" />
      <div className="xp-login-main">
        <div className="xp-login-left">
          <div className="xp-login-brand">
            <span className="xp-login-name">Azzam Khalaf</span>
            <div className="xp-login-logo">
              <span className="xp-flag">
                <i className="f r" />
                <i className="f g" />
                <i className="f b" />
                <i className="f y" />
              </span>
              <span className="xp-login-title">
                Portfolio<sup>xp</sup>
              </span>
            </div>
            <p className="xp-login-hint">To begin the journey, click on my username.</p>
          </div>
        </div>
        <div className="xp-login-divider" />
        <div className="xp-login-right">
          <button className="xp-user" onClick={onLogin}>
            <img src="/avatar.png" alt="Azzam Khalaf" />
            <span>Azzam Khalaf</span>
          </button>
        </div>
      </div>
      <div className="xp-login-bottomband">
        <button className="xp-off-btn" onClick={() => alert("Nice try 🙂 Click my username instead.")}>
          <span className="xp-off-icon">⏻</span> Turn off computer
        </button>
        <p className="xp-login-note">
          After logging in, you can explore my projects, CV and even chat with my AI assistant.
          <br />
          Every icon opens a window about me.
        </p>
      </div>
    </div>
  );
}

function ShutdownScreen({ onRestart }) {
  return (
    <div className="xp-shutdown">
      <p>It is now safe to close this tab.</p>
      <p className="xp-shutdown-sub">Thanks for visiting!</p>
      <button className="xp-user xp-restart" onClick={onRestart}>
        ⏻ Turn the computer back on
      </button>
    </div>
  );
}

export default function Home() {
  const [phase, setPhase] = useState("login");

  if (phase === "login")
    return (
      <LoginScreen
        onLogin={() => {
          playStartup();
          setPhase("desktop");
        }}
      />
    );
  if (phase === "off") return <ShutdownScreen onRestart={() => setPhase("login")} />;
  return <Desktop onLogOff={() => setPhase("login")} onShutDown={() => setPhase("off")} />;
}
