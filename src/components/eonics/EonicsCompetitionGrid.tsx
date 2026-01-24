import { ExternalLink, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type CompetitionDetails = {
  registrationStart: string;
  registrationEnd: string;
  competitionDate: string;
  theme: string;
  rules: string;
  platform: string;
};

type CompetitionItem = {
  id: string;
  name: string;
  description: string;
  linkLabel: string;
  linkUrl: string;
  details: CompetitionDetails;
};

export function EonicsCompetitionGrid({ items }: { items: CompetitionItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((c) => (
        <Card key={c.id} className="glass-panel p-5 text-left">
          <h3 className="text-lg font-semibold text-primary">{c.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild variant="gold" size="sm" className="min-h-[36px]">
              <a href={c.linkUrl} target="_blank" rel="noreferrer">
                {c.linkLabel} <ExternalLink />
              </a>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="goldOutline" size="sm" type="button" className="min-h-[36px]">
                  Details <Info />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-primary">{c.name}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 text-sm">
                  <div className="grid gap-2 rounded-lg border border-border/60 bg-card/35 p-4 backdrop-blur-xl">
                    <div className="flex flex-wrap justify-between gap-2">
                      <p className="text-muted-foreground">Registration</p>
                      <p className="text-foreground/90">
                        {c.details.registrationStart} → {c.details.registrationEnd}
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <p className="text-muted-foreground">Competition date</p>
                      <p className="text-foreground/90">{c.details.competitionDate}</p>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <p className="text-muted-foreground">Theme</p>
                      <p className="text-foreground/90">{c.details.theme}</p>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <p className="text-muted-foreground">Platform</p>
                      <p className="text-foreground/90">{c.details.platform}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-primary">Rules / overview</p>
                    <p className="mt-1 text-sm text-muted-foreground">{c.details.rules}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      ))}
    </div>
  );
}
