"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import clsx from "clsx";

type ToggleFlag = {
  id: string;
  label: string;
  description: string;
  flag: string;
};

type Operation = {
  id: string;
  label: string;
  synopsis: string;
  command: string;
  output: string[];
  docs: string;
};

type Service = {
  id: string;
  name: string;
  gradient: string;
  description: string;
  operations: Operation[];
  flags: ToggleFlag[];
  recommendedFlow: string[];
};

const environmentOptions = ["development", "staging", "production"] as const;
const runtimeOptions = [
  { id: "node", label: "Node.js & TypeScript" },
  { id: "spring", label: "Spring Boot & JVM" },
  { id: "edge", label: "Edge Functions" },
] as const;

const services: Service[] = [
  {
    id: "firebase",
    name: "Firebase",
    gradient: "from-orange-400 via-red-500 to-rose-500",
    description:
      "Bootstrap full-stack Firebase projects with Firestore, Auth, Storage, and automated IAM hardening.",
    operations: [
      {
        id: "bootstrap",
        label: "Bootstrap Project",
        synopsis:
          "Provision Firebase resources, link environments, and scaffold SDK wiring.",
        command:
          "bootstrap --features auth firestore storage hosting --hardening strict",
        output: [
          "✔ Firestore, Auth, Storage, Hosting prepared",
          "✔ Environment secrets synced to Vercel and GitHub",
          "⚡ Generated server-side adapters with type safety",
        ],
        docs: "https://firebase.google.com/docs",
      },
      {
        id: "deploy",
        label: "Deploy Cloud Functions",
        synopsis:
          "Bundle and deploy callable functions with zero-downtime rolling releases.",
        command:
          "deploy functions --concurrency 80 --runtime node20 --trace-level detailed",
        output: [
          "🚀 Deployed 5 callable functions to us-central1",
          "🛡️  IAM policy hardened for principle of least privilege",
          "📈 Observability hooks registered with OpenTelemetry",
        ],
        docs: "https://firebase.google.com/docs/functions",
      },
      {
        id: "sync",
        label: "Sync Firestore Schema",
        synopsis:
          "Generate Firestore rules and schema migrations from your TypeScript models.",
        command: "sync firestore --schema ./infrastructure/firestore.schema.ts",
        output: [
          "📦 Schema diff detected: 2 new collections, 1 index update",
          "✅ Rules compiled and pushed with regression safeguards",
          "🔄 Local emulator snapshots updated for integration tests",
        ],
        docs: "https://firebase.google.com/docs/firestore",
      },
    ],
    flags: [
      {
        id: "observability",
        label: "Observability Suite",
        description: "Enable OpenTelemetry traces and structured logging.",
        flag: "--telemetry otel --log-format json",
      },
      {
        id: "preview",
        label: "Ephemeral Preview Stacks",
        description: "Spin up isolated environments per pull request.",
        flag: "--previews on --lifespan 48h",
      },
    ],
    recommendedFlow: [
      "agent firebase bootstrap --env dev",
      "agent firebase sync firestore --env dev",
      "agent firebase deploy functions --env staging",
      "agent firebase promote --from staging --to production",
    ],
  },
  {
    id: "spring",
    name: "Spring Boot",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    description:
      "Generate opinionated Spring Boot services, with Dockerfiles, tests, and AWS integrations.",
    operations: [
      {
        id: "scaffold",
        label: "Scaffold Service",
        synopsis:
          "Create a hexagonal Spring Boot service wired with Postgres, Redis, and tracing.",
        command:
          "scaffold service --ddd --database postgres --cache redis --observability opentelemetry",
        output: [
          "🏗️  Generated service with modular architecture and CI workflow",
          "🧪  Testcontainers harness linked for contract tests",
          "🔐  Vault secrets templates emitted for environments",
        ],
        docs: "https://spring.io/projects/spring-boot",
      },
      {
        id: "pipeline",
        label: "Generate GitOps Pipeline",
        synopsis:
          "Emit deployment manifests for ArgoCD / GitHub Actions with policy guardrails.",
        command:
          "pipeline generate --provider github --strategy blue-green --sca on",
        output: [
          "🌀 GitHub Actions pipeline created with security scans",
          "🌐 ArgoCD application manifest generated with health checks",
          "✅ Policy tests added to ensure compliance SLAs",
        ],
        docs: "https://spring.io/guides",
      },
      {
        id: "aws-wire",
        label: "Wire AWS Resources",
        synopsis:
          "Provision IAM roles, API Gateway, and RDS for the service with drift detection.",
        command:
          "aws wire --services apigateway,rds,iam --region us-east-1 --drift-guard",
        output: [
          "🔗 IAM role with least privilege created",
          "📡 API Gateway routes mapped to spring controllers",
          "🛢️ RDS instance provisioned with automated backups",
        ],
        docs: "https://aws.amazon.com/developer/language/java/",
      },
    ],
    flags: [
      {
        id: "resilience",
        label: "Resilience Testing",
        description: "Inject chaos automation & circuit breaker templates.",
        flag: "--resilience chaos-kit --circuit-breakers enabled",
      },
      {
        id: "slsa",
        label: "SLSA Provenance",
        description: "Attach supply-chain metadata to each artifact.",
        flag: "--slsa level-3",
      },
    ],
    recommendedFlow: [
      "agent spring scaffold service --name orders --env dev",
      "agent spring aws wire --services rds,iam --env staging",
      "agent spring pipeline generate --provider github",
      "agent deploy --target production --strategy canary",
    ],
  },
  {
    id: "aws",
    name: "AWS",
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
    description:
      "Opinionated IaC and governance for AWS workloads with drift protection and budgets.",
    operations: [
      {
        id: "bootstrap",
        label: "Bootstrap Organization",
        synopsis:
          "Create multi-account landing zone with organizations, SCPs, and budgets.",
        command:
          "bootstrap org --blueprint startup --guardrails security,governance --budget 5000",
        output: [
          "🏛️ AWS Organizations created with baseline SCPs",
          "🛡️ GuardDuty, Config, and SecurityHub enabled across accounts",
          "💵 Budget alarms configured with Slack webhooks",
        ],
        docs: "https://aws.amazon.com/organizations/",
      },
      {
        id: "deploy",
        label: "Deploy Serverless Stack",
        synopsis:
          "Ship Lambda, DynamoDB, and EventBridge wiring with typed SDK stubs.",
        command:
          "deploy stack --template serverless --services lambda,dynamodb,eventbridge --profile platform",
        output: [
          "🧱 CloudFormation stack deployed with drift protection",
          "🔁 EventBridge rules connected to Lambda subscribers",
          "📦 TypeScript SDK emitted for consumer services",
        ],
        docs: "https://aws.amazon.com/serverless/",
      },
      {
        id: "audit",
        label: "Audit & Remediate",
        synopsis:
          "Run conformance scans and auto-remediate config drifts with policy packs.",
        command:
          "audit guard --policies cis-foundations,nist-800-53 --auto-remediate",
        output: [
          "🧩 41 controls evaluated, 0 high-risk findings outstanding",
          "🛠️ Automatically remediated public S3 bucket ACLs",
          "🔍 Report exported to observability dashboards",
        ],
        docs: "https://aws.amazon.com/compliance/",
      },
    ],
    flags: [
      {
        id: "cost",
        label: "Predictive Cost Controls",
        description: "Enable ML-based forecast alarms and idle resource sweeps.",
        flag: "--cost-guard predictive --idle-reaper on",
      },
      {
        id: "hipaa",
        label: "HIPAA Blueprint",
        description: "Apply HIPAA compliance guardrails automatically.",
        flag: "--compliance hipaa --encryption enforced",
      },
    ],
    recommendedFlow: [
      "agent aws bootstrap org --env platform",
      "agent aws deploy stack --template serverless --env dev",
      "agent aws audit guard --policies cis-foundations --env production",
      "agent report publish --channel slack --schedule daily",
    ],
  },
  {
    id: "node",
    name: "Node.js",
    gradient: "from-slate-400 via-indigo-500 to-purple-500",
    description:
      "Generate batteries-included Node.js apps with Next.js, Express, Prisma, and testing harnesses.",
    operations: [
      {
        id: "create",
        label: "Create Full-stack App",
        synopsis:
          "Scaffold Next.js + Express hybrid with SSR, API routes, and Turbo build tooling.",
        command:
          "create fullstack --frontend next --backend express --orm prisma --testing vitest",
        output: [
          "🧩 App router configured with shared Zod schemas",
          "🛠️ API gateway generated with OpenAPI contract",
          "✅ Vitest and Playwright suites wired with seed data",
        ],
        docs: "https://nodejs.org/en/learn",
      },
      {
        id: "package",
        label: "Package Reusable SDK",
        synopsis:
          "Bundle TypeScript SDKs with semantic versioning and changelog automation.",
        command:
          "package sdk --name chrono --registry npm --release semantic --docs mdx",
        output: [
          "📦 Bundled ESM + CJS artifacts with type declarations",
          "📝 Changelog generated from conventional commits",
          "🔁 Release workflow added for npm + GitHub packages",
        ],
        docs: "https://nodejs.org/api/modules.html",
      },
      {
        id: "test",
        label: "Run Quality Suite",
        synopsis:
          "Execute linting, unit, contract, and smoke tests with automatic retries.",
        command:
          "test run --suites lint,unit,contract,smoke --concurrency 4 --retries 2",
        output: [
          "🧪 132 tests executed in 45s with flaky retry shield",
          "📊 Coverage report published to Codecov",
          "🤖 GitHub status checks updated with actionable summaries",
        ],
        docs: "https://nodejs.dev/en/learn",
      },
    ],
    flags: [
      {
        id: "turbo",
        label: "Turbo Cache",
        description: "Enable remote caching for Turborepo pipelines.",
        flag: "--turbo remote",
      },
      {
        id: "ai",
        label: "AI Assistant",
        description: "Generate code mods and scaffolds with speculative AI changes.",
        flag: "--ai-copilot on",
      },
    ],
    recommendedFlow: [
      "agent node create fullstack --env dev",
      "agent node package sdk --registry npm",
      "agent node test run --suites lint,unit,contract",
      "agent deploy web --platform vercel --env production",
    ],
  },
];

