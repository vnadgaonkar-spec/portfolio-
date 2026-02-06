import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About | Photography Studio",
  description:
    "Founder-led commercial and editorial photography with a minimalist, editorial approach.",
};

export default function AboutPage() {
  return (
    <section className="bg-[#f7f7f7] text-[#161413]">
      <div className="max-w-[1140px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <h1 className="font-serif text-5xl lg:text-[72px] font-normal leading-[1.1] mb-6">
            About
          </h1>
          <p className="text-[#161413]/60 text-lg lg:text-xl font-light max-w-[540px] leading-relaxed">
            Capturing the essence of light and form through a minimalist,
            editorial lens.
          </p>
        </header>

        {/* Founder */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:rounded-[3rem] shadow-sm">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzykw2mP3SeriYY-LAIAdazg-t1bXtxdNj8DZfk_K95gK5zIjwswc4rbqBo_FGL3eMqCg-aKxA5-t8NMzriQa2LEYJHL0BXQ_Ni3ryN24nWH5kVwpKstHI289ZILBEUB5_LAGttWJrGNhODRiIu6SHN_VoZcN5ralVqIfME9m45IUd-uwXrN6rySQtGJjswUp0jEoJzSbJdSapEcRY_TgSlcW8a-Ll9kXsjpqEx4VlaHm8myFaqcm5Ji1Ht5mT6qYo3BbmrrgUS_E"
                alt="Portrait of the Founder"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div>
              <h2 className="font-serif text-3xl lg:text-[40px] font-normal mb-6 leading-tight">
                Founder &amp; Lead Photographer
              </h2>
              <p className="text-[#161413]/70 text-lg leading-relaxed mb-8 font-light">
                With over a decade of experience in commercial and editorial
                photography, our practice is rooted in a minimal aesthetic that
                prioritizes authentic storytelling and timeless visual clarity.
              </p>
            </div>

            <div className="space-y-5">
              {[
                "Art Direction & Visual Strategy",
                "Editorial & Lifestyle Photography",
                "Post-Production & Retouching Excellence",
              ].map((t) => (
                <div key={t} className="flex items-center gap-4">
                  <span className="text-[#161413]/35">→</span>
                  <p className="text-[#161413]/85 tracking-tight">{t}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/book-now"
                className="inline-flex items-center justify-center gap-3 bg-[#1b1917] text-white px-10 py-4 rounded-full font-semibold text-xs uppercase tracking-[0.15em] hover:opacity-90 transition w-fit"
              >
                Get in Touch <span className="text-sm">↗</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Services & Expertise */}
        <section className="mb-24 lg:mb-32">
          <h2 className="font-serif text-2xl lg:text-3xl mb-12 text-center">
            Services &amp; Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Photography",
                desc: "Bespoke imagery for luxury brands and editorial publications worldwide.",
                icon: "◻",
              },
              {
                title: "Creative Direction",
                desc: "Translating brand values into cohesive and compelling visual narratives.",
                icon: "✦",
              },
              {
                title: "Post-Production",
                desc: "High-end retouching that maintains the integrity of natural light and skin.",
                icon: "✧",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white/30 p-10 rounded-xl border border-black/5 hover:bg-white/60 transition-all duration-500"
              >
                <div className="text-2xl mb-8 text-[#161413]/35">{c.icon}</div>
                <h3 className="text-lg font-semibold mb-4 tracking-tight">
                  {c.title}
                </h3>
                <p className="text-[#161413]/60 leading-relaxed text-[15px] font-light">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Client Portfolio */}
        <section className="mb-24 lg:mb-32 py-10 border-y border-black/10">
          <p className="text-center text-[10px] font-bold tracking-[0.3em] uppercase text-[#161413]/35 mb-10">
            Client Portfolio
          </p>

          <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-20 opacity-30 grayscale hover:opacity-60 transition-opacity duration-700">
            {["VOGUE", "ZARA", "KINFOLK", "AD", "HARPER'S"].map((b) => (
              <span
                key={b}
                className="text-xl lg:text-2xl font-serif font-bold"
              >
                {b}
              </span>
            ))}
          </div>
        </section>

        {/* Approach + Stats */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24 lg:mb-32 items-start">
          <div className="lg:sticky lg:top-12">
            <h2 className="font-serif text-3xl lg:text-[40px] mb-8 font-normal leading-tight">
              Our Approach
            </h2>
            <p className="text-[#161413]/70 text-lg leading-relaxed font-light mb-6">
              We believe in the power of simplicity. Every frame is a study in
              balance, intentionality, and the quiet beauty of the subject.
            </p>
            <p className="text-[#161413]/55 text-base leading-relaxed font-light">
              Our process is deeply collaborative, working closely with creators
              and brands to define a unique visual language that stands the test
              of time and trends.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {[
              { val: "150+", label: "Global Shoots" },
              { val: "40+", label: "Creative Brands" },
              { val: "12", label: "Awards Won" },
              { val: "08", label: "Cover Stories" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col justify-center p-8 lg:p-10 border border-black/5 bg-white/10 rounded-2xl"
              >
                <p className="text-[36px] font-light mb-2">{s.val}</p>
                <p className="text-[#161413]/35 uppercase tracking-widest text-[9px] font-bold">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Studio image */}
        <section className="relative h-[450px] lg:h-[550px] w-full group overflow-hidden rounded-[2rem] lg:rounded-[3.5rem] shadow-sm">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVHIlz7ij00_ZeJDHd1f92HDQURYKQpuZoqxe-WxTgVIlQqdcyDODrX-sfS15cAcT0QkHbAw9i-jZPd1l_InlFjETX2q1RvMT3T9t0-3ykq5mi0hA_ogk4qnf5ooE6P6oDjoZMdBdm42R5ZnMZ-udj4CqGPtHFeEGaGYUtPL8_HBT4wRjRiAXacaY6dX0ABkkzhMW0EMxQBYBzhJ1ibgvHIzOp8AbJOx4J3U4WDknmsoQJouwu69OIl4eGxMQAPPfqIq-F10ONnK8"
            alt="Studio space"
            fill
            className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-10 lg:p-16 text-white">
            <div className="max-w-[440px]">
              <h3 className="font-serif text-3xl lg:text-[40px] mb-4 font-normal">
                The Studio
              </h3>
              <p className="text-white/80 text-base leading-relaxed font-light mb-8">
                Based in the heart of the creative district. A space designed
                for inspiration, natural light, and quiet focus.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-lg">⦿</span>
                <span className="text-xs tracking-[0.2em] uppercase font-semibold">
                  New York City, NY
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
