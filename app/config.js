import { parse } from "tldts";

const getMainDomain = () => {
  if (typeof window === "undefined") return "pictory.com";

  const { domain, isIp, isLocalhost } = parse(window.location.hostname);

  // Fallback if invalid
  if (isIp || isLocalhost || !domain) return "pictory.com";

  return domain;
};


const getSiteName = () => {
  if (typeof window === "undefined") return "Pictory";

  const hostname = window.location.hostname;

  // Skip localhost or IP addresses
  const isIP = /^[\d.]+$/.test(hostname);
  const isLocalhost = hostname === "localhost";

  if (isIP || isLocalhost) return "Pictory";

  // Get domain without subdomains (e.g. www.example.com -> example.com)
  const parts = hostname.split(".");
  const domain = parts.length > 2 ? parts.slice(-2).join(".") : hostname;

  // Use the first part of the domain (before the TLD) as the name
  const name = domain.split(".")[0];

  return name.charAt(0).toUpperCase() + name.slice(1) || "Pictory";
};

const APP_NAME = getSiteName();
const APP_DOMAIN = getMainDomain();
// const UNSPLASH_API_KEY = "qgj37muAwwQPwAWud0gp5Bzh6jyZMG_-uiaYea3wM4k";
// const PEXELS_API_KEY = "nYx4mFnlGJE3oSpsV2NfWsarO1RIa6pffgfVECSqapAyXasYykk86BJn";
const UNSPLASH_API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;
const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

export { APP_NAME, APP_DOMAIN, UNSPLASH_API_KEY, PEXELS_API_KEY };