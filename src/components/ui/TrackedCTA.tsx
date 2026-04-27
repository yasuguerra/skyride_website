"use client";

import { trackWhatsAppClick, trackPhoneCallClick } from "@/lib/analytics";

interface TrackedWhatsAppLinkProps {
  href: string;
  locale: string;
  pagePath: string;
  serviceType: string;
  className?: string;
  children: React.ReactNode;
}

export function TrackedWhatsAppLink({
  href,
  locale,
  pagePath,
  serviceType,
  className,
  children,
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackWhatsAppClick(pagePath, serviceType, locale)}
    >
      {children}
    </a>
  );
}

interface TrackedPhoneLinkProps {
  href: string;
  locale: string;
  pagePath: string;
  className?: string;
  children: React.ReactNode;
}

export function TrackedPhoneLink({
  href,
  locale,
  pagePath,
  className,
  children,
}: TrackedPhoneLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackPhoneCallClick(pagePath, locale)}
    >
      {children}
    </a>
  );
}
