import type {
  ContactFormData,
  RequestSampleFormData,
  ScheduleDemoFormData,
  NewsletterFormData,
  PublishNewsFormData,
  FormSubmissionRequest,
  FormSubmissionResponse,
  FormMetadata,
} from './forms.types';
import type { ApiResponse } from './config';

// Form submissions always go to the Next.js API route (never the external backend).
// This avoids 404s when NEXT_PUBLIC_API_BASE_URL points to a separate service
// that doesn't implement the forms endpoint.
const FORMS_API_URL = '/api/v1/forms/submissions';

/**
 * Get browser metadata for form submissions
 */
function getFormMetadata(): FormMetadata {
  return {
    submittedAt: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    referrer: typeof window !== 'undefined' ? window.document.referrer : undefined,
    pageURL: typeof window !== 'undefined' ? window.location.href : undefined,
  };
}

/**
 * Generic function to submit form data to the API
 */
async function submitForm<T extends ContactFormData | RequestSampleFormData | ScheduleDemoFormData | NewsletterFormData | PublishNewsFormData>(
  category: 'contact' | 'request-sample' | 'request-customization' | 'schedule-demo' | 'newsletter' | 'publish-news',
  data: T
): Promise<ApiResponse<FormSubmissionResponse>> {
  try {
    const payload: FormSubmissionRequest<T> = {
      category,
      data,
      metadata: getFormMetadata(),
    };

    const response = await fetch(FORMS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'submission_failed',
        message: result.message || 'Failed to submit form. Please try again.',
        statusCode: response.status,
      };
    }

    return result;
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: 'network_error',
      message: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Submit contact form
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  return submitForm('contact', data);
}

/**
 * Submit request sample form
 */
export async function submitRequestSampleForm(
  data: RequestSampleFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  return submitForm('request-sample', data);
}

/**
 * Submit request customization form
 */
export async function submitRequestCustomizationForm(
  data: RequestSampleFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  return submitForm('request-customization', data);
}

/**
 * Submit schedule demo form
 */
export async function submitScheduleDemoForm(
  data: ScheduleDemoFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  return submitForm('schedule-demo', data);
}

/**
 * Submit newsletter subscription
 */
export async function submitNewsletterForm(
  data: NewsletterFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  return submitForm('newsletter', data);
}

/**
 * Submit publish news / PR form
 */
export async function submitPublishNewsForm(
  data: PublishNewsFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  return submitForm('publish-news', data);
}

/**
 * Type guard to check if response is an error
 */
export function isFormError(
  response: ApiResponse<FormSubmissionResponse>
): response is { success: false; error: string; message: string } {
  return response.success === false;
}
