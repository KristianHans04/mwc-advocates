/**
 * TypeScript type definitions for MWC Advocates application
 */

// Service types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company?: string;
  content: string;
  rating: number;
  initials: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  status: 'NEW' | 'REVIEWED' | 'CONTACTED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

// FAQ types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  message?: string;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  current?: boolean;
}

// Page metadata types
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

// Component props types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Form validation types
export interface FormError {
  field: string;
  message: string;
}

export interface FormState {
  isSubmitting: boolean;
  errors: FormError[];
  success: boolean;
  message?: string;
}
