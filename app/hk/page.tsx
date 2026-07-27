"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";

const WECHAT_ID = "AshuChan";
const CAL_URL = "https://cal.com/0xashu";
const NONCE_URL = "https://nonce.app";

type Locale = "zh" | "en";

const copy = {
  zh: {
    back: "返回",
    switchTo: "EN",
    introBefore: "我们正在经营",
    introAfter:
      "—— 管理全球 5% Bitcoin 算力，主要服务北美上市的矿企，在分布式数据中心和算电协同上拥有多年经验。",
    about: "关于",
    aboutBody:
      "我是 Ashu，10 年的产品管理和创业经验。我做过加密货币钱包 imToken (20M users, B series)，链上数据 Mest (Acquired)，目前 Nonce 是我的第三个产品。",
    more: "了解更多",
    letsTalk: "可以聊聊",
    lookingFor: "01 / 在找",
    alsoOpenTo: "02 / 也聊",
    lookingForItems: [
      "AIDC 基础设施与场地资源",
      "电力与算力协同的合作机会",
      "液冷 / 供电 / 选址等落地经验",
    ],
    alsoOpenToItems: [
      "分布式矿场运维经验如何迁移到 AIDC？",
      "AI 时代，我们需要什么样的产品？",
      "Web3 产品与创业经验",
      "加密货币钱包的核心竞争力是什么？",
    ],
    footerNote: "👋 欢迎联系，如果你对算电协同业务感兴趣。",
    coffeeChat: "Coffee Chat",
    coffeeDesc:
      "加好友可备注来自 Money Frontier，我们可以在香港约见面，或线上聊。",
    copyId: "复制微信号",
    copied: "已复制",
    chatOnline: "线上闲聊",
    chatOnlineAria: "线上闲聊，在新标签页打开",
  },
  en: {
    back: "Back",
    switchTo: "中",
    introBefore: "We run",
    introAfter:
      "— managing ~5% of global Bitcoin hashrate, mainly serving North-American listed miners, with years in distributed data centers and power–compute coordination.",
    about: "About",
    aboutBody:
      "I'm Ashu — 10 years in product and startup. Built crypto wallet imToken (20M users, Series B), on-chain data product Mest (Acquired), and Nonce is my third.",
    more: "More",
    letsTalk: "Let's talk",
    lookingFor: "01 / Looking for",
    alsoOpenTo: "02 / Also open to",
    lookingForItems: [
      "AIDC infrastructure & site partners",
      "Power × compute collaboration",
      "Liquid cooling / power / siting experience",
    ],
    alsoOpenToItems: [
      "How mining ops transfer to AIDC",
      "What products do we need in the AI era?",
      "Web3 product & founding experience",
      "What makes a crypto wallet defensible?",
    ],
    footerNote: "Happy to connect if you care about power–compute coordination.",
    coffeeChat: "Coffee Chat",
    coffeeDesc:
      "Add me on WeChat — mention Money Frontier. We can meet in Hong Kong or schedule online.",
    copyId: "Copy ID",
    copied: "Copied",
    chatOnline: "Chat online",
    chatOnlineAria: "Chat online, opens in a new tab",
  },
} as const;

function ExternalIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="size-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.5 11.5 4.5M6.5 4.5h5v5" />
    </svg>
  );
}

