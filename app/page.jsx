import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { Band, Steps, Panels, Strip } from "../components/Sections";
import Quotes from "../components/Quotes";
import { Closing, Footer } from "../components/Closing";
import Divider from "../components/Divider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Band />
        <Divider shape="drip" above="#ff4d8d" below="#fff9f2" rim="#e0347a" />
        <Steps />
        <Panels />
        <Divider shape="scallop" above="#fff9f2" below="#ffcf5c" rim="#e8d5c3" />
        <Quotes />
        <Divider shape="scallop" above="#ffcf5c" below="#fff9f2" rim="#e8b840" />
        <Strip />
        <Divider shape="big" above="#fff9f2" below="#241611" rim="#e8d5c3" />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
