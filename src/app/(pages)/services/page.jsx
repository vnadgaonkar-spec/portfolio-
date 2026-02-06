import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Services | Photography Studio",
  description:
    "Professional product photography and editorial portraits tailored for brands and individuals.",
};

export default function ServicesPage() {
  return (
    <section className="bg-[#f7f7f7] text-[#161413]">
      {/* Header */}
      <div className="max-w-[960px] mx-auto text-center px-6 py-24">
        <h1 className="font-serif text-5xl md:text-6xl mb-6">Services</h1>
        <p className="text-[#161413]/70 max-w-2xl mx-auto">
          Tailored visual storytelling for brands and individuals who value
          detail, light, and the art of professional imagery.
        </p>
      </div>

      {/* Services */}
      <div className="max-w-[1100px] mx-auto px-6 space-y-32 pb-32">
        {/* Service 1 */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDElIFkzKfxLnVXw_dvp9z7Qw64AbdzuaZrbvCb-EAgUGTWrbLIwHVS8ZGMf4JAveG-m-qrPt4gh7e07C_imEC-vAptOXvSEtLI_sHBAFyzF4SAhPKMEfnLa4dzMa44z_bY3s1NfeMI1MwQbxE7eVeKOSKpEK-oDPzdLIQs49HOyl44ONT7b4z0pP8ywHCDQXLm3aaljHW42d5BXl2mv3avI0pNZtYLrP7b3fmb9LxhgjS10GNPd4dWRb_lX_OKiHmuC2yclMsvXFs"
              alt="Commercial product photography"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h2 className="font-serif text-4xl mb-6">
              Commercial Product Photography
            </h2>

            <p className="text-[#161413]/80 mb-6">
              Elevate your brand with precision-lit imagery designed for global
              commerce and premium product presentation.
            </p>

            <ul className="space-y-3 text-sm text-[#161413]/70 mb-8">
              <li>• Studio lighting & set design</li>
              <li>• High-end creative retouching</li>
              <li>• Full commercial usage licensing</li>
            </ul>

            <p className="font-semibold mb-6">Starting from $800</p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#1b1917] text-white px-8 h-12 text-sm font-semibold hover:opacity-90 transition"
            >
              Book Service
            </Link>
          </div>
        </div>

        {/* Service 2 */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-4xl mb-6">Editorial Portraits</h2>

            <p className="text-[#161413]/80 mb-6">
              Editorial portrait sessions curated to reflect your personality
              through cinematic lighting and thoughtful composition.
            </p>

            <ul className="space-y-3 text-sm text-[#161413]/70 mb-8">
              <li>• Studio or on-location shoots</li>
              <li>• Pre-shoot styling consultation</li>
              <li>• 10 high-resolution digital selects</li>
            </ul>

            <p className="font-semibold mb-6">Starting from $1,200</p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#1b1917] text-white px-8 h-12 text-sm font-semibold hover:opacity-90 transition"
            >
              Book Service
            </Link>
          </div>

          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden order-1 lg:order-2">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtDqVQpWZ8soCvfJalRCtyXyJPGClgZYSuKiwlN0sLmuk0aIOAjmupHd7YHXAUUc0cLQoIggJrvX3Yq3UB5lvJpGCG0dOrrVLkVVfFQsLg29fVoePNfvjhRTuWL413NWl-gNLwsrCVD5pciZsng5EIZTPk0HZCftTkNhfoH8fBWlCQ7gv187CbVvyrq_0MxpgGkDFGDmDhdT7Ft3UU3EmHCnwgw9SZUDiph22pL0O1VSzo1LV9bAF2EEDStk6nJ_hwWGdQhRpsiN0"
              alt="Editorial portrait photography"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="border-t border-black/10 py-16 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[#161413]/40">
          Available for global commissions
        </p>
      </div>
    </section>
  );
}
