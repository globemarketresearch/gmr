// Form submission types based on the API design

export type FormCategory = 'contact' | 'request-sample' | 'request-customization' | 'schedule-demo' | 'newsletter' | 'publish-news';

export type FormStatus = 'pending' | 'processed' | 'archived';

// Contact Form Data
export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  phone?: string;
  country: string; // Country name (e.g., "United States", "India")
  countryCode: string,
  dialCode: string,
  subject: string;
  message: string;
}

// Request Sample Form Data
export interface RequestSampleFormData {
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone?: string;
  country: string; // Country name (e.g., "United States", "India")
  countryCode: string,
  dialCode: string,
  reportTitle: string;
  reportSlug?: string;
  additionalInfo?: string;
}

// Metadata for form submissions
export interface FormMetadata {
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  pageURL?: string;
}

// Base form submission request
export interface FormSubmissionRequest<T = ContactFormData | RequestSampleFormData> {
  category: FormCategory;
  data: T;
  metadata?: FormMetadata;
}

// Form submission response
export interface FormSubmissionResponse {
  success: boolean;
  submissionId: string;
  category: FormCategory;
  message: string;
  createdAt: string;
}

// Schedule Demo Form Data
export interface ScheduleDemoFormData {
  fullName: string;
  email: string;
  company: string;
  jobTitle?: string;
  phone?: string;
  companySize?: string;
  interests?: string;
  preferredDateTimeUTC?: string; // ISO UTC string of the selected slot
  userTimezone?: string;         // IANA timezone name (client's TZ)
  preferredTimeLocal?: string;   // formatted in client's TZ, e.g. "7:30 PM IST"
  additionalInfo?: string;
}

// Newsletter Subscription Form Data
export interface NewsletterFormData {
  email: string;
  name?: string;
  interests?: string[]; // e.g. ['AI & Technology', 'Healthcare', 'Energy']
}

// Publish News / PR Form Data
export interface PublishNewsFormData {
  fullName: string;
  email: string;
  company: string;
  jobTitle?: string;
  phone?: string;
  country: string;
  countryCode: string;
  dialCode: string;
  pressReleaseTitle: string;
  contentType: 'article' | 'press-release' | 'opinion-piece';
  industry: string;
  content: string;
  additionalNotes?: string;
  selectedPlan: string;
}

// Error response (for form-specific error handling)
export interface FormErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode?: number;
}
