import nodemailer from "nodemailer";
import { welcomeHtml, welcomeText } from "./templates/welcome";
import { SITE } from "@/config/site";

const BRAND = SITE.name;
const CONTACT_FROM = process.env.CONTACT_FROM || process.env.SMTP_USER;

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export async function sendWelcomeEmail(to: string, name?: string | null) {
  requireEnv("SMTP_HOST");
  requireEnv("SMTP_PORT");
  requireEnv("SMTP_USER");
  requireEnv("SMTP_PASS");
  if (!CONTACT_FROM) throw new Error("CONTACT_FROM or SMTP_USER must be set");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT!),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  await transporter.sendMail({
    from: `${BRAND} <${CONTACT_FROM}>`,
    to,
    subject: `Welcome to ${SITE.name} 🎉`,
    html: welcomeHtml(name),
    text: welcomeText(name),
    headers: {
      "X-Website": BRAND,
      "X-Email-Type": "welcome",
    },
  });
}
