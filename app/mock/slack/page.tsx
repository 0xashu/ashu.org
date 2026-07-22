import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  alertMeta,
  causeLabel,
  miners,
  type SuspectedCause,
} from "./data";

export const metadata: Metadata = {
  title: "Nonce Slack Bot Prototype · Ashu",
  description: "Slack alert + canvas prototype for Nonce miner health monitoring",
};

function formatDurationHours(hours: number) {
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  const rem = hours % 24;
  return rem === 0 ? `${days}d` : `${days}d ${rem}h`;
}

function CausePill({ cause }: { cause: SuspectedCause }) {
  const styles: Record<SuspectedCause, string> = {
    power: "bg-amber-50 text-amber-800 ring-amber-200",
    hashboard: "bg-sky-50 text-sky-800 ring-sky-200",
    hardware: "bg-rose-50 text-rose-800 ring-rose-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${styles[cause]}`}
    >
      {causeLabel[cause]}
    </span>
  );
}

function BotAvatar() {
  return (
    <Image
      src="/slack/nonce-bot.png"
      alt="Nonce"
      width={36}
      height={36}
      className="h-9 w-9 shrink-0 rounded-lg object-cover"
    />
  );
}

export default function SlackPrototypePage() {
  const count = alertMeta.affectedTotal;
  const zeroHash = alertMeta.zeroHashTotal;
  const lowHash = alertMeta.lowHashTotal;
  const avgLowHours = alertMeta.avgLowHours;
  const avgReboot = alertMeta.avgReboot;
  const sample = miners;
  const sampleSize = sample.length;

  return (
    <div className="min-h-screen bg-[#1a1d21] text-[#d1d2d3]">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link
              href="/"
              className="mb-4 inline-block font-mono text-sm text-[#9a9b9e] transition-colors hover:text-white"
            >
              Back
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#ababad]">
              Prototype · R&amp;D reference
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-white md:text-2xl">
              Nonce Slack Bot · Alert + Canvas
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#9a9b9e]">
              模拟矿机反复重启后仍持续低算力 / 零算力的告警。以 IP
              定位，附重启频次与持续低算力时长；假数据对齐 Nonce 字段。
            </p>
          </div>
          <div className="rounded-md bg-[#222529] px-3 py-2 font-mono text-xs text-[#9a9b9e] ring-1 ring-[#3f4146]">
            #{alertMeta.channel}
          </div>
        </header>

        <div className="overflow-hidden rounded-xl bg-[#1a1d21] shadow-2xl shadow-black/40 ring-1 ring-[#3f4146]">
          <div className="flex items-center gap-2 border-b border-[#3f4146] bg-[#1a1d21] px-4 py-3">
            <span className="text-lg font-bold text-white">#</span>
            <div>
              <div className="text-sm font-bold text-white">
                {alertMeta.channel}
              </div>
              <div className="text-[11px] text-[#9a9b9e]">
                {alertMeta.workspace} · miner health monitor
              </div>
            </div>
          </div>

          <div className="space-y-8 bg-[#1a1d21] p-4 md:p-6">
            <article className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-[#222529]/40">
              <BotAvatar />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-sm font-bold text-white">
                    {alertMeta.botName}
                  </span>
                  <span className="rounded bg-[#4A154B] px-1.5 py-px text-[10px] font-bold uppercase tracking-wide text-white">
                    APP
                  </span>
                  <span className="text-xs text-[#9a9b9e]">
                    {alertMeta.postedAt}
                  </span>
                </div>

                <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-[#d1d2d3]">
                  <p>
                    Nonce 发现矿场{" "}
                    <a
                      href={alertMeta.farmUrl}
                      className="font-semibold text-[#1d9bd1] hover:underline"
                    >
                      {alertMeta.farmCode}
                    </a>{" "}
                    有{" "}
                    <span className="font-semibold text-white">{count}</span>{" "}
                    台矿机在 {alertMeta.windowLabel}
                    内多次重启，但仍然持续低算力 / 零算力。从数据评估，矿机可能处于电源电压、算力板、或硬件损坏相关问题，请保持关注并下架检查。
                  </p>

                  {/* Slack section.fields */}
                  <div className="mt-1 max-w-lg">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[13px]">
                      <MetricField label="低算力" value={`${lowHash}`} />
                      <MetricField label="零算力" value={`${zeroHash}`} />
                      <MetricField
                        label="平均重启次数"
                        value={`${avgReboot}`}
                      />
                      <MetricField
                        label="平均持续时长"
                        value={formatDurationHours(avgLowHours)}
                      />
                    </div>
                  </div>
                </div>

                <a
                  href="#canvas"
                  className="mt-4 flex max-w-lg overflow-hidden rounded-lg border border-[#565856] bg-[#222529] transition-colors hover:border-[#1d9bd1]"
                >
                  <div className="w-1.5 shrink-0 bg-[#1d9bd1]" />
                  <div className="flex min-w-0 flex-1 items-start gap-3 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#1a1d21] text-lg">
                      📄
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-[#1d9bd1]">
                        持续低算力矿机
                      </div>
                      <div className="mt-0.5 text-xs text-[#9a9b9e]">
                        Canvas · 抽样 {sampleSize} / {count} · 详情见 Nonce
                      </div>
                      <div className="mt-2 text-[11px] font-medium text-[#1d9bd1]">
                        打开预览 ↓
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </article>

            <section
              id="canvas"
              className="scroll-mt-8 overflow-hidden rounded-xl border border-[#3f4146] bg-[#ffffff] text-[#1d1c1d] shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-[#e8e8e8] bg-[#f8f8f8] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">📄</span>
                  <div>
                    <div className="text-sm font-semibold">
                      持续低算力矿机
                    </div>
                    <div className="text-[11px] text-[#616061]">
                      Slack Canvas preview · mock data · keyed by IP
                    </div>
                  </div>
                </div>
                <span className="hidden rounded-full bg-[#e8e8e8] px-2 py-0.5 font-mono text-[10px] text-[#616061] sm:inline">
                  read-only prototype
                </span>
              </div>

              <div className="space-y-8 px-4 py-6 md:px-8 md:py-8">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">事件摘要</h2>
                  <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                    <Row
                      label="矿场"
                      value={`${alertMeta.farmCode} · ${alertMeta.farmFullName}`}
                    />
                    <Row label="检测窗口" value={alertMeta.windowLabel} />
                    <Row
                      label="受影响矿机"
                      value={`${count} 台（零算力 ${zeroHash}）`}
                    />
                    <Row label="触发规则" value={alertMeta.rule} mono />
                  </dl>
                </div>

                <div>
                  <h2 className="text-lg font-bold tracking-tight">
                    矿机列表（抽样）
                  </h2>
                  <p className="mt-1 text-sm text-[#616061]">
                    共 {count} 台受影响，此处展示 {sampleSize}{" "}
                    台抽样。完整列表与详情请在{" "}
                    <a
                      href={alertMeta.farmUrl}
                      className="text-[#1264a3] hover:underline"
                    >
                      Nonce · {alertMeta.farmCode}
                    </a>{" "}
                    查看。
                  </p>
                  <div className="mt-4 overflow-x-auto rounded-lg ring-1 ring-[#e8e8e8]">
                    <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
                      <thead className="bg-[#f8f8f8] text-[11px] uppercase tracking-wide text-[#616061]">
                        <tr>
                          <th className="px-3 py-2 font-medium">IP</th>
                          <th className="px-3 py-2 font-medium">重启次数</th>
                          <th className="px-3 py-2 font-medium">持续低算力</th>
                          <th className="px-3 py-2 font-medium">算力</th>
                          <th className="px-3 py-2 font-medium">定位原因</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sample.map((m) => (
                          <tr
                            key={m.id}
                            className="border-t border-[#ececec]"
                          >
                            <td className="px-3 py-2.5 font-mono text-[13px] font-semibold tracking-tight">
                              {m.ip}
                            </td>
                            <td className="px-3 py-2.5">{m.rebootCount}</td>
                            <td className="px-3 py-2.5">
                              {formatDurationHours(m.lowHashrateHours)}
                            </td>
                            <td
                              className={`px-3 py-2.5 font-mono ${
                                m.hashrateTh === 0
                                  ? "font-semibold text-rose-600"
                                  : ""
                              }`}
                            >
                              {m.hashrateTh} / {m.expectedHashrateTh} TH/s
                            </td>
                            <td className="px-3 py-2.5">
                              <CausePill cause={m.suspected} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold tracking-tight">问题定位</h2>
                  <p className="mt-1 text-sm text-[#616061]">
                    以下结论来自矿机历史数据与日志综合评估。
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#1d1c1d]">
                    <li>
                      <strong>电源电压：</strong>
                      重启后功率骤降或接近待机，算力在窗口内无法恢复。
                    </li>
                    <li>
                      <strong>算力板：</strong>
                      部分 hashboard 离线，算力长期偏低，重启无法拉回全板算力。
                    </li>
                    <li>
                      <strong>硬件损坏：</strong>
                      控制板心跳中断、telemetry stale，或持续零算力伴随
                      control_board / hardware 异常。
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-[11px] text-[#6f7072]">
          Mock only · 48h window · IP-keyed · not live Slack
        </p>
      </div>
    </div>
  );
}

function MetricField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[12px] font-bold text-[#d1d2d3]">{label}</div>
      <div className="text-[15px] text-[#d1d2d3]">{value}</div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-md bg-[#f8f8f8] px-3 py-2">
      <dt className="text-[11px] uppercase tracking-wide text-[#616061]">
        {label}
      </dt>
      <dd className={`mt-0.5 ${mono ? "font-mono text-[12px]" : "text-sm"}`}>
        {value}
      </dd>
    </div>
  );
}
