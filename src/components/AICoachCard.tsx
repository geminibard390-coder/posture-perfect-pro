import { useState, useEffect } from 'react';
import { useUserProfile } from '@/store/userProfile';
import { Sparkles, ShoppingBag, ShieldAlert, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface AIAdvice {
  safetyTip: string;
  gearRecommendation: string;
  motivationalQuote: string;
}

export default function AICoachCard() {
  const { profile } = useUserProfile();
  const [advice, setAdvice] = useState<AIAdvice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAdvice() {
      if (!profile.completed) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const { data, error: fnError } = await supabase.functions.invoke('ai-coach', {
          body: {
            injury: profile.injuries[0] || 'None',
            activityLevel: profile.activityLevel,
            targetZones: profile.targetZones,
          },
        });

        if (fnError) {
          console.error('AI Coach error:', fnError);
          setError('Unable to get AI advice');
          return;
        }

        setAdvice(data);
      } catch (err) {
        console.error('Failed to fetch AI advice:', err);
        setError('Unable to get AI advice');
      } finally {
        setLoading(false);
      }
    }

    fetchAdvice();
  }, [profile.completed, profile.injuries, profile.activityLevel, profile.targetZones]);

  if (!profile.completed) return null;

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6 animate-pulse">
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
          <span className="text-muted-foreground text-sm">Consulting AI Physiotherapist...</span>
        </div>
      </div>
    );
  }

  if (error || !advice) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-foreground">Your AI Safety Brief</h3>
      </div>

      <div className="space-y-4">
        {/* Safety Tip */}
        <div className="flex gap-3 items-start">
          <ShieldAlert className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
          <p className="text-foreground/80 text-sm leading-relaxed">
            {advice.safetyTip}
          </p>
        </div>

        {/* Gear Recommendation */}
        <div className="bg-background/50 p-3 rounded-xl border border-border/50 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase text-muted-foreground">Recommended Gear</span>
          </div>
          <span className="text-sm font-bold text-primary">
            {advice.gearRecommendation}
          </span>
        </div>

        {/* Motivational Quote */}
        <p className="text-xs text-center text-muted-foreground italic pt-2">
          "{advice.motivationalQuote}"
        </p>
      </div>
    </motion.div>
  );
}
