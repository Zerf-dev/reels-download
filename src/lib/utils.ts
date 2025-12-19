import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isShortcodePresent(url: string) {
  const regex = /\/(p|reel)\/([a-zA-Z0-9_-]+)\/?/;
  const match = url.match(regex);

  if (match && match[2]) {
    return true;
  }

  return false;
}

export function getPostShortcode(url: string): string | null {
  const regex = /\/(p|reel)\/([a-zA-Z0-9_-]+)\/?/;
  const match = url.match(regex);

  if (match && match[2]) {
    const shortcode = match[2];
    return shortcode;
  } else {
    return null;
  }
}

export function getUsernameFromUrl(url: string): string | null {
  // Extract username from URLs like:
  // https://www.instagram.com/username/
  // https://www.instagram.com/username
  // instagram.com/username/
  const regex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_.]+)\/?/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  }
  return null;
}

export function isValidUsername(username: string): boolean {
  // Username can contain letters, numbers, periods, and underscores
  // Must be between 1 and 30 characters
  const regex = /^[a-zA-Z0-9._]{1,30}$/;
  return regex.test(username);
}