export default function HkPage() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = copy[locale];

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Keep drawer open so the ID remains visible to copy manually.
    }
  };

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100 pb-[calc(8rem+env(safe-area-inset-bottom,0px))] sm:pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="mx-auto max-w-2xl px-5 pt-[calc(1.25rem+env(safe-area-inset-top,0px))] sm:px-8 sm:pt-[calc(2.5rem+env(safe-area-inset-top,0px))] md:px-12">
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <Link
            href="/"
            className="font-mono text-[13px] text-zinc-500 transition-colors hover:text-zinc-100"
          >
            {t.back}
          </Link>
          <button
            type="button"
            onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
            className="font-mono text-[13px] text-zinc-500 transition-colors hover:text-zinc-100"
            aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}
          >
            {t.switchTo}
          </button>
        </div>

        <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 sm:mb-3 sm:text-xs">
          HK Money Frontier 2026
        </p>

        <h1 className="text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Ashu.
        </h1>

        <div className="mt-5 max-w-lg sm:mt-6">
          <p className="text-[0.9375rem] leading-[1.75] text-zinc-400 sm:text-base sm:leading-relaxed">
            {t.introBefore}{" "}
            <a
              href={NONCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 underline decoration-zinc-600 underline-offset-4 transition-colors hover:decoration-zinc-200"
            >
              Nonce
            </a>{" "}
            {t.introAfter}
          </p>

          <div className="mt-7 sm:mt-8">
            <p className="mb-2.5 font-mono text-[11px] text-zinc-500">
              {t.about}
            </p>
            <p className="text-[0.9375rem] leading-[1.75] text-zinc-400 sm:text-base sm:leading-relaxed">
              {t.aboutBody}
              <Link
                href="/"
                className="ml-1 whitespace-nowrap text-zinc-200 underline decoration-zinc-600 underline-offset-4 transition-colors hover:decoration-zinc-200"
              >
                {t.more}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <hr className="mt-9 border-0 border-t border-zinc-800 sm:mt-14" />

      <section className="mx-auto max-w-2xl px-5 pt-6 sm:px-8 sm:pt-8 md:px-12">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 sm:mb-8 sm:text-xs">
          {t.letsTalk}
        </p>

        <div className="grid max-w-lg gap-7 sm:gap-10">
          <div>
            <p className="mb-2.5 font-mono text-[11px] text-zinc-500">
              {t.lookingFor}
            </p>
            <ul className="divide-y divide-zinc-800">
              {t.lookingForItems.map((item) => (
                <li
                  key={item}
                  className="py-2.5 text-[0.9375rem] leading-snug text-zinc-100 first:pt-0 last:pb-0 sm:py-3 sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2.5 font-mono text-[11px] text-zinc-500">
              {t.alsoOpenTo}
            </p>
            <ul className="divide-y divide-zinc-800">
              {t.alsoOpenToItems.map((item) => (
                <li
                  key={item}
                  className="py-2.5 text-[0.9375rem] leading-snug text-zinc-400 first:pt-0 last:pb-0 sm:py-3 sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 mb-6 text-[0.875rem] leading-relaxed text-zinc-500 sm:mb-8">
              {t.footerNote}
            </p>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-zinc-800/80 bg-zinc-950/95 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/85">
        <div className="mx-auto flex max-w-2xl gap-2 px-5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] pt-2.5 sm:px-8 sm:pt-3 md:px-12">
          <div className="min-w-0 flex-1">
            <Drawer.Root
              open={open}
              onOpenChange={(next) => {
                setOpen(next);
                if (!next) setCopied(false);
              }}
            >
              <Drawer.Trigger asChild>
                <button
                  type="button"
                  className="inline-flex h-12 w-full touch-manipulation items-center justify-center bg-zinc-100 text-[15px] font-medium text-zinc-950 transition-opacity hover:opacity-80 active:opacity-70"
                >
                  {t.coffeeChat}
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-40 bg-black/60" />
                <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-lg flex-col rounded-t-2xl bg-zinc-900 outline-none sm:max-w-xl">
                  <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-zinc-700" />
                  <div className="px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pt-5 sm:px-8">
                    <Drawer.Title className="text-lg font-semibold tracking-tight text-zinc-100">
                      {t.coffeeChat}
                    </Drawer.Title>
                    <Drawer.Description className="mt-2 text-[0.9375rem] leading-relaxed text-zinc-400">
                      {t.coffeeDesc}
                    </Drawer.Description>

                    <div className="mt-5 flex flex-col gap-3 rounded-lg border border-zinc-700 bg-zinc-950 p-4 sm:flex-row sm:items-center">
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                          WeChat
                        </p>
                        <p className="mt-1 select-all text-xl font-medium tracking-wide text-zinc-100 sm:text-lg">
                          {WECHAT_ID}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={copyWechat}
                        className="inline-flex h-12 w-full touch-manipulation items-center justify-center rounded-md bg-zinc-100 text-[15px] font-medium text-zinc-950 transition-opacity hover:opacity-80 sm:h-11 sm:w-auto sm:shrink-0 sm:px-5"
                      >
                        {copied ? t.copied : t.copyId}
                      </button>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>

          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.chatOnlineAria}
            className="inline-flex h-12 min-w-0 flex-1 touch-manipulation items-center justify-center gap-1.5 border border-zinc-700 bg-transparent text-[15px] font-medium text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 active:bg-zinc-100 active:text-zinc-950"
          >
            {t.chatOnline}
            <ExternalIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
