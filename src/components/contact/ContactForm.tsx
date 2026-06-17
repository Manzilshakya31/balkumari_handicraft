"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setState("success");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="bg-white rounded-2xl p-10 border border-brand-gold/15 text-center">
        <CheckCircle
          size={48}
          className="text-green-500 mx-auto mb-4"
          aria-hidden="true"
        />
        <h3 className="font-serif font-bold text-brand-brown text-xl mb-2">
          Message Sent
        </h3>
        <p className="text-muted-foreground text-sm">
          Thank you for reaching out. We will get back to you within 24 hours.
          For faster response, contact us on WhatsApp.
        </p>
      </div>
    );
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-brand-brown mb-1.5"
          >
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
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-brand-brown mb-1.5"
          >
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
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-brand-brown mb-1.5"
        >
          Phone / WhatsApp
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 234 567 8900"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-brand-brown mb-1.5"
        >
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
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-brand-brown mb-1.5"
        >
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
        />
      </div>

      {state === "error" && (
        <p
          className="text-sm text-red-600 bg-red-50 rounded-lg p-3"
          role="alert"
        >
          Something went wrong. Please try WhatsApp for a faster response.
        </p>
      )}

      <Button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-xl h-11 bg-brand-maroon
          hover:bg-brand-maroon-dark text-white font-semibold
          text-sm gap-2 disabled:opacity-60"
      >
        {state === "submitting" ? (
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
          href="https://wa.me/9779818706474"
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
