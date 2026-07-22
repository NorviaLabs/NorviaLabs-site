/**
 * Contact form backend config (Web3Forms).
 *
 * Setup (free, ~2 minutes):
 * 1. Open https://web3forms.com/ and create an access key for hello@norvialabs.com
 * 2. Confirm the email they send you
 * 3. Paste the access key below
 *
 * Free plan: 250 submissions/month, unlimited forms/domains.
 * Docs: https://docs.web3forms.com/
 */
window.NORVIA_CONTACT = {
  provider: "web3forms",
  /** Required — Web3Forms access key (public client key; used in browser) */
  accessKey: "d513937c-5f4b-495b-868b-c53fa6c7aba0",
  /** Inbox that receives submissions (also used for mailto fallback) */
  to: "hello@norvialabs.com",
  /** Subject line prefix in the email you receive */
  subjectPrefix: "NorviaLabs contact",
  /** Optional: from name shown in Web3Forms emails */
  fromName: "NorviaLabs website",
};
