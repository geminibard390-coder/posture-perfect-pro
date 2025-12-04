import { ArrowLeft, Sparkles, ShoppingBag, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExerciseCard } from '@/components/ExerciseCard';
import { ProductCard } from '@/components/ProductCard';
import AICoachCard from '@/components/AICoachCard';
import { useUserProfile } from '@/store/userProfile';
import { getFilteredExercises } from '@/data/exercises';
import { getRecommendedProducts } from '@/data/products';
interface ResultsDashboardProps {
  onRestart: () => void;
}

export function ResultsDashboard({ onRestart }: ResultsDashboardProps) {
  const { profile, resetProfile } = useUserProfile();

  const exercises = getFilteredExercises(
    profile.targetZones,
    profile.injuries.filter(i => i !== 'none'),
    profile.activityLevel
  );

  const products = getRecommendedProducts(
    profile.injuries.filter(i => i !== 'none'),
    exercises.map(e => e.id)
  );

  const handleRestart = () => {
    resetProfile();
    onRestart();
  };

  const getProfileSummary = () => {
    const level = {
      sedentary: 'beginner-friendly',
      active: 'moderate intensity',
      athlete: 'challenging'
    }[profile.activityLevel] || 'personalized';

    const zones = profile.targetZones.length > 0 
      ? profile.targetZones.join(', ')
      : 'full body';

    return `Based on your ${level} profile focusing on ${zones}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handleRestart}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          <h1 className="font-bold text-lg gradient-text">Your Personal Plan</h1>
          <Button variant="ghost" size="icon" onClick={handleRestart}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="container py-8 space-y-12">
        {/* Summary Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent p-8 text-primary-foreground">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Personalized for You</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {exercises.length} Safe Exercises Selected
            </h2>
            <p className="opacity-90 max-w-xl">
              {getProfileSummary()}. Each exercise includes proper form guidance to prevent injury.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </section>

        {/* AI Coach Section */}
        <AICoachCard />

        {/* Exercises Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Exercises</h2>
            <span className="text-sm text-muted-foreground">{exercises.length} exercises</span>
          </div>
          
          {exercises.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise, index) => (
                <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-xl">
              <p className="text-muted-foreground">
                No exercises match your criteria. Try adjusting your profile.
              </p>
              <Button variant="outline" className="mt-4" onClick={handleRestart}>
                Update Profile
              </Button>
            </div>
          )}
        </section>

        {/* Products Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Recommended Gear</h2>
          </div>
          <p className="text-muted-foreground">
            Equipment that can enhance your training and provide extra support.
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>

        {/* Safety Disclaimer */}
        <section className="bg-secondary rounded-xl p-6">
          <p className="text-sm text-secondary-foreground">
            <strong>Disclaimer:</strong> These recommendations are for educational purposes only. 
            Always consult with a healthcare professional before starting any new exercise program, 
            especially if you have existing injuries or medical conditions.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Postural Health Companion — Move Safely, Train Smarter</p>
        </div>
      </footer>
    </div>
  );
}
