import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";

type Step = "email" | "otp" | "reset" | "done";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;

function formatSeconds(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function ForgotPasswordFlow({
  idPrefix,
  onBackToLogin,
}: {
  idPrefix: string;
  onBackToLogin: () => void;
}) {
  const [step, setStep] = React.useState<Step>("email");
  const [email, setEmail] = React.useState<string>("");
  const [otp, setOtp] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [sentMessage, setSentMessage] = React.useState<string>("");
  const [verifiedMessage, setVerifiedMessage] = React.useState<string>("");
  const [resetMessage, setResetMessage] = React.useState<string>("");
  const [resendRemaining, setResendRemaining] = React.useState<number>(0);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const resetAll = React.useCallback(() => {
    setStep("email");
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setSentMessage("");
    setVerifiedMessage("");
    setResetMessage("");
    setResendRemaining(0);
  }, []);

  React.useEffect(() => {
    if (step !== "otp") return;
    if (resendRemaining <= 0) return;

    const t = window.setInterval(() => {
      setResendRemaining((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);

    return () => window.clearInterval(t);
  }, [resendRemaining, step]);

  const startResendCooldown = React.useCallback(() => {
    setResendRemaining(RESEND_COOLDOWN_SECONDS);
  }, []);

  const simulateOtpSend = React.useCallback(() => {
    setSentMessage("An OTP has been sent to your registered email address.");
    toast({ title: "OTP sent", description: "Demo only (no email service).", duration: 2000 });
    startResendCooldown();
  }, [startResendCooldown]);

  const onSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const safe = email.trim();

    if (!safe) {
      toast({ title: "Email required", description: "Please enter your registered email address.", variant: "destructive", duration: 2000 });
      return;
    }
    if (safe.length > 255 || !emailRegex.test(safe)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive", duration: 2000 });
      return;
    }

    simulateOtpSend();
    setStep("otp");
  };

  const onVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const safe = otp.replace(/\s/g, "");

    // Demo UX: treat any 6-digit OTP as valid.
    if (!new RegExp(`^\\d{${OTP_LENGTH}}$`).test(safe)) {
      toast({
        title: "Invalid OTP",
        description: `Enter the ${OTP_LENGTH}-digit code from your email (demo: any ${OTP_LENGTH} digits).`,
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    setVerifiedMessage("OTP verified successfully.");
    toast({ title: "OTP verified", description: "Proceed to reset your password.", duration: 2000 });
    setStep("reset");
  };

  const onResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    const a = newPassword;
    const b = confirmPassword;

    if (!a || !b) {
      toast({ title: "Missing fields", description: "Please fill both password fields.", variant: "destructive", duration: 2000 });
      return;
    }
    if (a.length < 8) {
      toast({ title: "Weak password", description: "Use at least 8 characters.", variant: "destructive", duration: 2000 });
      return;
    }
    if (a !== b) {
      toast({ title: "Passwords don't match", description: "Please re-check and try again.", variant: "destructive", duration: 2000 });
      return;
    }

    setResetMessage("Your password has been successfully reset.");
    toast({ title: "Password reset", description: "Demo only (no backend).", duration: 2000 });
    setStep("done");
  };

  return (
    <div className="mt-4 grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-primary">
          {step === "email"
            ? "Forgot Password"
            : step === "otp"
              ? "OTP Verification"
              : step === "reset"
                ? "Reset Password"
                : "Password Reset"}
        </p>
        <Button
          type="button"
          variant="link"
          className="h-auto p-0 text-xs"
          onClick={() => {
            resetAll();
            onBackToLogin();
          }}
        >
          Back to login
        </Button>
      </div>

      {step === "email" ? (
        <form onSubmit={onSendOtp} className="grid gap-3">
          <div className="grid gap-2">
            <label htmlFor={`${idPrefix}-forgot-email`} className="text-sm text-muted-foreground">
              Registered email address
            </label>
            <Input
              id={`${idPrefix}-forgot-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@college.edu"
              className="bg-background/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
            />
          </div>

          <Button type="submit" variant="gold" className="mt-2">
            Send OTP
          </Button>

          {sentMessage ? <p className="text-sm text-muted-foreground">{sentMessage}</p> : null}
        </form>
      ) : null}

      {step === "otp" ? (
        <form onSubmit={onVerifyOtp} className="grid gap-3">
          <div className="grid gap-2">
            <label htmlFor={`${idPrefix}-otp`} className="text-sm text-muted-foreground">
              OTP Verification
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <InputOTP
                id={`${idPrefix}-otp`}
                maxLength={OTP_LENGTH}
                value={otp}
                onChange={(v) => setOtp(v)}
                inputMode="numeric"
                autoComplete="one-time-code"
              >
                <InputOTPGroup>
                  {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs text-muted-foreground">Demo: enter any {OTP_LENGTH} digits</p>
            </div>
          </div>

          <Button type="submit" variant="gold" className="mt-2">
            Verify OTP
          </Button>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <Button
              type="button"
              variant="goldOutline"
              disabled={resendRemaining > 0}
              onClick={() => {
                if (resendRemaining > 0) return;
                simulateOtpSend();
                toast({ title: "Resent OTP", description: "Demo resend (no email sent).", duration: 2000 });
              }}
            >
              Resend OTP
            </Button>
            <p className="text-xs text-muted-foreground">
              {resendRemaining > 0
                ? `You can resend in ${formatSeconds(resendRemaining)}`
                : "Didn't receive the code?"}
            </p>
          </div>

          {verifiedMessage ? <p className="text-sm text-muted-foreground">{verifiedMessage}</p> : null}
        </form>
      ) : null}

      {step === "reset" ? (
        <form onSubmit={onResetPassword} className="grid gap-3">
          <div className="grid gap-2">
            <label htmlFor={`${idPrefix}-new-password`} className="text-sm text-muted-foreground">
              New password
            </label>
            <Input
              id={`${idPrefix}-new-password`}
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className="bg-background/40"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              maxLength={128}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor={`${idPrefix}-confirm-password`} className="text-sm text-muted-foreground">
              Confirm password
            </label>
            <Input
              id={`${idPrefix}-confirm-password`}
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className="bg-background/40"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              maxLength={128}
            />
          </div>

          <Button type="submit" variant="gold" className="mt-2">
            Reset Password
          </Button>
        </form>
      ) : null}

      {step === "done" ? (
        <div className="grid gap-3">
          {resetMessage ? <p className="text-sm text-muted-foreground">{resetMessage}</p> : null}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="gold"
              onClick={() => {
                resetAll();
                onBackToLogin();
              }}
            >
              Return to Login
            </Button>
            <Button type="button" variant="goldOutline" onClick={resetAll}>
              Start over
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
