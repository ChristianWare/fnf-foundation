// Back-compat shim: older pages import SITE_URL from here.
// New code should import { SITE } from "@/config/site" directly.
import { SITE } from "@/config/site";
export { SITE };
export const SITE_URL = SITE.url;
