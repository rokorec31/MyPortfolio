// Admin whitelist — only these Google accounts may access /admin.
// Note: client-side checks control UI only; real data protection comes from
// Firestore Security Rules, which enforce the same email whitelist.
export const ADMIN_EMAILS = [
  process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "",
] as const;

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && (ADMIN_EMAILS as readonly string[]).includes(email);
}
