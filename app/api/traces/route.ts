import { NextResponse } from "next/server";

const SELINE_API = "https://api.seline.com/api/v1";
const SELINE_TOKEN = process.env.SELINE_API_TOKEN;

const TRACKED_PAGES = ["/", "/films", "/reading", "/photographs"];

type TraceState = "none" | "light" | "medium" | "strong";

interface TraceData {
  state: TraceState;
  views: number;
}

interface TraceMap {
  [pathname: string]: TraceData;
}

function viewsToState(views: number): TraceState {
  if (views < 5) return "none";
  if (views < 15) return "light";
  if (views < 40) return "medium";
  return "strong";
}

async function getPageViews(page: string): Promise<number> {
  if (!SELINE_TOKEN) return 0;

  try {
    const response = await fetch(`${SELINE_API}/visit-metrics`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SELINE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        period: "30d",
        filters: {
          page: `is:${page}`,
        },
      }),
    });

    if (!response.ok) return 0;

    const data = await response.json();
    return parseInt(data.views?.value || "0", 10);
  } catch {
    return 0;
  }
}

export async function GET() {
  if (!SELINE_TOKEN) {
    return NextResponse.json({ traces: {} }, { status: 200 });
  }

  try {
    const results = await Promise.all(
      TRACKED_PAGES.map(async (page) => {
        const views = await getPageViews(page);
        return { page, views };
      }),
    );

    const traces: TraceMap = {};
    for (const { page, views } of results) {
      traces[page] = { state: viewsToState(views), views };
    }

    console.log("traces", traces);

    return NextResponse.json(
      { traces },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch traces:", error);
    return NextResponse.json({ traces: {} }, { status: 200 });
  }
}
