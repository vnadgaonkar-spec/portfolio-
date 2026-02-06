"use client";

import { motion } from "framer-motion";

export default function FeaturedProjects() {
  const projects = [
    {
      title: "Aura Skincare",
      tag: "Brand Identity",
      year: "2024",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY5TR8uznPiSCHEPxMFVb5EDCkgXge3W5QHz0-ccymjUsqK694XjR6nbZaceyl8LvhothGyVy69JqE3Arrms1o8EbX2PznkeoaFfP3Up34i27VtWszEdPefeO8BtNBQUEEhh0n1CQ88n6V3pg9GK1LD17QC4FqQnYb1gOvk2ePkZU2FO51S8CI3Qo3cRmYbwmrvmsMjMNQNOqz0Y3l1yDeZrToQaCaAsYxEhnK_hFpzbP-S7Y5JLpfJABbFdEa3EKWN-jUz-Wz0LA",
    },
    {
      title: "Nomad Editorial",
      tag: "Fashion",
      year: "2024",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgVN5slYPegCSYs5zSLp0JoIRlOSiXAktI_aTypnd9frYDX7J2DE3eynYlRsAx05ttkkS8gQjoEBcrXdp_IVg-gvA_rpoXFXgZH8xkNkELIw9GnYetsPndqKrpeGQInw9J9bF3XaPijjMS_jkmMqPbwerFEIq7eKPpwdotDdHA6V-BXNCsqI-Qp9xkjU9y67mkEi4NvgrfUKTu0EpU50dYdg120C7sy8RiHCP8GH-3oMeuoOeAZyDKX9knQExFsHoG6Eoe8C8pnkI",
    },
    {
      title: "Form & Function",
      tag: "Interior",
      year: "2023",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpb-vwX0QhUdU27VaCHAWzFGeBDW7LLwSsU0Z0G3r8fSIckADNtrzuuCbmuSQwgmgTS5uLkugOe6FMynfdlI7PgxP0VeA5XhEiO-DovDuUmoGGn178KU8yQt4qnuOzs3AY1yq7BQrQigi-wJLkrvwFO74MlkbiEgh_VvRQfDafRol4G0VE2q6E0m2c0GRe-0SyniPGTgeQsdwguo73oFWC16R2P-yA_x1UnPZROPZhHf461K_ITGlRHDQACRl5zS_m4zZSSjn-Yu8",
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-3 sm:px-6 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-end justify-between gap-6"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">
            Selected Works
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl mt-2">
            Featured Projects
          </h2>
        </div>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <a key={p.title} href="#" className="group">
            <div className="overflow-hidden rounded-2xl bg-neutral-200">
              <div
                className="h-[320px] sm:h-[380px] lg:h-[460px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url("${p.img}")` }}
              />
            </div>

            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mt-1">
                  {p.tag}
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                {p.year}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
