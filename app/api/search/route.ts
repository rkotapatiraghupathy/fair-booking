import { NextRequest, NextResponse } from "next/server";
import { generateCarHireResults, generateHotelResults, generateFlightResults } from "@/lib/mockData";
import type { SearchParams } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const params: SearchParams = await request.json();

    let results;
    switch (params.type) {
      case "carhire":
        results = generateCarHireResults(params);
        break;
      case "hotels":
        results = generateHotelResults(params);
        break;
      case "flights":
        results = generateFlightResults(params);
        break;
      default:
        results = generateCarHireResults(params);
    }

    return NextResponse.json({ results, total: results.length });
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
