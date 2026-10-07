import SelectedWork from "@/components/work/SelectedWork";
import Navigation from "@/components/navigation/Navigation";
import Hero from "@/components/hero/Hero";
import ExperienceGraph from "@/components/experience/ExperienceGraph";
import SystemArchitecture from "@/components/systems/SystemArchitecture";
import AILab from "@/components/lab/AILab";
import AskVenu from "@/components/ask/AskVenu";
import EngineeringProfile from "@/components/about/EngineeringProfile";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main id="top">
      <Navigation />
      <Hero />
      <SelectedWork />
      <ExperienceGraph />
      <SystemArchitecture />
      <AILab />
      <AskVenu />
      <EngineeringProfile />
      <Contact />
    </main>
  );
}
