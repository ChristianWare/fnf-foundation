"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { submitCorporateInquiry } from "../../../../actions/corporate/submitCorporateInquiry";
import styles from "./SimpleForm.module.css";

type Values = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  estimatedMonthlyRides: string;
  message: string;
};

/**
 * Creates a CorporateInquiry the admin reviews under Admin → Corporate →
 * Inquiries. On approval the contact is invited to the corporate portal.
 */
export default function CorporateInquiryForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>();

  const onSubmit: SubmitHandler<Values> = async (values) => {
    setStatus("idle");
    setServerError(null);
    try {
      const result = await submitCorporateInquiry(values);
      if (result && typeof result === "object" && "error" in result && result.error) {
        setServerError(String(result.error));
        setStatus("error");
        return;
      }
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          Company
          <input {...register("companyName", { required: true })} />
          {errors.companyName && <span className={styles.error}>Required</span>}
        </label>
        <label className={styles.field}>
          Your name
          <input {...register("contactName", { required: true })} />
          {errors.contactName && <span className={styles.error}>Required</span>}
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          Work email
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <span className={styles.error}>Required</span>}
        </label>
        <label className={styles.field}>
          Phone
          <input type="tel" {...register("phone")} />
        </label>
      </div>

      <label className={styles.field}>
        Estimated rides per month
        <select {...register("estimatedMonthlyRides", { required: true })}>
          <option value="">Select…</option>
          <option value="1-5">1–5</option>
          <option value="6-20">6–20</option>
          <option value="21-50">21–50</option>
          <option value="50+">50+</option>
        </select>
        {errors.estimatedMonthlyRides && (
          <span className={styles.error}>Required</span>
        )}
      </label>

      <label className={styles.field}>
        Tell us about your travel needs
        <textarea {...register("message", { required: true })} />
        {errors.message && <span className={styles.error}>Required</span>}
      </label>

      <button className={styles.btn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Request a corporate account"}
      </button>

      {status === "sent" && (
        <p className={styles.status}>
          Thanks. We&apos;ll review your request and follow up by email.
        </p>
      )}
      {status === "error" && (
        <p className={styles.error}>
          {serverError ?? "Something went wrong. Please try again or contact us."}
        </p>
      )}
    </form>
  );
}
