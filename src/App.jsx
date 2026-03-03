import { useState } from "react";
import IntroScreen from "./components/IntroScreen";
import ScrollProgress from "./components/ScrollProgress";
import RosePetals from "./components/RosePetals";
import AudioPlayer from "./components/AudioPlayer";
import HeroSection from "./components/HeroSection";
import CountdownSection from "./components/CountdownSection";
import LoveStorySection from "./components/LoveStorySection";
import MessageSection from "./components/MessageSection";
import GallerySection from "./components/GallerySection";
import InvitationSection from "./components/InvitationSection";
import WishesSection from "./components/WishesSection";
import FooterSection from "./components/FooterSection";

function App() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <IntroScreen onEnter={() => setEntered(true)} />

      {entered && (
        <>
          <ScrollProgress />
          <RosePetals />
          <AudioPlayer />
          <HeroSection />
          <CountdownSection />
          <LoveStorySection />
          <MessageSection />
          <GallerySection />
          <InvitationSection />
          <WishesSection />
          <FooterSection />
        </>
      )}
    </>
  );
}

export default App;
