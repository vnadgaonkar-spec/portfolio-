export default function BrandLogos() {
  const brands = ["AURA", "NOMAD", "FORM", "LUMINA", "STUDIOX", "KIN"];

  return (
    <section className="max-w-[1200px] mx-auto px-3 sm:px-6 pb-10 sm:pb-14">
      <div className="border-t border-neutral-200 pt-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold text-center">
          Trusted by global brands
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {brands.map((b) => (
            <span
              key={b}
              className="text-xs font-black tracking-widest text-neutral-400/80"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
