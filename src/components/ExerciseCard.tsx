import { useState } from 'react';
import { Check, X, AlertTriangle, Clock, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Exercise } from '@/data/exercises';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(false);

  const difficultyColor = {
    beginner: 'bg-success/10 text-success',
    intermediate: 'bg-warning/10 text-warning',
    advanced: 'bg-destructive/10 text-destructive',
  };

  return (
    <div 
      className="glass-card rounded-2xl overflow-hidden hover-lift"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={exercise.imageUrl} 
          alt={exercise.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-semibold capitalize",
            difficultyColor[exercise.difficulty]
          )}>
            {exercise.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold">{exercise.name}</h3>
          <p className="text-muted-foreground text-sm mt-1">{exercise.description}</p>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{exercise.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <RotateCcw className="w-4 h-4" />
            <span>{exercise.reps}</span>
          </div>
        </div>

        {/* Safety Tip Banner */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm text-warning-foreground">Safety First</p>
            <p className="text-xs text-muted-foreground mt-1">
              {exercise.safetyTips[0]}
            </p>
          </div>
        </div>

        {/* Expandable Section */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {expanded ? 'Show Less' : 'View Instructions'}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expanded && (
          <div className="space-y-4 pt-4 border-t border-border animate-fade-in">
            {/* Do's */}
            <div className="space-y-2">
              <h4 className="font-semibold text-success flex items-center gap-2">
                <Check className="w-4 h-4" />
                Do's
              </h4>
              <ul className="space-y-1.5">
                {exercise.doList.map((item, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="space-y-2">
              <h4 className="font-semibold text-destructive flex items-center gap-2">
                <X className="w-4 h-4" />
                Don'ts
              </h4>
              <ul className="space-y-1.5">
                {exercise.dontList.map((item, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
