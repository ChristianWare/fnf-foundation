import { Resend } from "resend";
import { SITE } from "@/config/site";

export async function sendAdminNotificationEmail(args: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.EMAIL_FROM ||
    `${SITE.name} <${SITE.email.noReply}>`;

  if (!apiKey) throw new Error("RESEND_API_KEY missing");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to: args.to,
    subject: args.subject,
    text: args.text,
    ...(args.html && { html: args.html }),
  });
}
