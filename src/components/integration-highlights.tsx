"use client";

import { motion, type Transition } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

type IntegrationHighlight = {
  id: string;
  title: string;
  descriptor: string;
  bullets: string[];
  illustration: string;
};

const highlights: IntegrationHighlight[] = [
  {
    id: "federated-cli",
    title: "Federated CLI brain",
    descriptor:
      "Agent CLI normalizes commands across Firebase, Spring Boot, AWS, and Node.js so every action shares playbooks and guardrails.",
    bullets: [
      "One semantic layer, polyglot automation",
      "Context-aware prompts ensure least-privilege defaults",
      "Pre-flight simulations catch breaking drift before deploy",
    ],
    illustration: "/hero-grid.svg",
  },
  {
    id: "governance",
    title: "Governance without the friction",
    descriptor:
      "Enforce compliance packs and secrets hygiene while keeping DX delightful.",
    bullets: [
      "Secrets synced to Vercel, AWS, GCP, and CI runners automatically",
      "Auto-remediation bots open PRs or patch infrastructure instantly",
      "Audit ready exports for SOC2, HIPAA, and ISO out of the box",
    ],
    illustration: "/compliance-orbit.svg",
  },
  {
    id: "observability",
    title: "Observability baked in",
    descriptor:
      "Every generated asset ships with logs, metrics, and traces bound to your account.",
    bullets: [
      "OpenTelemetry wiring for services and serverless functions",
      "Golden signals dashboards crafted for Firebase + Spring workloads",
      "AIOps assistant triages incidents and suggests remediations",
    ],
    illustration: "/observability-lens.svg",
  },
];

const transition: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
};

const animations = {
  initial: { y: 24, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  transition,
};

export function IntegrationHighlights() {
  return (
    <section className="space-y-8 rounded-3xl border border-white/5 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300/80">
            Why teams choose Agent CLI
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            Replace four ops playbooks with one fused platform
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime-200">
          <Sparkles className="h-4 w-4" />
          multi-cloud native
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {highlights.map((highlight) => (
          <motion.article
            key={highlight.id}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 p-6 transition hover:border-white/30"
            initial={animations.initial}
            whileInView={animations.whileInView}
            transition={animations.transition}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/0 opacity-0 transition group-hover:opacity-100" />
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-white">
                {highlight.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                {highlight.descriptor}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {highlight.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-lime-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative z-0 mt-6 flex flex-1 items-end justify-end">
              <Image
                src={highlight.illustration}
                alt={highlight.title}
                width={196}
                height={196}
                className="opacity-80 transition group-hover:scale-105 group-hover:opacity-100"
              />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
