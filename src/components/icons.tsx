type IconProps = {
  className?: string;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function CameraIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}

export function CoupleIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="7.5" cy="8" r="2.6" />
      <circle cx="16.5" cy="8" r="2.6" />
      <path d="M3.5 19c.4-3.2 2-5 4-5s3.6 1.8 4 5" />
      <path d="M12.5 19c.4-3.2 2-5 4-5s3.6 1.8 4 5" />
      <path d="M12 14l-.4-1.2L12 11l.4 1.8L12 14Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function EventIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="M3 12h18" />
      <path d="M8 3v4M16 3v4" />
    </svg>
  );
}

export function CommercialIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      <path d="M3 12h18" />
    </svg>
  );
}

export function CloseIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function PlayIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function QuoteIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.5 6C6.5 7.5 5 9.7 5 13.3V18h5.5v-5.6H7.8c.1-1.9 1-3.2 2.7-4L9.5 6Zm9 0c-3 1.5-4.5 3.7-4.5 7.3V18h5.5v-5.6h-2.7c.1-1.9 1-3.2 2.7-4L18.5 6Z" />
    </svg>
  );
}

export function AwardIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="9" r="5.2" />
      <path d="M9 13.5 8 21l4-2 4 2-1-7.5" />
    </svg>
  );
}

export function FacebookIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.6.9-.8 1-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.7l.5-.6c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.5-.8-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}

export function YoutubeIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6.5 8.5H4V20h2.5V8.5ZM5.2 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM9.5 20H12v-6.2c0-1 .5-1.8 1.8-1.8 1.3 0 1.7 1 1.7 1.8V20h2.5v-6.7c0-2.4-1.3-3.6-3-3.6-1.6 0-2.4 1-2.5 1.3V8.5H9.5V20Z" />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L16 14l4 1.5V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function MailIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function LocationIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
