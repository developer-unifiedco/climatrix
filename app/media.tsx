"use client";

import { useRef, useState } from "react";

const movie = "/climatrix/climate-systems.webm";

export function Film() {
  const modal = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  return (
    <>
      <button
        className="film"
        onClick={() => {
          modal.current?.showModal();
          void video.current?.play().catch(() => {});
        }}
      >
        <span>▷ &nbsp; PLAY FILM</span>
      </button>
      <dialog
        className="movie-dialog"
        ref={modal}
        aria-label="Climatrix HVAC film"
        onClose={() => video.current?.pause()}
        onClick={(e) => {
          if (e.target === modal.current) modal.current.close();
        }}
      >
        <button className="close" onClick={() => modal.current?.close()}>
          CLOSE ×
        </button>
        <video
          ref={video}
          src={movie}
          controls
          playsInline
          preload="none"
          poster="/climatrix/engineer.webp"
          aria-label="A silent film showing Climatrix HVAC applications"
        />
      </dialog>
    </>
  );
}

export function Consultation({ email }: { email?: string }) {
  const modal = useRef<HTMLDialogElement>(null);
  const [saved, setSaved] = useState(false);
  return (
    <>
      <button
        className="grid-button"
        onClick={() => {
          setSaved(false);
          modal.current?.showModal();
        }}
      >
        Request a consultation <span>›</span>
      </button>
      <dialog ref={modal} className="enquiry" aria-labelledby="enquiry-title">
        <button
          className="close"
          aria-label="Close consultation"
          onClick={() => modal.current?.close()}
        >
          CLOSE ×
        </button>
        <h2 id="enquiry-title">Your project</h2>
        <p>
          {email
            ? "Prepare your consultation request and open it in your email app."
            : "Prepare a project brief to share with the Climatrix team."}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const brief =
              "Climatrix consultation request\n\nName: " +
              data.get("name") +
              "\nEmail: " +
              data.get("email") +
              "\n\nProject details\n" +
              data.get("details");
            if (email) {
              window.location.href =
                "mailto:" +
                encodeURIComponent(email) +
                "?subject=Climatrix%20consultation&body=" +
                encodeURIComponent(brief);
              return;
            }
            const url = URL.createObjectURL(
              new Blob([brief], { type: "text/plain;charset=utf-8" }),
            );
            const a = document.createElement("a");
            a.href = url;
            a.download = "climatrix-project-brief.txt";
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            setSaved(true);
          }}
        >
          <label>
            Name
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Project details
            <textarea name="details" required rows={4} />
          </label>
          <button className="grid-button">
            {email ? "Open email draft" : "Download project brief"}{" "}
            <span>›</span>
          </button>
          <p role="status">
            {saved ? "Your project brief is ready to share." : ""}
          </p>
        </form>
      </dialog>
    </>
  );
}
