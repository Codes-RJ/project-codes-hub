import { CircuitBoard, Cloud, Cpu, Database, Code2 } from "lucide-react";

import { Card } from "@/components/ui/card";

type TrainingItem = {
  title: string;
  category: "IoT" | "Hardware" | "Cloud" | "Data Analytics" | "Software";
  href: string;
};

const iconFor = (category: TrainingItem["category"]) => {
  switch (category) {
    case "IoT":
      return CircuitBoard;
    case "Hardware":
      return Cpu;
    case "Cloud":
      return Cloud;
    case "Data Analytics":
      return Database;
    case "Software":
      return Code2;
  }
};

export function EonicsTrainingGrid({ items }: { items: TrainingItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = iconFor(item.category);
        return (
          <a
            key={`${item.category}-${item.title}`}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="block w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label={`${item.title} (${item.category})`}
          >
            <Card className="glass-panel flex w-full h-[84px] sm:h-[92px] lg:h-[112px] items-start justify-between gap-3 overflow-hidden p-5 text-left transition hover:bg-card/55">
              <div className="min-w-0">
                <div>
                  <p className="text-sm font-semibold text-foreground/95 truncate">{item.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
                </div>
              </div>
              <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
            </Card>
          </a>
        );
      })}
    </div>
  );
}
