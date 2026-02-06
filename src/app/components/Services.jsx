"use client";

import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      title: "Product Photography",
      desc: "Crisp, minimal captures for luxury goods and e-commerce campaigns.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY5TR8uznPiSCHEPxMFVb5EDCkgXge3W5QHz0-ccymjUsqK694XjR6nbZaceyl8LvhothGyVy69JqE3Arrms1o8EbX2PznkeoaFfP3Up34i27VtWszEdPefeO8BtNBQUEEhh0n1CQ88n6V3pg9GK1LD17QC4FqQnYb1gOvk2ePkZU2FO51S8CI3Qo3cRmYbwmrvmsMjMNQNOqz0Y3l1yDeZrToQaCaAsYxEhnK_hFpzbP-S7Y5JLpfJABbFdEa3EKWN-jUz-Wz0LA",
    },
    {
      title: "Editorial Portraits",
      desc: "High-fashion studio and lifestyle shoots for models and individuals.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgVN5slYPegCSYs5zSLp0JoIRlOSiXAktI_aTypnd9frYDX7J2DE3eynYlRsAx05ttkkS8gQjoEBcrXdp_IVg-gvA_rpoXFXgZH8xkNkELIw9GnYetsPndqKrpeGQInw9J9bF3XaPijjMS_jkmMqPbwerFEIq7eKPpwdotDdHA6V-BXNCsqI-Qp9xkjU9y67mkEi4NvgrfUKTu0EpU50dYdg120C7sy8RiHCP8GH-3oMeuoOeAZyDKX9knQExFsHoG6Eoe8C8pnkI",
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-3 sm:px-6 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid gap-8 md:grid-cols-2"
      >
        {services.map((s) => (
          <a
            key={s.title}
            href="#"
            className="group relative overflow-hidden rounded-2xl h-[320px] sm:h-[400px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url("${s.img}")` }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-7 sm:p-10">
              <h3 className="text-white text-3xl font-serif mb-2">
                {s.title}
              </h3>
              <p className="text-white/70 text-sm max-w-xs mb-6">{s.desc}</p>

              <div className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                Explore Service <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </a>
        ))}
      </motion.div>
    </section>
  );
}
