const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.co.uk', 'yahoo.co.in', 'yahoo.fr', 'yahoo.de', 'ymail.com',
  'hotmail.com', 'hotmail.co.uk', 'hotmail.fr',
  'outlook.com', 'live.com', 'msn.com',
  'protonmail.com', 'proton.me',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'mail.com',
  'rediffmail.com', 'rocketmail.com',
  'inbox.com', 'zoho.com',
  'yopmail.com', 'guerrillamail.com', 'tempmail.com',
  '10minutemail.com', 'mailinator.com', 'trashmail.com',
]);

export function isBusinessEmail(email: string): boolean {
  const parts = email.toLowerCase().trim().split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];
  return !PERSONAL_EMAIL_DOMAINS.has(domain);
}
