import * as React from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BackToTopFab() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        variant="gold"
        size="icon"
        className="rounded-full"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp />
      </Button>
    </div>
  );
}
