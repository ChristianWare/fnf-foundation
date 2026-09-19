"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./SimpleForm.module.css";

type Values = {
  website: string; // honeypot — must stay empty
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  groupSize: string;
  message: string;
};

/** Posts to /api/contact, which emails CONTACT_EMAIL. Same contract as before. */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>();

  const onSubmit: SubmitHandler<Values> = async (values) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.honeypot} aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          First name
          <input {...register("firstName", { required: true })} />
          {errors.firstName && <span className={styles.error}>Required</span>}
        </label>
        <label className={styles.field}>
          Last name
          <input {...register("lastName", { required: true })} />
          {errors.lastName && <span className={styles.error}>Required</span>}
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          Email
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <span className={styles.error}>Required</span>}
        </label>
        <label className={styles.field}>
          Phone
          <input type="tel" {...register("phone", { required: true })} />
          {errors.phone && <span className={styles.error}>Required</span>}
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          Service needed
          <select {...register("serviceNeeded")}>
            <option value="">Select…</option>
            <option>Airport transfer</option>
            <option>Corporate travel</option>
            <option>Wedding or event</option>
            <option>Hourly chauffeur</option>
            <option>Other</option>
          </select>
        </label>
        <label className={styles.field}>
          Group size
          <input inputMode="numeric" {...register("groupSize")} />
        </label>
      </div>

      <label className={styles.field}>
        Message
        <textarea {...register("message", { required: true })} />
        {errors.message && <span className={styles.error}>Required</span>}
      </label>

      <button className={styles.btn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </button>

      {status === "sent" && (
        <p className={styles.status}>Thanks. We&apos;ll get back to you shortly.</p>
      )}
      {status === "error" && (
        <p className={styles.error}>
          Something went wrong. Please call or email us instead.
        </p>
      )}
    </form>
  );
}
