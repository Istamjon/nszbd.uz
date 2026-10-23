"use client";

import * as React from "react";
import { Send, Phone, Mail, MapPin, Clock, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function ContactSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          message: form.message,
          source: "Bog'lanish bo'limi (Aloqa formasi)",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || dict.contact.errorMessage);
      }

      setSubmitted(true);
      setForm({ fullName: "", phone: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : dict.contact.sendError;
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Form Card (stretched to equal height) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#041438] p-6 sm:p-10 border border-slate-200 dark:border-slate-800 rounded-md flex flex-col justify-between h-full">
          <div>
            <div className="mb-8">
              <span className="text-xs font-semibold text-[#D19C30] uppercase tracking-wider block mb-1">
                {dict.contact.title}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#010c22] dark:text-white">
                {dict.contact.subtitle}
              </h2>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs rounded-md flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {submitted ? (
              <div className="py-16 text-center">
                <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {dict.applyModal.success}
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    {dict.contact.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder={dict.contact.namePlaceholder}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#010c22] text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D19C30] transition-colors rounded-md"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      {dict.contact.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+998 90 123 45 67"
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#010c22] text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D19C30] transition-colors rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      {dict.contact.email}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="info@kompaniya.uz"
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#010c22] text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D19C30] transition-colors rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    {dict.contact.message} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={dict.contact.msgPlaceholder}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#010c22] text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D19C30] transition-colors rounded-md resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 font-bold text-white bg-[#D19C30] hover:bg-[#b88523] active:scale-[0.99] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-70 text-sm rounded-md"
                >
                  {loading ? (
                    dict.applyModal.sending
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{dict.contact.send}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Information Card (stretched to equal height) */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="bg-[#010c22] text-white p-6 sm:p-10 border border-slate-800 rounded-md flex flex-col justify-between h-full flex-1">
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-8 pb-4 border-b border-slate-800 text-white">
                {dict.contact.infoTitle}
              </h3>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="text-[#D19C30] shrink-0 mt-1 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium mb-0.5">
                      {dict.contact.address}
                    </span>
                    <span className="text-slate-100 font-semibold leading-relaxed">
                      {dict.topbar.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-[#D19C30] shrink-0 mt-1 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium mb-0.5">
                      {dict.contact.workingHours}
                    </span>
                    <span className="text-slate-100 font-semibold">
                      {dict.contact.workingHoursVal}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {dict.contact.lunch}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-[#D19C30] shrink-0 mt-1 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium mb-0.5">
                      {dict.contact.receptionDays}
                    </span>
                    <span className="text-slate-100 font-semibold">
                      {dict.contact.receptionDaysVal}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-[#D19C30] shrink-0 mt-1 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium mb-0.5">
                      {dict.contact.phoneLabel}
                    </span>
                    <a
                      href="tel:+998792232877"
                      className="text-slate-100 font-semibold hover:text-[#D19C30] transition-colors"
                    >
                      +998 79 223-28-77
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-[#D19C30] shrink-0 mt-1 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium mb-0.5">
                      {dict.contact.emailLabel}
                    </span>
                    <a
                      href="mailto:ksznavoiy@umail.uz"
                      className="text-slate-100 font-semibold hover:text-[#D19C30] transition-colors"
                    >
                      ksznavoiy@umail.uz
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
