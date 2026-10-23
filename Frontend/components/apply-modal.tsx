"use client";

import * as React from "react";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export function ApplyModal({ isOpen, onClose, locale }: ApplyModalProps) {
  const dict = getDictionary(locale);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          source: "Ariza topshirish (Modal oyna)",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || dict.applyModal.errorMessage);
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({ fullName: "", phone: "", email: "", message: "" });
      }, 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : dict.applyModal.sendError;
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-md cursor-pointer"
          aria-label={dict.applyModal.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#010c22] dark:text-white">
            {dict.applyModal.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {dict.applyModal.subtitle}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs rounded-md flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {success ? (
          <div className="py-8 text-center animate-in fade-in duration-300">
            <CheckCircle2 className="w-14 h-14 mx-auto text-emerald-500 mb-3" />
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {dict.applyModal.success}
            </h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                {dict.applyModal.fullName} *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Rustam Karimov"
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#010c22] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D19C30] transition-colors rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  {dict.applyModal.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={dict.applyModal.phonePlaceholder}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#010c22] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D19C30] transition-colors rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  {dict.applyModal.email}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={dict.applyModal.emailPlaceholder}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#010c22] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D19C30] transition-colors rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                {dict.applyModal.message} *
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={dict.applyModal.msgPlaceholder}
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#010c22] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D19C30] transition-colors rounded-md resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-6 font-semibold text-white bg-[#D19C30] hover:bg-[#b88523] active:scale-[0.99] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-70 rounded-md"
            >
              {loading ? (
                dict.applyModal.sending
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{dict.applyModal.send}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
