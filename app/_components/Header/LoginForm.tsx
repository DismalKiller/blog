"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useState } from "react";
const cookies = require("js-cookie");

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

interface LoginFormProps {
  onSuccess?: () => void;
  onLogin?: () => void;
}

export default function LoginForm({ onSuccess, onLogin }: LoginFormProps) {
  const { toast } = useToast();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "hyun1006@outlook.com",
      password: "123456",
      //todo: 删除
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.code === 200) {
      cookies.set("token", result.data.token);
      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      });
      onLogin?.();
      onSuccess?.();
    } else if (result.code === 402) {
      setIsRegisterDialogOpen(true);
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  }

  async function onComplete(otp: string) {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email: form.getValues("email"),
        otp,
        password: form.getValues("password"),
      }),
    });
    const result = await res.json();
    if (result.code === 200) {
      setIsRegisterDialogOpen(false);
      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="please enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="please enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Login / Register
          </Button>
        </form>
      </Form>
      <Dialog
        open={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
      >
        <DialogContent className="w-1/4 mx-auto mt-10 flex flex-col items-center">
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Please enter the verification code sent to your email
          </DialogDescription>
          <InputOTP maxLength={6} onComplete={onComplete}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </DialogContent>
      </Dialog>
    </>
  );
}
