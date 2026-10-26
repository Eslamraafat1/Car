"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import PageHeader from "@/components/automotive/PageHeader";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const CONTACT_EMAIL = "hello@aurelis.example";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "required" | "email" | "sent";

export default function ContactView() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (key: keyof typeof form) => (event: { target: { value: string } }) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    if (status !== "idle") setStatus("idle");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, subject, message } = form;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus("required");
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("email");
      return;
    }

    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
    const mailSubject = encodeURIComponent(subject.trim());
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${body}`;
    setStatus("sent");
  };

  const fields = [
    { key: "name", label: C.pages.contact.name, type: "text", required: true, autoComplete: "name" },
    { key: "email", label: C.pages.contact.email, type: "email", required: true, autoComplete: "email" },
    { key: "subject", label: C.pages.contact.subject, type: "text", required: true, autoComplete: "off" },
  ] as const;

  const inputClass =
    "mt-2 w-full rounded-xl border border-line bg-ink px-4 py-3 text-[0.92rem] text-fog outline-none transition-colors duration-300 placeholder:text-dim focus:border-volt";

  return (
    <>
      <PageHeader
        eyebrow={C.pages.contact.eyebrow}
        title={C.pages.contact.title}
        body={C.pages.contact.body}
      />

      <section className="contact-studio relative isolate overflow-hidden bg-ink py-16 lg:py-24" aria-label={t(C.pages.contact.eyebrow)}>
        <div className="pointer-events-none absolute -end-32 top-20 size-[32rem] rounded-full border border-[#75d6c3]/10" aria-hidden="true" />
        <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} noValidate className="rounded-[24px] hairline bg-ink-2 p-6 lg:p-8">
              <div className="mb-7 flex items-center justify-between gap-4 border-b border-line pb-5">
                <div><p className="eyebrow text-[#75d6c3]">AURELIS / INBOX</p><p className="mt-2 text-sm text-mist">{t({ ar: "رسالة واحدة كفاية لبدء حكاية.", en: "One note is all it takes to start a story." })}</p></div>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#75d6c3]/35 text-[#75d6c3]"><Mail className="size-4" aria-hidden="true" /></span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className={field.key === "subject" ? "sm:col-span-2" : undefined}
                  >
                    <label
                      htmlFor={`contact-${field.key}`}
                      className="text-[0.78rem] tracking-wider text-dim"
                    >
                      {t(field.label)}
                      {field.required && <span className="ms-1 text-volt">*</span>}
                    </label>
                    <input
                      id={`contact-${field.key}`}
                      name={field.key}
                      type={field.type}
                      required={field.required}
                      autoComplete={field.autoComplete}
                      value={form[field.key]}
                      onChange={update(field.key)}
                      className={inputClass}
                    />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-message"
                    className="text-[0.78rem] tracking-wider text-dim"
                  >
                    {t(C.pages.contact.message)}
                    <span className="ms-1 text-volt">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </div>

              <div
                className="mt-5 min-h-6"
                role={status === "idle" ? undefined : "status"}
                aria-live="polite"
              >
                {status === "required" && (
                  <p className="text-[0.82rem] text-ember">{t(C.pages.contact.errorRequired)}</p>
                )}
                {status === "email" && (
                  <p className="text-[0.82rem] text-ember">{t(C.pages.contact.errorEmail)}</p>
                )}
                {status === "sent" && (
                  <p className="text-[0.82rem] text-volt">{t(C.pages.contact.sent)}</p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fog px-7 text-[0.88rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                >
                  {t(C.pages.contact.submit)}
                </button>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-[0.85rem] text-mist underline-offset-4 transition-colors duration-300 hover:text-fog hover:underline"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {t(C.pages.contact.mailTo)}
                </a>
              </div>

              <p className="mt-6 border-t border-line pt-5 text-[0.75rem] leading-relaxed text-dim">
                {t(C.pages.contact.demoNote)}
              </p>
            </form>
          </div>

          <aside className="flex flex-col gap-5 lg:col-span-5">
            <div className="contact-art overflow-hidden rounded-[24px] border border-[#75d6c3]/20">
              <div className="relative aspect-[16/10]">
                <ImagePlaceholder />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-[#75d6c3]/10" />
                <span className="absolute start-5 top-5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[0.62rem] tracking-[0.2em] text-white/80 backdrop-blur-md">AURELIS / STUDIO</span>
                <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3"><span className="eyebrow text-white/75">{t(C.pages.contact.studio)}</span><span className="size-2 rounded-full bg-[#75d6c3] shadow-[0_0_18px_rgba(117,214,195,.9)]" /></span>
              </div>
            </div>

            <dl className="relative rounded-[24px] border border-[#75d6c3]/15 bg-[#0b1212] p-6">
              <div className="border-b border-line pb-4">
                <dt className="text-[0.72rem] tracking-wider text-dim">
                  {t(C.pages.contact.studio)}
                </dt>
                <dd className="mt-1 font-display text-[0.95rem] text-fog">
                  {t(C.pages.contact.studioValue)}
                </dd>
              </div>
              <div className="pt-4">
                <dt className="text-[0.72rem] tracking-wider text-dim">
                  {t(C.pages.contact.hours)}
                </dt>
                <dd className="mt-1 font-display text-[0.95rem] text-fog">
                  {t(C.pages.contact.hoursValue)}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

    </>
  );
}

function ImagePlaceholder() {
  return (
    <Image
      src="/media/images/night-city.jpg"
      alt=""
      fill
      sizes="(min-width: 1024px) 40vw, 100vw"
      className="object-cover"
      loading="lazy"
    />
  );
}
