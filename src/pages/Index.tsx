import * as React from "react";
import { ArrowUpRight, Calendar, ExternalLink, Github, Instagram, Linkedin, Play, Trophy, Wrench } from "lucide-react";

import logo from "@/assets/eonics-logo.png";
import p1 from "@/assets/project-thumb-1.jpg";
import p2 from "@/assets/project-thumb-2.jpg";
import p3 from "@/assets/project-thumb-3.jpg";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

import { EonicsNavbar } from "@/components/eonics/EonicsNavbar";
import { EonicsSection } from "@/components/eonics/EonicsSection";
import { EonicsProjectCarousel } from "@/components/eonics/EonicsProjectCarousel";
import { EonicsCompetitionGrid } from "@/components/eonics/EonicsCompetitionGrid";
import { EonicsTrainingGrid } from "@/components/eonics/EonicsTrainingGrid";
import { EonicsFooter } from "@/components/eonics/EonicsFooter";
import { BackToTopFab } from "@/components/eonics/BackToTopFab";
import { CircularIconRing } from "@/components/eonics/CircularIconRing";

const Index = () => {
  const heroRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--mx", `${mx.toFixed(2)}%`);
      el.style.setProperty("--my", `${my.toFixed(2)}%`);
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <EonicsNavbar logoSrc={logo} />

      <main>
        {/* HERO */}
        <section id="home" ref={heroRef} className="relative overflow-hidden pt-24 md:pt-28" aria-label="EONICS hero">
          <div className="pointer-events-none absolute inset-0 bg-hero" />
          <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_20%_30%,hsl(var(--primary)/0.16),transparent_45%),radial-gradient(circle_at_80%_10%,hsl(var(--primary)/0.10),transparent_55%)]" />
          <div className="container relative">
            <div className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className="min-w-0 md:col-span-7">
                <p className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  College Technical Club • IoT • Hardware • Integration
                </p>

                <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight text-primary md:text-6xl">
                  EONICS
                </h1>
                <p className="mt-3 text-lg text-muted-foreground md:text-xl">The IoT and Hardware Club</p>

                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/90">
                  EONICS is a student-driven technical club focused on IoT, hardware innovation, and software
                  integration. We build, compete, learn, and innovate together.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    variant="gold"
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Explore Projects <ArrowUpRight />
                  </Button>
                  <Button
                    variant="goldOutline"
                    onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Latest Events <Calendar />
                  </Button>
                </div>

                <div className="mt-10 grid min-w-0 max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { label: "Hands-on builds", icon: Wrench },
                    { label: "Competitions", icon: Trophy },
                    { label: "Workshops", icon: Play },
                  ].map((x) => (
                    <Card key={x.label} className="glass-panel min-w-0 overflow-hidden p-3 sm:p-4 text-left">
                      <div className="flex min-w-0 items-center gap-2 text-sm sm:text-base">
                        <x.icon className="h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="min-w-0 whitespace-nowrap text-foreground/90">{x.label}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Signature Orb (Circular Icon Ring) */}
              <div className="min-w-0 md:col-span-5">
                <CircularIconRing logoSrc={logo} logoAlt="EONICS club logo" />
              </div>
            </div>
          </div>
        </section>

        {/* EVENTS */}
        <EonicsSection
          id="events"
          title="Events & News"
          subtitle="Announcements, meetups, workshops, and club updates."
        >
          <div className="grid gap-4">
            {[
              {
                title: "IoT Bootcamp Week 1",
                date: "Feb 2026",
                desc: "Foundations of sensors, microcontrollers, and rapid prototyping. Bring your laptop and curiosity.",
              },
              {
                title: "Hardware Hacknight",
                date: "Mar 2026",
                desc: "Build fast: PCB basics, soldering, and debugging sprints. Teams ship mini-demos by midnight.",
              },
              {
                title: "Team Formation: Competition Season",
                date: "Apr 2026",
                desc: "Join focused squads for national competitions. Roles include embedded, CAD, cloud, and analytics.",
              },
            ].map((e) => (
              <Card key={e.title} className="glass-panel p-5 text-left">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{e.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{e.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </EonicsSection>

        {/* PROJECTS */}
        <EonicsSection id="projects" title="Projects" subtitle="">
          <EonicsProjectCarousel
            items={[
              {
                id: "p1",
                title: "GoldenTrace Sensor Grid",
                description: "Distributed sensor nodes with a sleek dashboard and alerting.",
                cover: p1,
                gallery: [p1, p2, p3],
                details:
                  "A modular IoT sensor grid built for rapid deployment. Features edge filtering, resilient messaging, and a minimal analytics panel.",
                videoUrl: "https://www.youtube.com/watch?v=K0espL8dKa4",
                pdfUrl: "https://en.wikipedia.org/wiki/Industrial_internet_of_things",
              },
              {
                id: "p2",
                title: "AuricLab Hardware Rig",
                description: "A compact testing bench for repeatable electronics experiments.",
                cover: p2,
                gallery: [p2, p1, p3],
                details:
                  "A premium lab-in-a-box: regulated power, modular buses, and quick-swap fixtures. Designed for workshop sessions and competitions.",
                videoUrl: "https://www.youtube.com/watch?v=K0espL8dKa4",
                pdfUrl: "https://en.wikipedia.org/wiki/Industrial_internet_of_things",
              },
              {
                id: "p3",
                title: "NeonNode City Network",
                description: "Simulated city-scale telemetry with golden network routing visuals.",
                cover: p3,
                gallery: [p3, p1, p2],
                details:
                  "A learning project that models real-world telemetry pipelines: device provisioning, event routing, storage, and visual diagnostics.",
                videoUrl: "https://www.youtube.com/watch?v=K0espL8dKa4",
                pdfUrl: "https://en.wikipedia.org/wiki/Industrial_internet_of_things",
              },
              {
                id: "p4",
                title: "Smart Energy Monitor",
                description: "Clamp-sensor energy tracking with anomaly detection.",
                cover: p1,
                gallery: [p1, p2, p3],
                details:
                  "Track consumption patterns and spot anomalies. Focused on safe measurement design and clean firmware architecture.",
                videoUrl: "https://www.youtube.com/watch?v=K0espL8dKa4",
                pdfUrl: "https://en.wikipedia.org/wiki/Industrial_internet_of_things",
              },
              {
                id: "p5",
                title: "RFID Access Prototype",
                description: "Fast badge-based access control for labs & events.",
                cover: p2,
                gallery: [p2, p3, p1],
                details:
                  "A prototype for event check-ins and lab entry. Includes logging, admin override, and expandable auth methods.",
                videoUrl: "https://www.youtube.com/watch?v=K0espL8dKa4",
                pdfUrl: "https://en.wikipedia.org/wiki/Industrial_internet_of_things",
              },
              {
                id: "p6",
                title: "PCB Design Sprint",
                description: "A set of micro PCBs designed for quick builds.",
                cover: p3,
                gallery: [p3, p2, p1],
                details:
                  "A curated library of tiny PCBs: power, sensor breakouts, and connectors, built to accelerate club prototyping.",
                videoUrl: "https://www.youtube.com/watch?v=K0espL8dKa4",
                pdfUrl: "https://en.wikipedia.org/wiki/Industrial_internet_of_things",
              },
            ]}
          />
        </EonicsSection>

        {/* COMPETITIONS */}
        <EonicsSection
          id="competitions"
          title="Competitions"
          subtitle="Join the next challenge. Register externally, or view details."
        >
          <EonicsCompetitionGrid
            items={[
              {
                id: "c1",
                name: "IoT Innovators Challenge",
                description: "Build a connected prototype with a measurable impact.",
                linkLabel: "Visit Unstop",
                linkUrl: "https://unstop.com/",
                details: {
                  registrationStart: "01 Feb 2026",
                  registrationEnd: "20 Feb 2026",
                  competitionDate: "01 Mar 2026",
                  theme: "Connected Campus",
                  rules:
                    "Teams of 2–5. Demo + brief pitch deck. Must include at least one hardware sensor and a clear data flow.",
                  platform: "Unstop",
                },
              },
              {
                id: "c2",
                name: "Hardware Design Sprint",
                description: "Rapid PCB/embedded design under time constraints.",
                linkLabel: "Register",
                linkUrl: "https://forms.gle/",
                details: {
                  registrationStart: "10 Mar 2026",
                  registrationEnd: "25 Mar 2026",
                  competitionDate: "05 Apr 2026",
                  theme: "Minimal Footprint",
                  rules: "Bring your tools. Evaluation on robustness, documentation, and testability.",
                  platform: "Google Forms",
                },
              },
              {
                id: "c3",
                name: "Analytics for IoT",
                description: "Turn raw telemetry into insights and alerts.",
                linkLabel: "Visit Link",
                linkUrl: "https://unstop.com/",
                details: {
                  registrationStart: "15 Apr 2026",
                  registrationEnd: "30 Apr 2026",
                  competitionDate: "10 May 2026",
                  theme: "Signal to Insight",
                  rules: "Submit a notebook + short video. Clarity and reproducibility matter.",
                  platform: "Unstop",
                },
              },
            ]}
          />
        </EonicsSection>

        {/* TRAINING */}
        <EonicsSection
          id="training"
          title="Training & Resources"
          subtitle="Clean, minimal cards—curated learning paths (placeholders you can replace anytime)."
        >
          <EonicsTrainingGrid
            items={[
              { title: "IoT Fundamentals", category: "IoT", href: "https://en.wikipedia.org/wiki/Internet_of_things" },
              { title: "Embedded C Crash Course", category: "Hardware", href: "https://en.wikipedia.org/wiki/C_(programming_language)" },
              { title: "PCB Design Basics", category: "Hardware", href: "https://en.wikipedia.org/wiki/Printed_circuit_board" },
              { title: "Cloud Telemetry Pipeline", category: "Cloud", href: "https://en.wikipedia.org/wiki/Cloud_computing" },
              { title: "Data Analytics Starter", category: "Data Analytics", href: "https://en.wikipedia.org/wiki/Data_analysis" },
              { title: "Full-Stack Dashboard", category: "Software", href: "https://en.wikipedia.org/wiki/Web_application" },
              { title: "Sensors & Calibration", category: "IoT", href: "https://en.wikipedia.org/wiki/Sensor" },
              { title: "Version Control for Teams", category: "Software", href: "https://en.wikipedia.org/wiki/Version_control" },
            ]}
          />
        </EonicsSection>

        {/* CONTACT */}
        <EonicsSection id="contact" title="Contact Us" subtitle="Send a message—fast, simple, and clean.">
          <div className="grid gap-6 md:grid-cols-12">
            <Card className="glass-panel p-6 text-left md:col-span-7">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = new FormData(e.currentTarget);
                  const message = String(form.get("message") || "").trim();
                  if (message.length < 10) {
                    toast({
                      title: "Message too short",
                      description: "Please write at least 10 characters so we understand your request.",
                    });
                    return;
                  }
                  toast({
                    title: "Message queued",
                    description:
                      "Backend isn’t connected yet—this is a UI demo. We can wire it to email/DB when you’re ready.",
                  });
                  (e.currentTarget as HTMLFormElement).reset();
                }}
                className="grid gap-4"
              >
                <div className="grid gap-2">
                  <label className="text-sm text-muted-foreground" htmlFor="message">
                    Your message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Write your query..."
                    className="bg-background/40 min-h-[112px] max-h-56 overflow-y-auto resize-none scroll-smooth [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/35 hover:[&::-webkit-scrollbar-thumb]:bg-primary/55"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground">
                    Email: <span className="text-foreground/90">eonics@college.edu</span>
                  </p>
                  <Button type="submit" variant="gold">
                    Send
                  </Button>
                </div>
              </form>
            </Card>

            <Card className="glass-panel p-6 text-left md:col-span-5">
              <h3 className="text-lg font-semibold text-primary">Socials</h3>
              <p className="mt-1 text-sm text-muted-foreground">Follow us for builds, wins, and workshop drops.</p>
              <div className="mt-5 grid gap-3">
                {[
                  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/" },
                  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/" },
                  { label: "GitHub", icon: Github, href: "https://github.com/" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-lg border border-border/60 bg-card/35 px-4 py-3 backdrop-blur-xl transition hover:bg-card/55"
                  >
                    <div className="flex items-center gap-3">
                      <s.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground/90">{s.label}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </EonicsSection>

        <EonicsFooter logoSrc={logo} />
      </main>

      <BackToTopFab />
    </div>
  );
};

export default Index;
