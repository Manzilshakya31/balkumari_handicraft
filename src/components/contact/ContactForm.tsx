"use client";

import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/data/site-config";

type Toast = { type: "success" | "error"; message: string } | null;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(id);
  }, [toast]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name,
          email,
          phone,
          subject,
          message,
          replyto: email,
          from_name: name,
        }),
      });

      const data = await res.json();

      if (data.success === true) {
        setToast({ type: "success", message: "Message sent! We will get back to you within 24 hours." });
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        setToast({ type: "error", message: data.message || "Submission failed. Please try again." });
      }
    } catch (err) {
      setToast({
        type: "error",
        message: err instanceof Error ? err.message : "Network error. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = cn(
    "w-full px-4 py-3 text-sm bg-white border rounded-xl",
    "border-brand-gold/20 focus:outline-none focus:border-brand-gold",
    "focus:ring-2 focus:ring-brand-gold/20 placeholder:text-muted-foreground/50",
    "transition-all duration-200 text-brand-brown"
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 md:p-8 border border-brand-gold/15 space-y-4"
      noValidate
      aria-label="Contact form"
    >
      {toast && (
        <div
          role="alert"
          className={cn(
            "rounded-lg px-4 py-3 text-sm font-medium",
            toast.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          )}
        >
          {toast.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-brown mb-1.5">
            Your Name <span className="text-brand-maroon">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Smith"
            className={inputClass}
            aria-required="true"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-brown mb-1.5">
            Email Address <span className="text-brand-maroon">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className={inputClass}
            aria-required="true"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-brand-brown mb-1.5">
          Phone / WhatsApp
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 234 567 8900"
          className={inputClass}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-brand-brown mb-1.5">
          Subject <span className="text-brand-maroon">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="Inquiry about Buddha statue"
          className={inputClass}
          aria-required="true"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-brown mb-1.5">
          Message <span className="text-brand-maroon">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us what you are looking for..."
          className={cn(inputClass, "resize-none")}
          aria-required="true"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl h-11 bg-brand-maroon
          hover:bg-brand-maroon-dark text-white font-semibold
          text-sm gap-2 disabled:opacity-60"
      >
        {submitting ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <Send size={15} />
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        For immediate response, use{" "}
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-gold-dark hover:underline"
        >
          WhatsApp
        </a>
      </p>
    </form>
  );
}
