"use client";

import dynamic from "next/dynamic";

const HeroCupcake = dynamic(() => import("./HeroCupcake"), {
  ssr: false,
  loading: () => null,
});

export default function HeroCupcakeClient() {
  return <HeroCupcake />;
}
