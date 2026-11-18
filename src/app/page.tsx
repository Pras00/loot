import { ActRail } from '@/components/chrome/act-rail';
import { ActTwoAnatomy } from '@/components/stages/anatomy/act-two-anatomy';
import { ActThreeFlow } from '@/components/stages/flow/act-three-flow';
import { ActFourForge } from '@/components/stages/forge/act-four-forge';
import { ActOneOrigin } from '@/components/stages/origin/act-one-origin';
import { ReducedMotionStory } from '@/components/stages/reduced-story';
import { ActFiveSpec } from '@/components/stages/spec/act-five-spec';

export default function Home() {
  return (
    <>
      <ActRail />
      <main>
        <div className="hidden motion-reduce:block">
          <ReducedMotionStory />
        </div>
        <div className="motion-reduce:hidden">
          <ActOneOrigin />
          <ActTwoAnatomy />
          <ActThreeFlow />
          <ActFourForge />
        </div>
        <ActFiveSpec />
      </main>
    </>
  );
}
