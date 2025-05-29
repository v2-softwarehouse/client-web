"use client";
import { Order } from "@/components";
import { AuthService } from "@/services";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AuthService.signInAnonymously();
  }, []);

  return <Order />;
}
