import { SectionRail } from '@/components/navigation/section-rail';
import { CardConstructionSection } from '@/components/sections/card-construction/card-construction-section';
import { HeroDiveSection } from '@/components/sections/hero-dive/hero-dive-section';
import { PocketIndexSection } from '@/components/sections/pocket-index/pocket-index-section';
import { ProofFooterSection } from '@/components/sections/proof-footer/proof-footer-section';
import { ReducedMotionStory } from '@/components/sections/reduced-motion-story';
import { XrayForgeSection } from '@/components/sections/xray-forge/xray-forge-section';

export default function Home() {
  return (
    <>
      <SectionRail />
      <main>
        <div className="hidden motion-reduce:block">
          <ReducedMotionStory />
        </div>
        <div className="motion-reduce:hidden">
          <HeroDiveSection />
          <PocketIndexSection />
          <CardConstructionSection />
          <XrayForgeSection />
        </div>
        <ProofFooterSection />
      </main>
    </>
  );
}
