"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { verify } from "crypto";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyRequest() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";
  const [emailPending, startEmailTransition] = useTransition();
  const [otp, setOtp] = useState<string>("");
  const isOtpCompleted = otp.length === 6;
  function verifyOtp() {
    startEmailTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email verified successfully!");
            router.push("/");
          },
          onError: (error) => {
            toast.error(`Failed to verify email: ${error.error.message}`);
          },
        },
      });
    });
  }
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please Check your Email</CardTitle>
        <CardDescription>
          We have sent you a verification code to your email. Please enter the
          code to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            className="gap-2 mx-auto"
          >
            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <p className="flex mt-2 items-center justify-center">
          <span className="text-sm text-muted-foreground">
            Enter the code we sent to your email.
          </span>
        </p>

        <Button
          onClick={verifyOtp}
          disabled={emailPending || !isOtpCompleted}
          className="w-full mt-2"
        >
          
            {emailPending ? "Verifying..." : "Verify Email"}
        </Button>
      </CardContent>
    </Card>
  );
}
