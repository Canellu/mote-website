/**
 * The date both legal documents were last given their current wording. It is
 * one constant because the two are published together and a reader comparing
 * them should not have to reconcile two dates. Bump it when either document
 * changes in substance — not for a typo.
 */
export const LEGAL_EFFECTIVE_DATE = "10 September 2026";

/** The publisher of record, named on both legal pages and in the footer. */
export const PUBLISHER = "Anton Vo";

/** The one address the site gives out, and the route for any privacy request. */
export const SUPPORT_EMAIL = "support@motedesktop.com";

/** Microsoft's own statements, which govern the half of this that is theirs. */
export const MICROSOFT_PRIVACY_URL = "https://privacy.microsoft.com/privacystatement";
export const MICROSOFT_STORE_TERMS_URL =
  "https://www.microsoft.com/legal/terms-of-use/msa-application-license-terms";
