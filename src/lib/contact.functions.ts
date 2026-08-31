import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appendInquiryRow } from "./google-sheets";

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

// Poptávky se ukládají do Google Sheets přímo přes servisní účet (Service
// Account) — viz src/lib/google-sheets.ts a scripts/README-google-sheets.md
// pro nastavení. Tři proměnné prostředí: GOOGLE_SERVICE_ACCOUNT_EMAIL,
// GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, GOOGLE_SHEET_ID — nastavují se na
// Vercelu, ne přímo v kódu. (Dřívější řešení přes Google Apps Script webhook
// bylo nahrazeno — permission dropdowny v Apps Scriptu se ukázaly jako
// nespolehlivé napříč různými Google účty.)
//
// Notifikace o nové poptávce: Lucie si ji nastaví přímo v Sheets (Nástroje →
// Oznámení o pravidlech), žádný kód pro to není potřeba.
export const submitInquiry = createServerFn({ method: "POST" })
  .validator(inquirySchema)
  .handler(async ({ data }): Promise<InquiryResult> => {
    if (data.company) {
      return { ok: true };
    }

    if (
      !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ||
      !process.env.GOOGLE_SHEET_ID
    ) {
      console.error(
        "submitInquiry: GOOGLE_SERVICE_ACCOUNT_EMAIL/GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY/GOOGLE_SHEET_ID is not set — cannot record the inquiry.",
      );
      return { ok: false, error: "config" };
    }

    try {
      await appendInquiryRow(data);
      return { ok: true };
    } catch (error) {
      console.error("submitInquiry: failed to write the inquiry to Google Sheets", error);
      return { ok: false, error: "send" };
    }
  });