export function CommandBuilder() {
  const [serviceId, setServiceId] = useState<string>(services[0]?.id ?? "");
  const [operationId, setOperationId] = useState<string>(
    services[0]?.operations[0]?.id ?? "",
  );
  const [environment, setEnvironment] = useState<(typeof environmentOptions)[number]>(
    environmentOptions[0],
  );
  const [runtime, setRuntime] = useState<(typeof runtimeOptions)[number]["id"]>(
    runtimeOptions[0]?.id ?? "node",
  );
  const [activeFlags, setActiveFlags] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const service = useMemo(
    () => services.find((entry) => entry.id === serviceId) ?? services[0],
    [serviceId],
  );

  const operation = useMemo(
    () =>
      service.operations.find((item) => item.id === operationId) ??
      service.operations[0],
    [service, operationId],
  );

  const flagString = useMemo(() => {
    if (!service.flags.length) return "";
    return service.flags
      .filter((flag) => activeFlags[flag.id])
      .map((flag) => flag.flag)
      .join(" ");
  }, [service.flags, activeFlags]);

  const command = useMemo(() => {
    const base = `agent ${service.id}`;
    const envFlag = `--env ${environment}`;
    const runtimeFlag = `--runtime ${runtime}`;
    const composed = [base, operation.command, envFlag, runtimeFlag, flagString]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    return composed;
  }, [service.id, operation.command, environment, runtime, flagString]);

  const handleToggleFlag = (flagId: string) => {
    setActiveFlags((prev) => ({
      ...prev,
      [flagId]: !prev[flagId],
    }));
  };

  const handleServiceChange = (nextServiceId: string) => {
    setServiceId(nextServiceId);
    const nextService =
      services.find((entry) => entry.id === nextServiceId) ?? services[0];
    const nextOperation = nextService.operations[0];
    if (nextOperation) {
      setOperationId(nextOperation.id);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore copy failures
    }
  };

  return (
    <section
      id="builder"
      className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 shadow-2xl shadow-black/30 backdrop-blur-md"
    >
      <div className="grid gap-8 p-8 md:grid-cols-[280px,1fr] md:gap-12 md:p-12">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-300/80">
              Agent CLI
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white">
              Unified command surface for every stack
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Pick your platform, wire up automation, and ship production-grade
              deployments without context switching across toolchains.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase text-zinc-400">
              Platform
            </h3>
            <div className="flex flex-wrap gap-2">
              {services.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => handleServiceChange(entry.id)}
                  className={clsx(
                    "rounded-full border px-4 py-2 text-sm transition",
                    serviceId === entry.id
                      ? "border-transparent bg-white text-zinc-900 shadow"
                      : "border-white/10 text-zinc-200 hover:border-white/30",
                  )}
                >
                  {entry.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase text-zinc-400">
              Runtime focus
            </h3>
            <div className="flex flex-wrap gap-2">
              {runtimeOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setRuntime(option.id)}
                  className={clsx(
                    "rounded-full border px-3 py-1.5 text-xs uppercase tracking-wide transition",
                    runtime === option.id
                      ? "border-transparent bg-lime-400 text-zinc-900"
                      : "border-white/10 text-zinc-200 hover:border-white/30",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase text-zinc-400">
              Environment
            </h3>
            <div className="flex flex-wrap gap-2">
              {environmentOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setEnvironment(option)}
                  className={clsx(
                    "rounded-full border px-3 py-1.5 text-xs uppercase tracking-wide transition",
                    environment === option
                      ? "border-transparent bg-cyan-400 text-zinc-900"
                      : "border-white/10 text-zinc-200 hover:border-white/30",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner">
            <p className="text-xs font-semibold uppercase text-zinc-300">
              Suggested playbook
            </p>
            <ul className="space-y-2 text-sm text-zinc-200">
              {service.recommendedFlow.map((step, index) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <code className="flex-1 rounded bg-black/40 px-2 py-1 font-mono text-xs text-lime-300">
                    {step}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div
            className={clsx(
              "rounded-3xl border border-white/10 bg-gradient-to-br p-6 shadow-2xl text-white",
              service.gradient,
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <p className="mt-1 text-sm text-white/80">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                Operations
              </h4>
              <div className="grid gap-2 md:grid-cols-2">
                {service.operations.map((item) => {
                  const selected = operation.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setOperationId(item.id)}
                      className={clsx(
                        "rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
                        selected
                          ? "border-white/70 bg-black/20 shadow-lg"
                          : "border-white/30 bg-black/10 hover:border-white/60 hover:bg-black/20",
                      )}
                    >
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="mt-1 text-xs text-white/70">
                        {item.synopsis}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Command
                </p>
                <h3 className="text-lg font-semibold text-white">
                  {operation.label}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 rounded-xl bg-zinc-900 p-4 font-mono text-sm text-lime-300 shadow-inner">
              <pre className="overflow-x-auto whitespace-pre-wrap break-words">
                <code>{command}</code>
              </pre>
            </div>

            {service.flags.length > 0 && (
              <div className="mt-5 space-y-3">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                  Hardening switches
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {service.flags.map((flag) => {
                    const active = !!activeFlags[flag.id];
                    return (
                      <label
                        key={flag.id}
                        className={clsx(
                          "flex cursor-pointer flex-col rounded-2xl border p-3 transition",
                          active
                            ? "border-lime-300 bg-lime-300/10"
                            : "border-white/10 bg-white/5 hover:border-white/30",
                        )}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-white">
                            {flag.label}
                          </span>
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={() => handleToggleFlag(flag.id)}
                            className="h-4 w-4 rounded border-white/30 bg-transparent text-lime-300 focus:ring-lime-300"
                          />
                        </span>
                        <span className="mt-1 text-xs text-zinc-400">
                          {flag.description}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                Expected output
              </p>
              <div className="rounded-xl border border-white/5 bg-zinc-900/60 p-4">
                <ul className="space-y-2 text-sm text-zinc-200">
                  {operation.output.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-lime-300" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={operation.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300 hover:text-cyan-200"
              >
                Deep dive docs →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
