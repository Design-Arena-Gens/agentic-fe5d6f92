"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck, Wrench } from "lucide-react";

type Disadvantage = {
  id: string;
  painPoint: string;
  impact: string;
  solution: string;
  automation: string;
};

const items: Disadvantage[] = [
  {
    id: "config-drift",
    painPoint:
      "Configuration drift between Firebase, AWS, and on-prem Spring Boot services introduces regression risk every release.",
    impact: "High-risk deploys, impossible incident retros, duplicated toil.",
    solution:
      "State snapshots & policy packs that reconcile infrastructure and application manifests before shipping.",
    automation:
      "Continuous drift detection with guardrails. Agent CLI auto-generates PRs to align IaC and rejects breaking deploys.",
  },
  {
    id: "secret-fatigue",
    painPoint:
      "Secrets sprawl between environments leads to leaked credentials and manual rotations.",
    impact: "Expensive breach liability, developer slowdowns, compliance gaps.",
    solution:
      "Unified secrets broker that syncs credentials across Firebase, AWS Secrets Manager, Google Secret Manager, and Vercel.",
    automation:
      "Agent CLI provisions secret mirrors, rotates keys on schedule, and rewrites app configs with zero downtime fallbacks.",
  },
  {
    id: "observability-gap",
    painPoint:
      "Each stack ships different logging, metrics, and tracing strategies resulting in blind spots.",
    impact:
      "Incidents linger, SLO burn rates spike, and teams cannot correlate failures.",
    solution:
      "Opinionated telemetry blueprints with OpenTelemetry wiring, service maps, and pre-built dashboards for each runtime.",
    automation:
      "Agent CLI injects instrumentation, configures exporters, and shares runbooks via Slack & PagerDuty automatically.",
  },
  {
    id: "onboarding",
    painPoint:
      "New engineers need weeks to understand bespoke scripts across Firebase, Node.js, Spring Boot, and AWS.",
    impact: "Slow velocity, steep learning curve, hidden tribal knowledge.",
    solution:
      "Single CLI surface with human-readable playbooks, dry-run simulations, and interactive explainers.",
    automation:
      "Agent CLI ships self-healing docs, inline explain commands, and compliance-ready templates out of the box.",
  },
];

export function DisadvantageMatrix() {
  const [expanded, setExpanded] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section className="rounded-3xl border border-white/10 bg-black/70 p-8 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300/80">
            Eliminated disadvantages
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            Pain points your teams never have to feel again
          </h2>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white">
          <ShieldCheck className="h-4 w-4 text-lime-300" />
          Zero blind spots
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {items.map((item) => {
          const isOpen = expanded === item.id;
          return (
            <article
              key={item.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30"
            >
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">
                    {item.impact}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {item.painPoint}
                  </h3>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-white transition ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid overflow-hidden transition-all duration-500 ${
                  isOpen ? "mt-6 grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="space-y-4 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-5">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                      Solution playbook
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-200">
                      {item.solution}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                      Automation flow
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-200">
                      {item.automation}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/40 bg-lime-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-lime-200">
                    <Wrench className="h-4 w-4" />
                    auto-remediation engaged
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
