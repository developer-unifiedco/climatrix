import Image from "next/image";
import type { ReactNode } from "react";
import { ClimateHero, PageMotion } from "./climate-hero";
import "./climate-motion.css";
import SiteFrame from "./site-frame";
import { Consultation, Film } from "./media";

function Photo({ name, alt }: { name: string; alt: string }) {
  return (
    <div className="photo">
      <Image
        src={`/climatrix/${name}.webp`}
        alt={alt}
        fill
        sizes="(max-width: 768px) 92vw, 960px"
      />
    </div>
  );
}

function Section({
  id,
  label,
  tone = "",
  children,
}: {
  id: string;
  label: string;
  tone?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section ${tone}`}>
      <span className="index left-index" aria-hidden="true">
        {label}
      </span>
      <span className="index right-index" aria-hidden="true">
        {label}
      </span>
      <div className="inner">{children}</div>
    </section>
  );
}

function Title({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="section-title">
      <p>{label}</p>
      <h2>
        <span>{children}</span>
      </h2>
    </div>
  );
}

function Jump({ to, children }: { to: string; children: ReactNode }) {
  return (
    <a className="grid-button" href={to}>
      {children}
      <span aria-hidden="true">›</span>
    </a>
  );
}

const services = [
  {
    tag: "CLIMATE CONTROL",
    image: "cooling",
    alt: "Copper tubing and heat-exchanger fins",
    name: "Air conditioning",
    text: "Cooling and climate control systems selected for the size, use and demands of your space.",
  },
  {
    tag: "AIR QUALITY",
    image: "filter",
    alt: "Pleated filter within an air handler",
    name: "Ventilation & indoor air quality",
    text: "Fresh air supply, extraction and filtration to support comfortable indoor environments.",
  },
  {
    tag: "SYSTEM CARE",
    image: "service",
    alt: "A technician connects service gauges",
    name: "Installation & maintenance",
    text: "Climate management, professional installation and ongoing technical support for your system.",
  },
];

export default function Home() {
  return (
    <>
      <SiteFrame />
      <main id="main">
        <ClimateHero />
        <PageMotion />

        <Section id="vision" label="OUR VISION">
          <Title label="OUR VISION">
            Comfortable indoor
            <br />
            environments.
          </Title>
          <Photo
            name="interior"
            alt="A daylight-filled Saudi interior with integrated ceiling ventilation"
          />
          <div className="vision-copy">
            <h3>
              Climate control for
              <br />
              modern spaces.
            </h3>
            <div>
              <p>
                Climatrix brings air conditioning, ventilation and indoor air
                quality together. We assess how a space is used, recommend a
                suitable system and support it through installation and
                maintenance.
              </p>
              <Jump to="#solutions">Our solutions</Jump>
            </div>
          </div>
        </Section>

        <Film />
        <Section id="principles" label="WHY CLIMATRIX" tone="principles">
          <Title label="WHY CLIMATRIX">What guides our work.</Title>
          <ul className="pledges">
            <li>Energy efficiency in system selection.</li>
            <li>Solutions tailored to each project.</li>
            <li>Reliable support after installation.</li>
          </ul>
          <div className="principles-foot">
            <Jump to="#approach">Our approach</Jump>
            <Image
              src="/climatrix/wordmark.png"
              width={2200}
              height={294}
              alt="Climatrix"
            />
          </div>
        </Section>

        <Section id="solutions" label="SOLUTIONS">
          <div className="section-lead">
            <Title label="SOLUTIONS">What we do.</Title>
            <p>
              Climatrix helps clients manage temperature, ventilation and air
              quality across residential, commercial and industrial spaces.
            </p>
          </div>
          <div className="service-grid">
            {services.map((s) => (
              <article key={s.tag}>
                <span className="tab">{s.tag}</span>
                <Photo name={s.image} alt={s.alt} />
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
          <div className="end">
            <Jump to="#contact">Discuss a project</Jump>
          </div>
        </Section>

        <Section id="approach" label="OUR APPROACH" tone="blue-band">
          <Title label="OUR APPROACH">
            From assessment
            <br />
            to ongoing care.
          </Title>
          <div className="photo-strip">
            <Photo
              name="engineer"
              alt="Engineer inspecting an air handling unit"
            />
            <Photo
              name="plant"
              alt="Air handling units connected to ductwork"
            />
            <Photo name="service" alt="Refrigeration system servicing" />
          </div>
          <div className="band-foot">
            <p>
              We start with your requirements, assess the environment and
              recommend a suitable system. Our work continues through
              installation and ongoing technical support.
            </p>
            <Jump to="#support">System support</Jump>
          </div>
        </Section>

        <Section id="applications" label="APPLICATIONS">
          <div className="section-lead">
            <Title label="APPLICATIONS">Where we work.</Title>
            <p>
              Residential spaces, commercial buildings, offices, hotels,
              industrial facilities and retail centres each place different
              demands on their indoor environment.
            </p>
          </div>
          <Photo
            name="interior"
            alt="A commercial building with recessed ventilation"
          />
          <div className="end">
            <Jump to="#contact">Request a consultation</Jump>
          </div>
        </Section>

        <Section id="support" label="SUPPORT" tone="divided">
          <div className="section-lead">
            <Title label="SUPPORT">System care.</Title>
            <div className="support-rows">
              <div>
                <small>INSTALLATION</small>
                <p>Professional implementation of the selected system.</p>
              </div>
              <div>
                <small>MAINTENANCE</small>
                <p>Ongoing care for cooling and ventilation equipment.</p>
              </div>
              <div>
                <small>TECHNICAL SUPPORT</small>
                <p>Guidance on system operation and climate management.</p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="company" label="COMPANY" tone="divided company">
          <Title label="COMPANY">About Climatrix.</Title>
          <Photo
            name="plant"
            alt="Air handling equipment and ventilation ducts"
          />
          <div id="contact" className="contact-block">
            <Image
              src="/climatrix/logo.png"
              width={720}
              height={155}
              alt="Climatrix HVAC Solutions"
            />
            <div>
              <Title label="CONTACT">Discuss your project.</Title>
              <dl>
                <dt>Company</dt>
                <dd>Climatrix HVAC Solutions</dd>
                <dt>Region</dt>
                <dd>Saudi Arabia</dd>
              </dl>
              <Consultation email={process.env.CLIMATRIX_CONTACT_EMAIL} />
            </div>
          </div>
        </Section>
        <footer>
          © Climatrix HVAC Solutions <a href="#home">Back to top ↑</a>
        </footer>
      </main>
    </>
  );
}
