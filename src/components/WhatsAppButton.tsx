import { WhatsAppIcon } from "@/components/icons";
import { WHATSAPP_URL } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-4 right-4 z-[70] flex items-center gap-3 rounded-full bg-[#25D366] p-3 text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform duration-300 hover:scale-105 sm:bottom-6 sm:right-6 sm:p-3.5"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[160px] group-hover:opacity-100">
        Book a Shoot
      </span>
    </a>
  );
}
