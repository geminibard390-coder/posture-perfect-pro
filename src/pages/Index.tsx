import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { ProfileWizard } from '@/components/ProfileWizard';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import { useUserProfile } from '@/store/userProfile';

type View = 'hero' | 'wizard' | 'results';

const Index = () => {
  const [view, setView] = useState<View>('hero');
  const { profile } = useUserProfile();

  // Check if profile is already completed
  const effectiveView = profile.completed ? 'results' : view;

  const handleStart = () => setView('wizard');
  const handleWizardComplete = () => setView('results');
  const handleWizardBack = () => setView('hero');
  const handleRestart = () => setView('hero');

  return (
    <main className="min-h-screen">
      {effectiveView === 'hero' && <Hero onStart={handleStart} />}
      {effectiveView === 'wizard' && (
        <ProfileWizard 
          onComplete={handleWizardComplete} 
          onBack={handleWizardBack}
        />
      )}
      {effectiveView === 'results' && (
        <ResultsDashboard onRestart={handleRestart} />
      )}
    </main>
  );
};

export default Index;
