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
  src="/my-photo.jpeg"
  alt="Portrait of the Founder"
  fill
  className="object-cover object-top"
  priority
/>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="lg:col-span-7 flex flex-col space-y-8">
              <div>
                <p className="text-[#161413]/70 text-lg leading-relaxed mb-8 font-light">
                  A graduate of Sir J. J. School of Art (1997), Vaibhav
                  Nadgaonkar has built a career rooted in visual storytelling
                  and artistic excellence. Specializing in{" "}
                  <span className="font-medium">photography</span>, his work
                  reflects mastery in lighting, composition, and framing, with a
                  strong eye for detail and aesthetics.
                  <br />
                  <br />
                  With over 27 years of experience as Assistant Art Director at
                  Femina, he has worked across fashion, editorial, documentary,
                  and event photography. His expertise combines creative
                  direction, art direction, and visual design, along with
                  experience in natural light, studio setups, and
                  post-production.
                  <br />
                  <br />
                  He has also contributed to Femina, Filmfare, Grazia India, and
                  GoodHomes India through photography, design, and video
                  production—creating refined and impactful visual narratives.
                </p>
              </div>
            </div>

            <div className="">
              <Link
                href="/book-now"
                className="inline-flex items-center justify-center gap-3 bg-[#1b1917] text-white px-10 py-4 rounded-full font-semibold text-xs uppercase tracking-[0.15em] hover:opacity-90 transition w-fit"
              >
                Get in Touch <span className="text-sm">↗</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Client Portfolio */}
        {/* <section className="mb-24 lg:mb-32 py-10 border-y border-black/10">
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
        </section> */}
      </div>
    </section>
  );
}
