import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-[var(--accent)] text-white/70 text-[10px] uppercase tracking-[0.2em] py-2 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          
          <a
            href="mailto:vnadgaonkar@gmail.com"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <Mail size={14} />
            vnadgaonkar@gmail.com
          </a>

          <a
            href="https://wa.me/919820759823"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <Phone size={14} />
            9820759823
          </a>

          <a
            href="https://www.instagram.com/vinbhav30/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <Instagram size={14} />
            Instagram
          </a>

          <a
            href="https://www.instagram.com/vinbhav30/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <Facebook size={14} />
            Facebook
          </a>

        </div>

        <div className="flex items-center gap-2">
          <MapPin size={14} />
          Mumbai • India
        </div>
      </div>
    </div>
  );
}