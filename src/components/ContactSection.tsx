import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  validateContactForm,
  type ContactFormValues,
  type ContactValidationErrors,
} from '../utils/contactValidation';

interface SubmissionConfirmation {
  id: string;
  recipient: string;
  deliveryChannel: string;
  message: string;
  senderName: string;
  senderEmail: string;
  senderMessage: string;
}

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [touched, setTouched] = useState<Record<keyof ContactFormValues, boolean>>({
    name: false,
    email: false,
    phone: false,
    message: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<SubmissionConfirmation | null>(null);

  const whatsappHref = buildWhatsAppUrl(
    PORTFOLIO_OWNER.whatsappDigits,
    values.name || confirmation?.senderName,
    values.message || confirmation?.senderMessage,
  );

  const handleFieldChange = (field: keyof ContactFormValues, nextValue: string) => {
    const nextValues = { ...values, [field]: nextValue };
    setValues(nextValues);
    setSubmitError(null);

    if (touched[field] || errors[field]) {
      const check = validateContactForm(nextValues);
      setErrors((prev) => ({
        ...prev,
        [field]: check.errors[field],
      }));
    }
  };

  const handleFieldBlur = (field: keyof ContactFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const check = validateContactForm(values);
    setErrors((prev) => ({
      ...prev,
      [field]: check.errors[field],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const check = validateContactForm(values);
    setTouched({ name: true, email: true, phone: true, message: true });

    if (!check.isValid) {
      setErrors(check.errors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(check.sanitized),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data?.errors && typeof data.errors === 'object') {
          setErrors(data.errors as ContactValidationErrors);
        }
        setSubmitError(
          data?.error || 'Could not send your message right now. Please review your entries.',
        );
        return;
      }

      setConfirmation({
        id: String(data.id),
        recipient: String(data.recipient || PORTFOLIO_OWNER.email),
        deliveryChannel: String(data.deliveryChannel || 'recorded'),
        message: String(data.message),
        senderName: check.sanitized.name,
        senderEmail: check.sanitized.email,
        senderMessage: check.sanitized.message,
      });
      setValues(INITIAL_VALUES);
      setTouched({ name: false, email: false, phone: false, message: false });
    } catch {
      setSubmitError(
        'Network error while sending your message. You can retry or reach me directly via WhatsApp or email.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmation(null);
    setSubmitError(null);
    setErrors({});
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-[rgba(242,236,225,0.1)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Channels & WhatsApp Composer */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <p className="text-xs font-medium text-[#E09F3E] tracking-wide mb-3">
                04. Contact Me
              </p>
              <h2
                className="font-display text-3xl md:text-4xl font-semibold text-[#F2ECE1] tracking-tight leading-[1.16] mb-4"
                style={{ textWrap: 'balance' }}
              >
                Let&apos;s connect on a project or coursework idea.
              </h2>
              <p className="text-sm md:text-[15px] text-[#B5ADA0] leading-relaxed">
                Send a message through the validated contact form to notify me at{' '}
                <span className="text-[#F2ECE1] font-medium">{PORTFOLIO_OWNER.email}</span>, or
                start a direct WhatsApp conversation right away.
              </p>
            </div>

            {/* Direct WhatsApp Card */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="paper-card hover:border-[#7FA68A]/50 transition-colors rounded-xl p-6 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-[#7FA68A] font-medium mb-1">Direct WhatsApp</p>
                  <p className="font-display text-xl font-semibold text-[#F2ECE1]">
                    {PORTFOLIO_OWNER.whatsappDisplay}
                  </p>
                </div>
                <MessageCircle className="w-5 h-5 text-[#7FA68A] shrink-0" aria-hidden="true" />
              </div>

              <p className="text-xs leading-relaxed text-[#B5ADA0]">
                Anything you draft in the message box on the right will automatically pre-fill
                into your WhatsApp chat link.
              </p>

              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#121110] bg-[#7FA68A] hover:bg-[#91b69b] rounded-md transition-colors duration-150 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Message on WhatsApp</span>
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </motion.a>
            </motion.div>

            {/* Direct Email & Links */}
            <div className="paper-card rounded-xl p-6 divide-y divide-[rgba(242,236,225,0.1)] text-sm">
              <div className="pb-3 flex items-center justify-between gap-3">
                <span className="text-[#8C8478]">Email</span>
                <a
                  href={`mailto:${PORTFOLIO_OWNER.email}`}
                  className="inline-flex items-center gap-1.5 text-[#F2ECE1] hover:text-[#E09F3E] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E09F3E]" aria-hidden="true" />
                  <span>{PORTFOLIO_OWNER.email}</span>
                </a>
              </div>
              <div className="py-3 flex items-center justify-between gap-3">
                <span className="text-[#8C8478]">LinkedIn</span>
                <a
                  href={PORTFOLIO_OWNER.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[#F2ECE1] hover:text-[#E09F3E] transition-colors"
                >
                  <span>aashirya-srivastava</span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
              <div className="pt-3 flex items-center justify-between gap-3">
                <span className="text-[#8C8478]">GitHub</span>
                <a
                  href={PORTFOLIO_OWNER.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[#F2ECE1] hover:text-[#E09F3E] transition-colors"
                >
                  <span>github.com</span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Validated Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="paper-card-elevated rounded-xl p-6 md:p-8">
              {confirmation ? (
                <div role="status" aria-live="polite" className="space-y-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-[#7FA68A] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-[#F2ECE1] mb-1">
                        Thank you, {confirmation.senderName}.
                      </h3>
                      <p className="text-sm text-[#B5ADA0] leading-relaxed">
                        {confirmation.message}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#121110] border border-[rgba(242,236,225,0.12)] p-4 text-sm space-y-2">
                    <div className="flex items-center justify-between gap-3 text-xs text-[#8C8478]">
                      <span>Recipient</span>
                      <span className="text-[#F2ECE1]">{confirmation.recipient}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-xs text-[#8C8478]">
                      <span>Reply-To</span>
                      <span className="text-[#F2ECE1]">{confirmation.senderEmail}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-xs text-[#8C8478]">
                      <span>Reference</span>
                      <span className="font-mono-tabular text-[#E09F3E]">{confirmation.id}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2.5 text-sm font-semibold text-[#121110] bg-[#E09F3E] hover:bg-[#e8ae54] rounded-md transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>

                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[#F2ECE1] border border-[rgba(242,236,225,0.2)] hover:border-[#7FA68A] rounded-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#7FA68A]" aria-hidden="true" />
                      <span>Follow up on WhatsApp</span>
                    </a>

                    <a
                      href={buildMailtoUrl(
                        PORTFOLIO_OWNER.email,
                        confirmation.senderName,
                        confirmation.senderEmail,
                        confirmation.senderMessage,
                      )}
                      className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-[#B5ADA0] hover:text-[#E09F3E] transition-colors"
                    >
                      <span>Open in Mail app</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-[rgba(242,236,225,0.1)] pb-4">
                    <h3 className="font-display text-xl font-semibold text-[#F2ECE1]">
                      Send a Note
                    </h3>
                    <p className="text-xs text-[#8C8478] mt-1">
                      All required fields are verified before dispatching notification to{' '}
                      {PORTFOLIO_OWNER.email}.
                    </p>
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#E06C65]/12 border border-[#E06C65]/40 text-sm text-[#F2ECE1]"
                    >
                      <AlertCircle
                        className="w-4 h-4 text-[#E06C65] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#F2ECE1] mb-2"
                    >
                      Your Name <span className="text-[#E09F3E]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={values.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      onBlur={() => handleFieldBlur('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      placeholder="e.g., Ananya Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-md bg-[#121110] text-sm text-[#F2ECE1] placeholder:text-[#8C8478] border transition-colors ${
                        errors.name
                          ? 'border-[#E06C65] focus-visible:outline-[#E06C65]'
                          : 'border-[rgba(242,236,225,0.16)] focus:border-[#E09F3E]'
                      }`}
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-[#E06C65]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email & Optional Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-[#F2ECE1] mb-2"
                      >
                        Email Address <span className="text-[#E09F3E]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={values.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        onBlur={() => handleFieldBlur('email')}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        placeholder="you@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-md bg-[#121110] text-sm text-[#F2ECE1] placeholder:text-[#8C8478] border transition-colors ${
                          errors.email
                            ? 'border-[#E06C65] focus-visible:outline-[#E06C65]'
                            : 'border-[rgba(242,236,225,0.16)] focus:border-[#E09F3E]'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-[#E06C65]"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-medium text-[#F2ECE1] mb-2"
                      >
                        Phone / WhatsApp <span className="text-[#8C8478]">(optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        onBlur={() => handleFieldBlur('phone')}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                        placeholder="+91 98765 43210"
                        className={`w-full px-3.5 py-2.5 rounded-md bg-[#121110] text-sm text-[#F2ECE1] placeholder:text-[#8C8478] border transition-colors ${
                          errors.phone
                            ? 'border-[#E06C65] focus-visible:outline-[#E06C65]'
                            : 'border-[rgba(242,236,225,0.16)] focus:border-[#E09F3E]'
                        }`}
                      />
                      {errors.phone && (
                        <p
                          id="contact-phone-error"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-[#E06C65]"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium text-[#F2ECE1]"
                      >
                        Message <span className="text-[#E09F3E]">*</span>
                      </label>
                      <span className="font-mono-tabular text-[11px] text-[#8C8478]">
                        {values.message.trim().length}/2000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={values.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      onBlur={() => handleFieldBlur('message')}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      placeholder="Share details about your project, study collaboration, or inquiry..."
                      className={`w-full px-3.5 py-2.5 rounded-md bg-[#121110] text-sm text-[#F2ECE1] placeholder:text-[#8C8478] border transition-colors resize-y ${
                        errors.message
                          ? 'border-[#E06C65] focus-visible:outline-[#E06C65]'
                          : 'border-[rgba(242,236,225,0.16)] focus:border-[#E09F3E]'
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-[#E06C65]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#121110] bg-[#E09F3E] hover:bg-[#e8ae54] disabled:opacity-60 disabled:cursor-not-allowed rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>{submitting ? 'Sending Notification...' : 'Send Message'}</span>
                    </motion.button>

                    <span className="text-xs text-[#8C8478]">
                      Notifies {PORTFOLIO_OWNER.email}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
