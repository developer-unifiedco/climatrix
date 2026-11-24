"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const sections = [
  "Vision",
  "Solutions",
  "Approach",
  "Applications",
  "Support",
  "Company",
  "Contact",
];

function Ruler({ side }: { side: "top" | "bottom" | "left" | "right" }) {
  const marks = side === "top" || side === "bottom" ? "12345678" : "ABCD";
  return (
    <div className={`ruler ruler-${side}`} aria-hidden="true">
      {[...marks].map((mark) => (
        <span key={mark}>{mark}</span>
      ))}
    </div>
  );
}

function Readout() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fields = bar.current!.querySelectorAll("span");
    let clicks = 0;
    let tick = 0;
    let x = 0;
    let y = 0;
    function draw() {
      tick = 0;
      fields[2].textContent = "X = " + x;
      fields[3].textContent = "Y = " + y;
      fields[4].textContent = "C = " + clicks;
      fields[5].textContent = "S = " + Math.round(window.scrollY);
    }
    function schedule() {
      if (!tick) tick = requestAnimationFrame(draw);
    }
    function move(event: PointerEvent) {
      x = event.clientX;
      y = event.clientY;
      schedule();
    }
    function click() {
      clicks += 1;
      schedule();
    }
    function clock() {
      const now = new Date();
      fields[0].textContent =
        now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
      fields[1].textContent = now.toLocaleTimeString("en-US");
    }
    clock();
    draw();
    const timer = setInterval(clock, 1000);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("click", click);
    return () => {
      clearInterval(timer);
      cancelAnimationFrame(tick);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("click", click);
    };
  }, []);
  return (
    <div className="readout" ref={bar} aria-hidden="true">
      {["Date", "Time", "X = 0", "Y = 0", "C = 0", "S = 0"].map((value) => (
        <span key={value}>{value}</span>
      ))}
      <b>CLIMATE CONTROL / SAUDI ARABIA</b>
    </div>
  );
}

export default function SiteFrame() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function close() {
      setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        close();
        toggle.current?.focus();
      }
    }
    window.addEventListener("keydown", escape);
    window.addEventListener("hashchange", close);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("keydown", escape);
      window.removeEventListener("hashchange", close);
      window.removeEventListener("resize", close);
    };
  }, [open]);
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Ruler side="top" />
      <Ruler side="bottom" />
      <Ruler side="left" />
      <Ruler side="right" />
      <header className="mast">
        <a className="brand" href="#home" onClick={() => setOpen(false)}>
          <Image
            src="/climatrix/logo.png"
            width={720}
            height={155}
            alt="Climatrix home"
            preload
          />
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          ref={toggle}
        >
          <i />
          <i />
        </button>
        <nav
          id="navigation"
          className={open ? "opened" : ""}
          aria-label="Main navigation"
        >
          {sections.map((s) => (
            <a
              href={"#" + s.toLowerCase()}
              key={s}
              onClick={() => setOpen(false)}
            >
              {s}
            </a>
          ))}
        </nav>
      </header>
      <Readout />
    </>
  );
}
