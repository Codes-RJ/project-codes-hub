import { Github, Instagram, Linkedin } from "lucide-react";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function EonicsFooter({ logoSrc }: { logoSrc: string }) {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <img
                src={logoSrc}
                alt="EONICS logo"
                className="h-16 w-16 rounded-2xl border border-border/60 bg-card/30 p-2 backdrop-blur-xl"
                loading="lazy"
              />
              <div>
                <p className="text-xl font-semibold text-primary">EONICS</p>
                <p className="text-sm text-muted-foreground">The IoT and Hardware Club</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Build. Compete. Learn. A premium space for hands-on hardware and clean software integration.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:col-span-7 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-primary">Quick links</p>
              <div className="mt-3 grid gap-2">
                {["home", "events", "projects", "competitions", "training", "contact"].map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollToId(id)}
                    className="w-fit text-sm text-foreground/80 transition hover:text-primary"
                  >
                    {id === "home" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-primary">Social</p>
              <div className="mt-3 flex items-center gap-3">
                {[
                  { label: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/" },
                  { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/" },
                  { label: "GitHub", Icon: Github, href: "https://github.com/" },
                ].map(({ label, Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-lg border border-border/60 bg-card/30 text-primary transition hover:bg-card/55"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-primary">Contact</p>
              <p className="mt-3 text-sm text-muted-foreground">eonics@college.edu</p>
              <p className="mt-1 text-xs text-muted-foreground">VIPs-TC</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-6">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} EONICS. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Designed in matte black • Forged in gold.</p>
        </div>
      </div>
    </footer>
  );
}
