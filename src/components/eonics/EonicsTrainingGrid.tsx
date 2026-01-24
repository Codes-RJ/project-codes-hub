import { CircuitBoard, Cloud, Cpu, Database, Code2 } from "lucide-react";

import { Card } from "@/components/ui/card";

type TrainingItem = {
  title: string;
  category: "IoT" | "Hardware" | "Cloud" | "Data Analytics" | "Software";
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
          <Card key={`${item.category}-${item.title}`} className="glass-panel p-5 text-left">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground/95">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
              </div>
              <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
