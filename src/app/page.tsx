import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { CommandBuilder } from "@/components/command-builder";
import { IntegrationHighlights } from "@/components/integration-highlights";
import { DisadvantageMatrix } from "@/components/disadvantage-matrix";

const ecosystems = [
  {
    id: "firebase",
    label: "Firebase",
    description:
      "Cloud-native frontends, auth, and serverless functions orchestrated with instant preview stacks.",
    badge: "Realtime",
  },
  {
    id: "spring",
    label: "Spring Boot",
    description:
      "Hexagonal Java services with GitOps, chaos testing, and compliance baked in.",
    badge: "Enterprise",
  },
  {
    id: "aws",
    label: "AWS",
    description:
      "IaC, organizations, budgets, and security guardrails hardened with policy packs.",
    badge: "Governance",
  },
  {
    id: "node",
    label: "Node.js",
    description:
      "Type-safe apps, SDKs, and quality suites generated with modern tooling.",
    badge: "DX",
  },
  {
    id: "kotlin",
    label: "Kotlin & Android",
    description:
      "CI/CD, artifact signing, and Play Store automation that integrates with Firebase features.",
    badge: "Mobile",
  },
  {
    id: "data",
    label: "Data & ML",
    description:
      "Pipelines for BigQuery, DynamoDB, and Lake Formation with lineage and drift monitoring.",
    badge: "Intelligence",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-1/2 top-[-20%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-lime-400 via-cyan-400 to-blue-500 blur-3xl" />
        <div className="absolute right-[10%] top-[30%] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-3xl opacity-70" />
        <div className="absolute left-[10%] bottom-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-amber-500 to-orange-400 blur-3xl opacity-50" />
      </div>

      <header className="relative isolate overflow-hidden">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-24 sm:gap-16 sm:pt-32 lg:pb-28">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                <Sparkles className="h-4 w-4" />
                Polyglot agent runtime
              </span>
              <h1 className="text-4xl font-black leading-snug text-white sm:text-6xl">
                Agent CLI unifies Firebase, Spring Boot, Node.js, and AWS into
                one deploy-ready workflow.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-200">
                Design, scaffold, and operate multi-cloud products with a single
                command surface. No more juggling scripts: we replicate the best
                ideas from every ecosystem and erase the trade-offs.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#builder"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-900 transition hover:scale-[1.01] hover:bg-slate-100"
                >
                  Launch builder
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#advantages"
                  className="inline-flex items-center gap-3 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white hover:bg-white/10"
                >
                  Explore playbooks
                </a>
              </div>

              <dl className="grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Stacks automated
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-white">
                    45+
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Guardrails enforced
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-white">
                    300+
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Deploy time reduction
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-white">
                    68%
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative flex flex-1 flex-col items-center justify-center">
              <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl shadow-black/40 backdrop-blur">
                <div className="absolute -right-8 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-violet-400 to-sky-400 blur-2xl opacity-70" />
                <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-white/10 bg-black/80 p-5 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>agent@cli</span>
                    <span>multi-runtime</span>
                  </div>
                  <div className="mt-4 space-y-3 font-mono text-sm text-lime-300">
                    <p>$ agent firebase bootstrap --env dev --telemetry otel</p>
                    <p>✔ Stack hydrated with IAM least-privilege policies</p>
                    <p>✔ Emulator suite ready for local contributors</p>
                    <p className="text-cyan-300">
                      → ship frontends, lambdas, and services with zero drift
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24">
        <section className="grid gap-4 rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl shadow-black/40 backdrop-blur">
          <header className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300/80">
                Ecosystem coverage
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                Every stack, one interface
              </h2>
            </div>
            <Image
              src="/hero-grid.svg"
              alt="Agent grid"
              width={180}
              height={140}
              className="opacity-80"
            />
          </header>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ecosystems.map((ecosystem) => (
              <div
                key={ecosystem.id}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
                    {ecosystem.badge}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {ecosystem.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {ecosystem.description}
                  </p>
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Replicated + enhanced
                </div>
              </div>
            ))}
          </div>
        </section>

        <CommandBuilder />
        <IntegrationHighlights />
        <div id="advantages">
          <DisadvantageMatrix />
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Agent CLI
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Deploy from Vercel and orchestrate Firebase, Spring Boot, Node.js,
              AWS, and everything in between.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200">
            <a
              href="#builder"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:bg-white/10"
            >
              Launch CLI
            </a>
            <a
              href="https://vercel.com"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:bg-white/10"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deploy to Vercel
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
