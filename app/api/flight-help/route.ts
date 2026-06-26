import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a UK aviation consumer rights expert. Based on the flight details provided, calculate the exact compensation owed under UK261 regulations (which retained EU261/2004 post-Brexit), draft a formal complaint letter to the airline, and provide a step-by-step escalation guide.

UK261 compensation amounts:
- Flights under 1500km delayed 3+ hrs: £220 per passenger
- Flights 1500-3500km delayed 3+ hrs: £350 per passenger
- Flights over 3500km delayed 4+ hrs: £520 per passenger
- Cancellation under 7 days notice: same as above based on distance
- Denied boarding (involuntary): same as above based on distance
- Baggage: up to £1,300 under Montreal Convention

Important eligibility notes:
- Flight must depart from a UK airport OR be operated by a UK/EU carrier arriving at a UK airport
- Extraordinary circumstances (severe weather, air traffic control strikes, security threats) may exempt the airline
- Delay is measured at final destination arrival time
- Compensation is per passenger
- For delays under 3 hours or cancellations with over 14 days notice, UK261 does not apply but goodwill claims may still be possible

When writing the complaint letter, use the passenger's name, flight details, and be assertive but professional. Reference UK261/2004 and the Montreal Convention where applicable. Include a 14-day response deadline.

Return ONLY valid JSON with no markdown, no code blocks, no extra text, exactly this structure:
{
  "eligible": true or false,
  "reason": "plain English explanation of eligibility and the key legal basis",
  "compensationPerPassenger": number or null,
  "totalCompensation": number or null,
  "strengthOfClaim": "strong" or "medium" or "weak",
  "letter": "full formal complaint letter text with proper line breaks using \\n",
  "nextSteps": ["step 1 description", "step 2 description", "step 3 description", "step 4 description"],
  "escalationPath": "If the airline refuses or ignores your complaint within 8 weeks, you can escalate to [appropriate body] for free dispute resolution.",
  "timeLimit": "6 years from the date of your flight under the Limitation Act 1980 (UK law)"
}`;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const details = [
      `Airline: ${data.airline}`,
      `Flight number: ${data.flightNumber}`,
      `Flight date: ${data.flightDate}`,
      `Issue type: ${data.issueType}`,
      data.issueType === "delay"        ? `Delay duration: ${data.delayDuration}` : "",
      data.issueType === "cancellation" ? `Cancellation notice received: ${data.cancellationNotice}` : "",
      data.issueType === "baggage"      ? `Baggage issue: ${data.baggageIssue}` : "",
      data.issueType === "denied"       ? `Reason denied boarding: ${data.deniedReason}` : "",
      `Booking reference: ${data.bookingRef}`,
      `Route: ${data.departureAirport} → ${data.arrivalAirport}`,
      `Passengers affected: ${data.passengersAffected}`,
      data.offeredCompensation
        ? `Airline already offered: £${data.compensationAmount}`
        : "Airline has not offered any compensation",
      `Passenger name: ${data.name}`,
      `Passenger email: ${data.email}`,
    ].filter(Boolean).join("\n");

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Analyse this flight complaint:\n\n${details}` }],
    });

    const text = message.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("");

    const clean = text
      .replace(/```json[\s\S]*?```|```[\s\S]*?```/g, (t) => t.replace(/```json|```/g, ""))
      .trim();

    const result = JSON.parse(clean);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Flight help error:", error);
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
