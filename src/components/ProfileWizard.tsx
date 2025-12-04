import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Activity, Target, AlertTriangle, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserProfile } from '@/store/userProfile';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'activity', title: 'Activity Level', icon: Activity },
  { id: 'target', title: 'Target Zones', icon: Target },
  { id: 'injuries', title: 'Injury History', icon: AlertTriangle },
  { id: 'goal', title: 'Your Goal', icon: Flag },
];

interface ProfileWizardProps {
  onComplete: () => void;
  onBack: () => void;
}

export function ProfileWizard({ onComplete, onBack }: ProfileWizardProps) {
  const { 
    profile, 
    currentStep, 
    setCurrentStep,
    setActivityLevel,
    setTargetZones,
    setInjuries,
    setGoal,
    completeProfile
  } = useUserProfile();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeProfile();
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!profile.activityLevel;
      case 1: return profile.targetZones.length > 0;
      case 2: return true; // injuries are optional
      case 3: return !!profile.goal;
      default: return false;
    }
  };

  return (
    <section className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={cn(
                  "flex flex-col items-center gap-2 transition-all duration-300",
                  index <= currentStep ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  index < currentStep ? "bg-primary text-primary-foreground" :
                  index === currentStep ? "bg-primary/20 text-primary border-2 border-primary" :
                  "bg-muted text-muted-foreground"
                )}>
                  {index < currentStep ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span className="text-xs font-medium hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && (
              <ActivityStep 
                value={profile.activityLevel} 
                onChange={setActivityLevel} 
              />
            )}
            {currentStep === 1 && (
              <TargetStep 
                value={profile.targetZones} 
                onChange={setTargetZones} 
              />
            )}
            {currentStep === 2 && (
              <InjuryStep 
                value={profile.injuries} 
                onChange={setInjuries} 
              />
            )}
            {currentStep === 3 && (
              <GoalStep 
                value={profile.goal} 
                onChange={setGoal} 
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            variant="hero" 
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === steps.length - 1 ? 'See My Plan' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// Step Components
function ActivityStep({ value, onChange }: { value: string; onChange: (v: any) => void }) {
  const options = [
    { id: 'sedentary', label: 'Sedentary', description: 'Mostly sitting, minimal exercise' },
    { id: 'active', label: 'Active', description: 'Regular exercise 2-4 times/week' },
    { id: 'athlete', label: 'Athlete', description: 'Intense training 5+ times/week' },
  ];

  return (
    <StepContainer 
      title="What's your current activity level?"
      subtitle="This helps us recommend appropriate exercise intensity."
    >
      <div className="grid gap-4">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            selected={value === option.id}
            onClick={() => onChange(option.id)}
            label={option.label}
            description={option.description}
          />
        ))}
      </div>
    </StepContainer>
  );
}

function TargetStep({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const options = [
    { id: 'back', label: 'Back & Spine', description: 'Posture correction, back pain relief' },
    { id: 'legs', label: 'Legs & Hips', description: 'Lower body strength, hip mobility' },
    { id: 'shoulders', label: 'Shoulders & Neck', description: 'Upper body tension relief' },
    { id: 'core', label: 'Core & Abs', description: 'Core stability, balance' },
    { id: 'full-body', label: 'Full Body', description: 'Overall conditioning' },
  ];

  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(v => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <StepContainer 
      title="Which areas do you want to focus on?"
      subtitle="Select one or more target zones."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            selected={value.includes(option.id)}
            onClick={() => toggle(option.id)}
            label={option.label}
            description={option.description}
            multi
          />
        ))}
      </div>
    </StepContainer>
  );
}

function InjuryStep({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const options = [
    { id: 'knee', label: 'Knee Issues', description: 'Pain, instability, past injuries' },
    { id: 'back', label: 'Lower Back', description: 'Chronic pain, herniated disc' },
    { id: 'shoulder', label: 'Shoulder', description: 'Rotator cuff, impingement' },
    { id: 'wrist', label: 'Wrist/Hand', description: 'Carpal tunnel, strain' },
    { id: 'none', label: 'No Injuries', description: 'I\'m injury-free!' },
  ];

  const toggle = (id: string) => {
    if (id === 'none') {
      onChange(['none']);
      return;
    }
    const filtered = value.filter(v => v !== 'none');
    if (filtered.includes(id)) {
      onChange(filtered.filter(v => v !== id));
    } else {
      onChange([...filtered, id]);
    }
  };

  return (
    <StepContainer 
      title="Any injuries we should know about?"
      subtitle="We'll avoid exercises that could aggravate existing conditions."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            selected={value.includes(option.id)}
            onClick={() => toggle(option.id)}
            label={option.label}
            description={option.description}
            multi
          />
        ))}
      </div>
    </StepContainer>
  );
}

function GoalStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { id: 'pain-relief', label: 'Pain Relief', description: 'Reduce discomfort and tension' },
    { id: 'flexibility', label: 'Improve Flexibility', description: 'Increase range of motion' },
    { id: 'strength', label: 'Build Strength', description: 'Get stronger safely' },
    { id: 'prevention', label: 'Injury Prevention', description: 'Stay healthy and active' },
  ];

  return (
    <StepContainer 
      title="What's your main goal?"
      subtitle="We'll prioritize exercises that align with your objective."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            selected={value === option.id}
            onClick={() => onChange(option.id)}
            label={option.label}
            description={option.description}
          />
        ))}
      </div>
    </StepContainer>
  );
}

// Shared Components
function StepContainer({ 
  title, 
  subtitle, 
  children 
}: { 
  title: string; 
  subtitle: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function OptionCard({ 
  selected, 
  onClick, 
  label, 
  description,
  multi = false
}: { 
  selected: boolean; 
  onClick: () => void; 
  label: string; 
  description: string;
  multi?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-6 rounded-xl text-left transition-all duration-300 border-2",
        "hover:shadow-lg hover:-translate-y-1",
        selected 
          ? "border-primary bg-primary/5 shadow-md" 
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">{label}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <div className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
          selected 
            ? "border-primary bg-primary text-primary-foreground" 
            : "border-muted-foreground"
        )}>
          {selected && <Check className="w-4 h-4" />}
        </div>
      </div>
    </button>
  );
}
