"use client";

import { SessionProvider as Provider } from "next-auth/react";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  // 1. Assign to a new capitalized variable to bypass the type error
  const AnyProvider = Provider as any;


  return <AnyProvider>{children}</AnyProvider>;
}