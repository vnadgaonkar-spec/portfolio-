import { Mail, Phone, MapPin } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-[var(--accent)] text-white/70 text-[10px] uppercase tracking-[0.2em] py-2 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <span className="flex items-center gap-2">
            <Mail size={14} />
            hello@studio.com
          </span>
          <span className="flex items-center gap-2">
            <Phone size={14} />
            WhatsApp
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={14} />
          Available Worldwide • London Based
        </div>
      </div>
    </div>
  );
}
