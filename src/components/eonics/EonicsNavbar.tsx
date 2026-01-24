import * as React from "react";
import { LogIn, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

type NavItem = { id: string; label: string };

const NAV: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "events", label: "Events" },
  { id: "projects", label: "Projects" },
  { id: "competitions", label: "Competitions" },
  { id: "training", label: "Training" },
  { id: "contact", label: "Contact" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getRequiredMissing(form: HTMLFormElement, fields: string[]) {
  const data = new FormData(form);
  const missing = fields.filter((name) => !String(data.get(name) ?? "").trim());
  return missing;
}

export function EonicsNavbar({ logoSrc }: { logoSrc: string }) {
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isAuthed, setIsAuthed] = React.useState(false);
  const [displayName, setDisplayName] = React.useState<string>("");

  const signOut = React.useCallback(() => {
    setIsAuthed(false);
    setDisplayName("");
    toast({ title: "Signed out", description: "Demo sign out (no backend).", duration: 2000 });
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-0 bg-background/70 backdrop-blur-xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border/70" />
      <div className="container relative flex h-16 md:h-20 items-center justify-between gap-4 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => scrollToId("home")}
          className="group flex items-center gap-3 md:gap-4 text-left flex-shrink-0"
          aria-label="Go to top"
        >
          <img
            src={logoSrc}
            alt="EONICS logo"
            className="h-10 w-10 md:h-12 md:w-12 rounded-xl border border-border/60 bg-card/30 p-1.5 md:p-2 backdrop-blur-xl transition group-hover:gold-glow"
            loading="eager"
          />
          <div>
            <p className="text-lg md:text-2xl font-bold tracking-wide text-primary">EONICS</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex ml-6" aria-label="Primary">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToId(item.id)}
              className="story-link rounded-md px-3 md:px-4 py-2 text-sm md:text-base text-foreground/80 transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden lg:flex items-center gap-2 ml-auto">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              {isAuthed ? (
                <Button
                  type="button"
                  variant="goldOutline"
                  size="default"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </Button>
              ) : (
                <Button variant="gold" size="default">
                  Login <LogIn />
                </Button>
              )}
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-primary">Account</DialogTitle>
                <DialogDescription>
                  UI-only demo (no backend). We can wire this to real auth later.
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="login" className="mt-2">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();

                      const missing = getRequiredMissing(e.currentTarget, ["email", "password"]);
                      if (missing.length) {
                        toast({
                          title: "Fill all details",
                          description: "Please enter your email/username and password.",
                          variant: "destructive",
                          duration: 2000,
                        });
                        return;
                      }

                      const form = e.currentTarget;
                      const data = new FormData(form);
                      const email = String(data.get("email") ?? "").trim();

                      setIsAuthed(true);
                      setDisplayName(email);
                      toast({ title: "Signed in", description: "Demo sign in (no backend).", duration: 2000 });
                      setOpen(false);
                    }}
                    className="grid gap-3"
                  >
                    <div className="grid gap-2">
                      <label htmlFor="login-email" className="text-sm text-muted-foreground">
                        Email / Username
                      </label>
                      <Input
                        id="login-email"
                        name="email"
                        autoComplete="username"
                        placeholder="you@college.edu"
                        className="bg-background/40"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="login-password" className="text-sm text-muted-foreground">
                        Password
                      </label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="bg-background/40"
                        required
                      />
                    </div>

                    <Button type="submit" variant="gold" className="mt-2">
                      Login
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();

                      const missing = getRequiredMissing(e.currentTarget, ["name", "email", "password"]);
                      if (missing.length) {
                        toast({
                          title: "Fill all details",
                          description: "Please enter your full name, email, and password.",
                          variant: "destructive",
                          duration: 2000,
                        });
                        return;
                      }

                      const form = e.currentTarget;
                      const data = new FormData(form);
                      const name = String(data.get("name") ?? "").trim();

                      setIsAuthed(true);
                      setDisplayName(name);
                      toast({ title: "Account created", description: "Demo sign up (no backend).", duration: 2000 });
                      setOpen(false);
                    }}
                    className="grid gap-3"
                  >
                    <div className="grid gap-2">
                      <label htmlFor="signup-name" className="text-sm text-muted-foreground">
                        Full name
                      </label>
                      <Input
                        id="signup-name"
                        name="name"
                        autoComplete="name"
                        placeholder="Your name"
                        className="bg-background/40"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="signup-email" className="text-sm text-muted-foreground">
                        Email
                      </label>
                      <Input
                        id="signup-email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@college.edu"
                        className="bg-background/40"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="signup-password" className="text-sm text-muted-foreground">
                        Password
                      </label>
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="bg-background/40"
                        required
                      />
                    </div>

                    <Button type="submit" variant="gold" className="mt-2">
                      Create account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {isAuthed && displayName ? (
                <p className="mt-4 text-xs text-muted-foreground">Signed in as {displayName}</p>
              ) : null}
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile/Tablet Hamburger Menu */}
        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6 text-primary" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-primary text-xl">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      scrollToId(item.id);
                      setMobileOpen(false);
                    }}
                    className="rounded-lg px-4 py-3 text-left text-base text-foreground/80 transition hover:bg-accent hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="mt-6 px-4">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      {isAuthed ? (
                        <Button
                          type="button"
                          variant="goldOutline"
                          className="w-full"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileOpen(false);
                            signOut();
                          }}
                        >
                          Sign out
                        </Button>
                      ) : (
                        <Button variant="gold" className="w-full" onClick={() => setMobileOpen(false)}>
                          Login <LogIn />
                        </Button>
                      )}
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-primary">Account</DialogTitle>
                        <DialogDescription>
                          UI-only demo (no backend). We can wire this to real auth later.
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="login" className="mt-2">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="login">Login</TabsTrigger>
                          <TabsTrigger value="signup">Sign up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login" className="mt-4">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();

                              const missing = getRequiredMissing(e.currentTarget, ["email", "password"]);
                              if (missing.length) {
                                toast({
                                  title: "Fill all details",
                                  description: "Please enter your email/username and password.",
                                  variant: "destructive",
                                  duration: 2000,
                                });
                                return;
                              }

                              const form = e.currentTarget;
                              const data = new FormData(form);
                              const email = String(data.get("email") ?? "").trim();

                              setIsAuthed(true);
                              setDisplayName(email);
                              toast({ title: "Signed in", description: "Demo sign in (no backend).", duration: 2000 });
                              setOpen(false);
                            }}
                            className="grid gap-3"
                          >
                            <div className="grid gap-2">
                              <label htmlFor="login-email-mobile" className="text-sm text-muted-foreground">
                                Email / Username
                              </label>
                              <Input
                                id="login-email-mobile"
                                name="email"
                                autoComplete="username"
                                placeholder="you@college.edu"
                                className="bg-background/40"
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <label htmlFor="login-password-mobile" className="text-sm text-muted-foreground">
                                Password
                              </label>
                              <Input
                                id="login-password-mobile"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="bg-background/40"
                                required
                              />
                            </div>

                            <Button type="submit" variant="gold" className="mt-2">
                              Login
                            </Button>
                          </form>
                        </TabsContent>

                        <TabsContent value="signup" className="mt-4">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();

                              const missing = getRequiredMissing(e.currentTarget, ["name", "email", "password"]);
                              if (missing.length) {
                                toast({
                                  title: "Fill all details",
                                  description: "Please enter your full name, email, and password.",
                                  variant: "destructive",
                                  duration: 2000,
                                });
                                return;
                              }

                              const form = e.currentTarget;
                              const data = new FormData(form);
                              const name = String(data.get("name") ?? "").trim();

                              setIsAuthed(true);
                              setDisplayName(name);
                              toast({ title: "Account created", description: "Demo sign up (no backend).", duration: 2000 });
                              setOpen(false);
                            }}
                            className="grid gap-3"
                          >
                            <div className="grid gap-2">
                              <label htmlFor="signup-name-mobile" className="text-sm text-muted-foreground">
                                Full name
                              </label>
                              <Input
                                id="signup-name-mobile"
                                name="name"
                                autoComplete="name"
                                placeholder="Your name"
                                className="bg-background/40"
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <label htmlFor="signup-email-mobile" className="text-sm text-muted-foreground">
                                Email
                              </label>
                              <Input
                                id="signup-email-mobile"
                                name="email"
                                autoComplete="email"
                                placeholder="you@college.edu"
                                className="bg-background/40"
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <label htmlFor="signup-password-mobile" className="text-sm text-muted-foreground">
                                Password
                              </label>
                              <Input
                                id="signup-password-mobile"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="••••••••"
                                className="bg-background/40"
                                required
                              />
                            </div>

                            <Button type="submit" variant="gold" className="mt-2">
                              Create account
                            </Button>
                          </form>
                        </TabsContent>
                      </Tabs>

                      {isAuthed && displayName ? (
                        <p className="mt-4 text-xs text-muted-foreground">Signed in as {displayName}</p>
                      ) : null}
                    </DialogContent>
                  </Dialog>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
