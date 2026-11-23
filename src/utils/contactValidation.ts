export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: ContactValidationErrors;
  sanitized: ContactFormValues;
}

const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(rawEmail: string): boolean {
  const email = rawEmail.trim();
  if (!email || email.length > 254 || email.includes('..')) {
    return false;
  }
  const [, domain = ''] = email.split('@');
  const tld = domain.split('.').pop() ?? '';
  if (tld.length < 2) {
    return false;
  }
  return EMAIL_PATTERN.test(email);
}

export function isValidOptionalPhone(rawPhone: string): boolean {
  const trimmed = rawPhone.trim();
  if (!trimmed) {
    return true;
  }
  if (!/^[+\d\s()-]+$/.test(trimmed)) {
    return false;
  }
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export function sanitizeContactInput(values: ContactFormValues): ContactFormValues {
  return {
    name: values.name.trim().replace(/\s+/g, ' '),
    email: values.email.trim(),
    phone: values.phone.trim().replace(/\s+/g, ' '),
    message: values.message.trim(),
  };
}

export function validateContactForm(values: ContactFormValues): ContactValidationResult {
  const sanitized = sanitizeContactInput(values);
  const errors: ContactValidationErrors = {};

  if (!sanitized.name) {
    errors.name = 'Please enter your full name.';
  } else if (sanitized.name.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  } else if (sanitized.name.length > 100) {
    errors.name = 'Name must be 100 characters or fewer.';
  } else if (!/[a-zA-Z]/.test(sanitized.name)) {
    errors.name = 'Please enter a valid name using letters.';
  }

  if (!sanitized.email) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(sanitized.email)) {
    errors.email = 'Please enter a valid email address (for example, name@domain.com).';
  }

  if (sanitized.phone && !isValidOptionalPhone(sanitized.phone)) {
    errors.phone = 'Enter a valid 10–15 digit phone or WhatsApp number, or leave this blank.';
  }

  if (!sanitized.message) {
    errors.message = 'Please write a short message before sending.';
  } else if (sanitized.message.length < 10) {
    errors.message = 'Message should be at least 10 characters so I have enough context.';
  } else if (sanitized.message.length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}

export function buildWhatsAppUrl(
  whatsappDigits: string,
  senderName?: string,
  messageText?: string,
): string {
  const cleanDigits = whatsappDigits.replace(/\D/g, '');
  const cleanName = senderName?.trim();
  const cleanMsg = messageText?.trim();

  let composed = 'Hi Aashirya, I visited your portfolio and would like to connect.';
  if (cleanName && cleanMsg) {
    composed = `Hi Aashirya, I am ${cleanName}. ${cleanMsg}`;
  } else if (cleanMsg) {
    composed = `Hi Aashirya, ${cleanMsg}`;
  } else if (cleanName) {
    composed = `Hi Aashirya, I am ${cleanName}. I visited your portfolio and would like to connect.`;
  }

  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(composed)}`;
}

export function buildMailtoUrl(
  recipientEmail: string,
  senderName?: string,
  senderEmail?: string,
  messageText?: string,
): string {
  const subject = senderName?.trim()
    ? `Portfolio Inquiry from ${senderName.trim()}`
    : 'Portfolio Inquiry';
  const bodyLines = [
    senderName?.trim() ? `Name: ${senderName.trim()}` : '',
    senderEmail?.trim() ? `Reply Email: ${senderEmail.trim()}` : '',
    '',
    messageText?.trim() || '',
  ]
    .filter((line, idx, arr) => line !== '' || (idx > 0 && arr[idx - 1] !== ''))
    .join('\n');

  return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
}
