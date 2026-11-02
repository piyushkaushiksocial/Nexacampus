/**
 * Official Nexa Campus Student Counseling & Admissions Desk Contact
 */

export const COUNSELOR_CONTACT = {
  name: "Harsh",
  phone: "8825216881",
  formattedPhone: "+91 88252 16881",
  whatsappBaseUrl: "https://wa.me/918825216881",
  role: "Lead Academic Counselor",
  getWhatsAppUrl: (message: string) => `https://wa.me/918825216881?text=${encodeURIComponent(message)}`,
};
