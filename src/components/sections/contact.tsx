"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Calendar,
  Download,
  Send,
  Github,
  Linkedin,
  Dribbble,
  Figma,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { SiX, SiWhatsapp } from "react-icons/si";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function Contact() {
  const { t } = useI18n();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/olaniyiaremu2003@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
            _subject: `Portfolio contact from ${form.name}`,
            _template: "table",
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
      toast.success(t.contact.success);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch {
      const mailto = `mailto:olaniyiaremu2003@gmail.com?subject=Portfolio contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
      window.location.href = mailto;
      toast.success("Opening your email app...");
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/mitchoder07" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/mitchoder07" },
    { icon: SiX, label: "X", href: "https://x.com/mitchoder07" },
    { icon: Dribbble, label: "Dribbble", href: "https://dribbble.com/mitchoder07" },
    { icon: Figma, label: "Figma", href: "https://figma.com/@mitchoder07" },
    { icon: SiWhatsapp, label: "WhatsApp", href: "https://wa.me/2347088955340" },
  ];

  return (
    <section id="contact" className="section-pad relative bg-foreground/[0.015]">
      <div className="container-max">
        <SectionHeading
          badge={t.contact.badge}
          heading={t.contact.heading}
          subheading={t.contact.subheading}
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          {/* Left: Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl glass-strong p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t.contact.nameLabel}
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t.contact.namePlaceholder}
                  className="h-11 rounded-xl bg-background/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t.contact.emailLabel}
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t.contact.emailPlaceholder}
                  className="h-11 rounded-xl bg-background/50"
                />
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t.contact.messageLabel}
              </label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t.contact.messagePlaceholder}
                className="min-h-[140px] rounded-xl bg-background/50"
              />
            </div>

            <Button
              type="submit"
              disabled={sending || sent}
              size="lg"
              className="mt-6 h-12 w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
              data-cursor="pointer"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-400" />
                  {t.contact.success}
                </>
              ) : sending ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                  {t.contact.sending}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {t.contact.send}
                </>
              )}
            </Button>
          </motion.form>

          {/* Right: Direct CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            <a
              href="mailto:olaniyiaremu2003@gmail.com"
              className="group flex items-center gap-3 rounded-2xl glass p-4 transition-all duration-300 hover:border-[var(--neon)]/30 hover:bg-[var(--neon)]/5"
              data-cursor="pointer"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--neon)]/15 text-[var(--neon)] transition-transform duration-300 group-hover:scale-110">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">
                  {t.contact.emailMe}
                </div>
                <div className="text-sm font-semibold">olaniyiaremu2003@gmail.com</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-[var(--neon)]" />
            </a>

            <a
              href="https://wa.me/2347088955340"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl glass p-4 transition-all duration-300 hover:border-[var(--magenta)]/30 hover:bg-[var(--magenta)]/5"
              data-cursor="pointer"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--magenta)]/15 text-[var(--magenta)] transition-transform duration-300 group-hover:scale-110">
                <SiWhatsapp className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">
                  WhatsApp
                </div>
                <div className="text-sm font-semibold">+234 708 895 5340</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-[var(--magenta)]" />
            </a>

            <a
              href="/resume.pdf"
              download="Abdullah-Yusuf-Resume.pdf"
              className="group flex items-center gap-3 rounded-2xl glass p-4 transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5"
              data-cursor="pointer"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground/10 text-foreground transition-transform duration-300 group-hover:scale-110">
                <Download className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">
                  {t.contact.downloadResume}
                </div>
                <div className="text-sm font-semibold">/resume</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            </a>

            {/* Socials */}
            <div className="mt-2">
              <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t.contact.followTitle}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 items-center justify-center gap-2 rounded-xl glass text-xs font-medium transition-all duration-300 hover:border-[var(--neon)]/40 hover:bg-[var(--neon)]/5"
                      data-cursor="pointer"
                      aria-label={s.label}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="hidden sm:inline">{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
