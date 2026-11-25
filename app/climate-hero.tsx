"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function ClimateHero() {
  const intro = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const curtain = intro.current;
    const image = photo.current;
    if (!curtain || !image) return;
    let active = true;
    // The CSS deadline also releases the curtain if hydration or decoding stalls.
    const ready = () => {
      if (active) curtain.classList.add("ready");
    };
    void image.decode().then(ready, ready);
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <div ref={intro} className="intro-curtain" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <div className="intro-sign">
          <span />
        </div>
      </div>
      <section id="home" className="hero-track" aria-labelledby="hero-title">
        <div className="hero-stage">
          <div className="hero-wordmark" aria-hidden="true">
            <Image
              src="/climatrix/wordmark.png"
              width={2200}
              height={294}
              sizes="100vw"
              preload
              alt=""
            />
          </div>
          <div className="hero-edition">
            <span>HVAC solutions</span>
            <span>Saudi Arabia</span>
          </div>
          <div className="hero-message">
            <h1 id="hero-title">
              <span>
                <b>Air, under</b>
              </span>{" "}
              <span>
                <b>control.</b>
              </span>
            </h1>
            <p>
              Cooling, ventilation and cleaner air for the spaces where we live
              and work.
            </p>
          </div>
          <div className="hero-image">
            <Image
              ref={photo}
              src="/climatrix/pavilion-gallery.webp"
              alt="A curved air diffuser follows the limestone ceiling of a sunlit pavilion gallery"
              fill
              sizes="100vw"
              preload
            />
          </div>
          <div className="hero-foot">
            <a href="#solutions">
              Explore solutions <span aria-hidden="true">↗</span>
            </a>
            <a href="#vision" aria-label="Scroll to our vision">
              <span aria-hidden="true">↓</span> Scroll
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function PageMotion() {
  useEffect(() => {
    // Observe each item, so a tall section on a phone unfolds as it is read.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-frame");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -4% 0px" },
    );
    const items = document.querySelectorAll(
      ".section-title, .photo, .pledges li, .support-rows > div, .principles, .blue-band, .film",
    );
    items.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
