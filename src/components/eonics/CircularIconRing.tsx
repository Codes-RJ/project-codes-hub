import * as React from "react";
import {
  Cloud,
  Code,
  Cpu,
  Database,
  GitBranch,
  Microchip,
  Radio,
  Server,
  Shield,
  Terminal,
  Wifi,
  Zap,
} from "lucide-react";

type RingItem = {
  id: string;
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function CircularIconRing({
  items,
  iconsPerRing = 6,
  onNavigate,
  logoSrc,
  logoAlt = "EONICS club logo",
}: {
  items?: RingItem[];
  iconsPerRing?: number;
  onNavigate?: (href: string) => void;
  logoSrc: string;
  logoAlt?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = React.useState(320);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      const size = Math.min(r.width, r.height);
      if (Number.isFinite(size) && size > 0) setContainerSize(size);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const data: RingItem[] =
    items ??
    [
      { id: "iot", label: "IoT", href: "https://en.wikipedia.org/wiki/Internet_of_things", Icon: Wifi },
      { id: "embedded", label: "Embedded", href: "https://en.wikipedia.org/wiki/Embedded_system", Icon: Microchip },
      { id: "firmware", label: "Firmware", href: "https://en.wikipedia.org/wiki/Firmware", Icon: Cpu },
      { id: "radio", label: "RF & Wireless", href: "https://en.wikipedia.org/wiki/Radio-frequency_identification", Icon: Radio },
      { id: "cloud", label: "Cloud", href: "https://en.wikipedia.org/wiki/Cloud_computing", Icon: Cloud },
      { id: "data", label: "Data", href: "https://en.wikipedia.org/wiki/Data", Icon: Database },

      { id: "backend", label: "Backend", href: "https://en.wikipedia.org/wiki/Backend_(computing)", Icon: Server },
      { id: "security", label: "Security", href: "https://en.wikipedia.org/wiki/Computer_security", Icon: Shield },
      { id: "devtools", label: "Dev Tools", href: "https://en.wikipedia.org/wiki/Software_development", Icon: Terminal },
      { id: "code", label: "Code", href: "https://en.wikipedia.org/wiki/Computer_programming", Icon: Code },
      { id: "version", label: "Git", href: "https://en.wikipedia.org/wiki/Git", Icon: GitBranch },
      { id: "power", label: "Power", href: "https://en.wikipedia.org/wiki/Power_electronics", Icon: Zap },
    ];

  const rings = chunk(data, iconsPerRing).slice(0, 3);
  const [activeId, setActiveId] = React.useState(rings?.[0]?.[0]?.id ?? "");
  const active = data.find((x) => x.id === activeId) ?? data[0];

  const handleNavigate = React.useCallback(
    (href: string) => {
      if (onNavigate) return onNavigate(href);
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [onNavigate]
  );

  return (
    <div ref={containerRef} className="relative mx-auto aspect-square w-full max-w-sm">
      <style>
        {`
          @keyframes eonics-glow-pulse { 0% { opacity: .45 } 100% { opacity: .85 } }
          @keyframes eonics-rotate { from { transform: translate(-50%, -50%) rotate(0deg) } to { transform: translate(-50%, -50%) rotate(360deg) } }
          @keyframes eonics-center-pulse { 0% { transform: translate(-50%, -50%) scale(1); opacity: .86 } 50% { transform: translate(-50%, -50%) scale(1.10); opacity: 1 } 100% { transform: translate(-50%, -50%) scale(1); opacity: .86 } }
        `}
      </style>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          animation: "eonics-glow-pulse 4s ease-in-out infinite alternate",
          boxShadow:
            "0 0 60px 30px hsl(var(--primary) / 0.12), 0 0 140px 80px hsl(var(--primary) / 0.08)",
          filter: "blur(1px)",
        }}
      />

      {/* Rings */}
      {[0, 1, 2].map((ringIdx) => {
        const ring = rings[ringIdx] ?? [];
        const sizePct = ringIdx === 0 ? 100 : ringIdx === 1 ? 68 : 38;
        const duration = ringIdx === 0 ? 36 : ringIdx === 1 ? 60 : 75;
        const reverse = ringIdx === 1;
        const iconRadiusPct = ringIdx === 0 ? 48 : ringIdx === 1 ? 33 : 18;
        const radiusPx = Math.round((containerSize * iconRadiusPct) / 100);

        return (
          <div
            key={ringIdx}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: `${sizePct}%`,
              height: `${sizePct}%`,
              border: `2px solid hsl(var(--border) / ${ringIdx === 0 ? 0.55 : ringIdx === 1 ? 0.5 : 0.45})`,
              boxShadow:
                ringIdx === 0
                  ? "0 0 16px 1px hsl(var(--primary) / 0.16)"
                  : ringIdx === 1
                    ? "0 0 8px 1px hsl(var(--primary) / 0.14)"
                    : "0 0 5px 0px hsl(var(--primary) / 0.12)",
              transform: "translate(-50%, -50%)",
              animation: `eonics-rotate ${duration}s linear infinite${reverse ? " reverse" : ""}`,
            }}
            aria-hidden="true"
          >
            {/* Clickable icons */}
            {ring.map((it, i) => {
              const angle = (360 / ring.length) * i;
              const radius = `${-radiusPx}px`;

              const isActive = it.id === activeId;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveId(it.id);
                    handleNavigate(it.href);
                  }}
                  className={
                    "absolute left-1/2 top-1/2 grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-card/40 text-foreground/90 backdrop-blur-xl transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  }
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${radius}) rotate(${-angle}deg)`,
                    boxShadow: isActive
                      ? "0 0 0 1px hsl(var(--primary) / 0.25), 0 14px 40px -18px hsl(var(--primary) / 0.65)"
                      : "0 0 7px hsl(var(--primary) / 0.18)",
                  }}
                  aria-label={it.label}
                  title={it.label}
                >
                  <it.Icon className={isActive ? "h-4 w-4 text-primary" : "h-4 w-4 text-muted-foreground"} />
                </button>
              );
            })}
          </div>
        );
      })}

      {/* Center content */}
      <div
        className="absolute inset-[25%] z-10 flex items-center justify-center rounded-3xl border border-border/60 bg-card/35 backdrop-blur-xl"
        style={{ animation: "eonics-center-pulse 3s cubic-bezier(.5, 0, .5, 1.2) infinite" }}
      >
        <img
          src={logoSrc}
          alt={logoAlt}
          className="h-[80%] w-[80%] max-h-[80%] max-w-[80%] rounded-2xl object-contain"
          loading="eager"
        />
      </div>
    </div>
  );
}
