import * as React from "react";
import { FileText, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type ProjectItem = {
  id: string;
  title: string;
  description: string;
  cover: string;
  gallery: string[];
  details: string;
  videoUrl?: string; // Optional YouTube or video URL
  pdfUrl?: string; // Optional PDF download URL
};

export function EonicsProjectCarousel({ items }: { items: ProjectItem[] }) {
  return (
    <div className="relative">
      <div className="projects-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]">
        {items.map((p) => (
          <Dialog key={p.id}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="group relative w-[280px] flex-none snap-start text-left sm:w-[320px]"
                aria-label={`Open project ${p.title}`}
              >
                <Card className="glass-panel overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <img
                      src={p.cover}
                      alt={`${p.title} cover image`}
                      className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:scale-[1.03] group-hover:grayscale-0 group-focus:grayscale-0 group-active:grayscale-0"
                      loading="eager"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-primary">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  </div>
                </Card>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-primary">{p.title}</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4">
                <p className="text-sm text-muted-foreground">{p.details}</p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {p.gallery.slice(0, 3).map((src, idx) => (
                    <div key={idx} className="overflow-hidden rounded-lg border border-border/60">
                      <img
                        src={src}
                        alt={`${p.title} image ${idx + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {p.videoUrl && (
                    <Card className="glass-panel p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-foreground/90">Watch Video</p>
                          <p className="text-xs text-muted-foreground">View project demo.</p>
                        </div>
                        <Button
                          variant="goldOutline"
                          size="sm"
                          type="button"
                          onClick={() => window.open(p.videoUrl, "_blank", "noopener,noreferrer")}
                        >
                          <Play />
                          Watch
                        </Button>
                      </div>
                    </Card>
                  )}

                  {p.pdfUrl && (
                    <Card className="glass-panel p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-foreground/90">Download PDF</p>
                          <p className="text-xs text-muted-foreground">Opens in a new tab.</p>
                        </div>
                        <Button
                          variant="gold"
                          size="sm"
                          type="button"
                          onClick={() => window.open(p.pdfUrl, "_blank", "noopener,noreferrer")}
                        >
                          <FileText />
                          PDF
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
