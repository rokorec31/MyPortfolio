// Admin whitelist — only these Google accounts may access /admin.
// Note: client-side checks control UI only; real data protection comes from
// Firestore Security Rules (Stage 4), which enforce the same email whitelist.
export const ADMIN_EMAILS = ["rokorec31@gmail.com"] as const;

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && (ADMIN_EMAILS as readonly string[]).includes(email);
}
