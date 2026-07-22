export type SuspectedCause = "power" | "hashboard" | "hardware";

export interface MockMiner {
  id: string;
  ip: string;
  make: string;
  model: string;
  farm: string;
  status: "online" | "stale";
  opsStatus: "maintenance" | null;
  /** 48h 重启次数 */
  rebootCount: number;
  /** 持续低算力时长（小时，窗口内） */
  lowHashrateHours: number;
  hashrateTh: number;
  expectedHashrateTh: number;
  powerW: number | null;
  tempC: number | null;
  anomaly: string[];
  suspected: SuspectedCause;
  lastRebootAt: string;
  reason: string;
}

export const alertMeta = {
  botName: "Nonce",
  channel: "cango-nonce-monitor",
  workspace: "Hashing",
  postedAt: "Today at 10:42 AM",
  windowLabel: "最近 48 小时",
  /** Real Cango farm from #cango-alerts */
  farmCode: "HMOTX01",
  farmLabel: "HMOTX01",
  farmFullName: "Harbor Mining Origin-HF01-TX-US",
  farmUrl: "https://nonce.app/cango/farms/3f896bc5-864f-4f33-a7c8-fa6b5f5c22ef",
  rule: "reboot_count_48h ≥ 3 AND hashrate_realization ≤ 15%",
  /** Full affected set; `miners` below is a sample for Canvas */
  affectedTotal: 23,
  lowHashTotal: 9,
  zeroHashTotal: 14,
  avgReboot: 4,
  avgLowHours: 29,
};

export const miners: MockMiner[] = [
  {
    id: "mnr_8f2a1c",
    ip: "192.168.39.47",
    make: "Bitmain",
    model: "Antminer S21",
    farm: "HMOTX01",
    status: "online",
    opsStatus: null,
    rebootCount: 5,
    lowHashrateHours: 36,
    hashrateTh: 0,
    expectedHashrateTh: 200,
    powerW: 42,
    tempC: 28,
    anomaly: ["power", "hashboard"],
    suspected: "power",
    lastRebootAt: "2026-07-22T02:18:00+08:00",
    reason: "多次重启后功率接近待机，算力长期无法恢复",
  },
  {
    id: "mnr_3b91e0",
    ip: "192.168.39.51",
    make: "Bitmain",
    model: "Antminer S21",
    farm: "HMOTX01",
    status: "online",
    opsStatus: null,
    rebootCount: 3,
    lowHashrateHours: 28,
    hashrateTh: 12.4,
    expectedHashrateTh: 200,
    powerW: 890,
    tempC: 61,
    anomaly: ["hashboard"],
    suspected: "hashboard",
    lastRebootAt: "2026-07-22T01:04:00+08:00",
    reason: "仅部分算力板在线，重启后 realization 仍 < 10%",
  },
  {
    id: "mnr_c07d44",
    ip: "192.168.39.18",
    make: "MicroBT",
    model: "Whatsminer M60S",
    farm: "HMOTX01",
    status: "stale",
    opsStatus: null,
    rebootCount: 6,
    lowHashrateHours: 42,
    hashrateTh: 0,
    expectedHashrateTh: 186,
    powerW: null,
    tempC: null,
    anomaly: ["power", "control_board"],
    suspected: "hardware",
    lastRebootAt: "2026-07-22T03:41:00+08:00",
    reason: "反复重启后心跳中断，telemetry stale",
  },
  {
    id: "mnr_a1e552",
    ip: "192.168.39.22",
    make: "MicroBT",
    model: "Whatsminer M60S",
    farm: "HMOTX01",
    status: "online",
    opsStatus: null,
    rebootCount: 2,
    lowHashrateHours: 20,
    hashrateTh: 8.1,
    expectedHashrateTh: 186,
    powerW: 210,
    tempC: 44,
    anomaly: ["power"],
    suspected: "power",
    lastRebootAt: "2026-07-21T22:55:00+08:00",
    reason: "功率远低于正常负载，疑似供电不稳",
  },
  {
    id: "mnr_59f0bb",
    ip: "192.168.39.9",
    make: "Bitmain",
    model: "Antminer S19j Pro",
    farm: "HMOTX01",
    status: "online",
    opsStatus: "maintenance",
    rebootCount: 4,
    lowHashrateHours: 31,
    hashrateTh: 0,
    expectedHashrateTh: 104,
    powerW: 55,
    tempC: 31,
    anomaly: ["hashboard", "power"],
    suspected: "hardware",
    lastRebootAt: "2026-07-22T00:12:00+08:00",
    reason: "连续零算力，hashboard lost 后未恢复",
  },
];

export const causeLabel: Record<SuspectedCause, string> = {
  power: "电源电压",
  hashboard: "算力板",
  hardware: "硬件损坏",
};
