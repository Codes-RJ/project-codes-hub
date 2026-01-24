import * as React from "react";

export function EonicsSection({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 py-14 md:py-20" aria-label={title}>
      <div className="container">
        <header className="mb-8 md:mb-10">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-primary md:text-4xl">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">{subtitle}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
