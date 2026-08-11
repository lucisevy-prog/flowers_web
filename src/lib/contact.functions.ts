import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Zadejte prosím jméno."),
  email: z.string().trim().email("Zadejte prosím platný e-mail."),
  phone: z.string().trim().optional().default(""),
  eventDate: z.string().trim().optional().default(""),
  experience: z.string().trim().optional().default(""),
  occasion: z.string().trim().optional().default(""),
  guestCount: z.string().trim().optional().default(""),
  location: z.string().trim().optional().default(""),
  message: z.string().trim().optional().default(""),
  // Honeypot: visually hidden from real visitors (see the "company" field in
  // the forms), so a non-empty value here almost always means a bot filled
  // every field it could find. We report success without recording it, so
  // the bot doesn't learn the field is being checked.
  company: z.string().optional().default(""),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
export type InquiryResult = { ok: true } | { ok: false; error: "config" | "send" };

// Poptávky se ukládají do Google Sheets a zároveň se odesílá upozornění na
// Gmail — obojí obstarává jeden Google Apps Script webhook (viz
// scripts/apps-script-inquiry-webhook.gs). Tyhle dvě proměnné jsou
// INQUIRY_SHEET_WEBHOOK_URL (URL nasazené webové aplikace, končí na /exec) a
// INQUIRY_SHEET_WEBHOOK_SECRET (sdílené heslo, které skript ověřuje) —
// nastavují se jako Cloudflare secrets, ne přímo v kódu.
export const submitInquiry = createServerFn({ method: "POST" })
  .validator(inquirySchema)
  .handler(async ({ data }): Promise<InquiryResult> => {
    if (data.company) {
      return { ok: true };
    }

    const webhookUrl = process.env.INQUIRY_SHEET_WEBHOOK_URL;
    const secret = process.env.INQUIRY_SHEET_WEBHOOK_SECRET;
    if (!webhookUrl || !secret) {
      console.error(
        "submitInquiry: INQUIRY_SHEET_WEBHOOK_URL/INQUIRY_SHEET_WEBHOOK_SECRET is not set — cannot record the inquiry.",
      );
      return { ok: false, error: "config" };
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, secret }),
      });
      if (!response.ok) {
        console.error(
          "submitInquiry: webhook responded with",
          response.status,
          await response.text().catch(() => ""),
        );
        return { ok: false, error: "send" };
      }
      const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (!result?.ok) {
        console.error("submitInquiry: webhook reported failure", result);
        return { ok: false, error: "send" };
      }
      return { ok: true };
    } catch (error) {
      console.error("submitInquiry: failed to call the inquiry webhook", error);
      return { ok: false, error: "send" };
    }
  });
