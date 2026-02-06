import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandLogos from "./components/BrandLogos";
import Services from "./components/Services";
import FeaturedProjects from "./components/FeaturedProjects";
import Archive from "./components/Archive";
import ClientVoices from "./components/ClientVoices";
import FreeConsultation from "./components/FreeConsultation";
import InstagramEmbed from "./components/InstagramEmbed";
import YouTubeEmbed from "./components/YouTubeEmbed";
export default function Page() {
  return (
    <>
      <Hero />
      <BrandLogos />
      <Services />
      <FeaturedProjects />
      <Archive />
      <ClientVoices /> 
      {/* <instagramEmbed url="https://www.instagram.com/p/Cw3KX1kP2nS/?utm_source=ig_web_copy_link" />  */}
      {/* <YouTubeEmbed url="https://youtu.be/bTvCq5td-SI?si=Lz8PyPTRj1aYfs-W" /> */}
    </>
  );
}
