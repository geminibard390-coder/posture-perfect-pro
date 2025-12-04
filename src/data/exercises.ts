export interface Exercise {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetZones: string[];
  safetyTips: string[];
  doList: string[];
  dontList: string[];
  duration: string;
  reps: string;
  contraindications: string[]; // injuries this exercise is NOT suitable for
  relatedProductIds: string[];
  imageUrl: string;
}

export const exercises: Exercise[] = [
  {
    id: 'wall-squat',
    name: 'Wall Squat Hold',
    description: 'A supported squat against a wall that builds leg strength while protecting your knees and lower back.',
    difficulty: 'beginner',
    targetZones: ['legs', 'core'],
    safetyTips: ['Keep your back flat against the wall', 'Knees should not extend past your toes'],
    doList: ['Keep feet shoulder-width apart', 'Press your lower back into the wall', 'Breathe steadily throughout'],
    dontList: ['Let knees cave inward', 'Hold your breath', 'Go too deep if you feel pain'],
    duration: '30-60 seconds',
    reps: '3 sets',
    contraindications: [],
    relatedProductIds: ['yoga-mat', 'resistance-band'],
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop'
  },
  {
    id: 'cat-cow',
    name: 'Cat-Cow Stretch',
    description: 'A gentle flow between two poses that warms up the spine and relieves tension in the back.',
    difficulty: 'beginner',
    targetZones: ['back', 'core'],
    safetyTips: ['Move slowly and with control', 'Sync movement with breath'],
    doList: ['Start on hands and knees', 'Arch back up like a cat on exhale', 'Drop belly and lift head on inhale'],
    dontList: ['Rush through movements', 'Strain your neck', 'Hyperextend your spine'],
    duration: '1-2 minutes',
    reps: '10-15 cycles',
    contraindications: [],
    relatedProductIds: ['yoga-mat', 'foam-roller'],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
  },
  {
    id: 'bird-dog',
    name: 'Bird Dog',
    description: 'A core stability exercise that strengthens the back, abs, and improves balance.',
    difficulty: 'beginner',
    targetZones: ['back', 'core'],
    safetyTips: ['Keep your spine neutral', 'Move slowly to maintain balance'],
    doList: ['Extend opposite arm and leg simultaneously', 'Keep hips level', 'Engage your core throughout'],
    dontList: ['Arch your lower back', 'Rotate your hips', 'Hold your breath'],
    duration: '30 seconds each side',
    reps: '3 sets of 10',
    contraindications: ['wrist'],
    relatedProductIds: ['yoga-mat', 'knee-pad'],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop'
  },
  {
    id: 'standing-hip-flexor',
    name: 'Standing Hip Flexor Stretch',
    description: 'Opens up tight hip flexors commonly caused by prolonged sitting.',
    difficulty: 'beginner',
    targetZones: ['legs', 'back'],
    safetyTips: ['Use a wall or chair for balance if needed', 'Keep your core engaged'],
    doList: ['Step one foot forward into a lunge', 'Tuck your pelvis slightly', 'Feel the stretch in the front of your back hip'],
    dontList: ['Lean too far forward', 'Let your knee go past your toes', 'Arch your lower back'],
    duration: '30 seconds each side',
    reps: '2-3 sets',
    contraindications: ['knee'],
    relatedProductIds: ['yoga-blocks', 'balance-pad'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop'
  },
  {
    id: 'plank',
    name: 'Forearm Plank',
    description: 'A fundamental core exercise that builds strength and endurance in the entire midsection.',
    difficulty: 'intermediate',
    targetZones: ['core', 'shoulders', 'full-body'],
    safetyTips: ['Keep your body in a straight line', 'Engage your glutes'],
    doList: ['Stack shoulders over elbows', 'Look at the floor to keep neck neutral', 'Breathe steadily'],
    dontList: ['Let your hips sag', 'Pike your hips up too high', 'Hold your breath'],
    duration: '30-60 seconds',
    reps: '3 sets',
    contraindications: ['shoulder', 'wrist'],
    relatedProductIds: ['yoga-mat', 'ab-wheel'],
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&h=300&fit=crop'
  },
  {
    id: 'glute-bridge',
    name: 'Glute Bridge',
    description: 'Activates and strengthens the glutes while relieving lower back tension.',
    difficulty: 'beginner',
    targetZones: ['legs', 'back', 'core'],
    safetyTips: ['Push through your heels', 'Squeeze glutes at the top'],
    doList: ['Lie on your back with knees bent', 'Lift hips until body forms a line', 'Hold briefly at the top'],
    dontList: ['Overarch your lower back', 'Push through your toes', 'Rush the movement'],
    duration: '10-15 reps',
    reps: '3 sets',
    contraindications: [],
    relatedProductIds: ['yoga-mat', 'resistance-band'],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    id: 'shoulder-rolls',
    name: 'Shoulder Rolls',
    description: 'Simple yet effective movement to release tension in the shoulders and upper back.',
    difficulty: 'beginner',
    targetZones: ['shoulders', 'back'],
    safetyTips: ['Keep movements smooth and controlled', 'Relax your arms by your sides'],
    doList: ['Roll shoulders forward in circles', 'Then reverse direction', 'Combine with deep breathing'],
    dontList: ['Rush through the movement', 'Tense your neck', 'Shrug too aggressively'],
    duration: '1 minute',
    reps: '10 rolls each direction',
    contraindications: [],
    relatedProductIds: ['massage-ball', 'resistance-band'],
    imageUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400&h=300&fit=crop'
  },
  {
    id: 'seated-spinal-twist',
    name: 'Seated Spinal Twist',
    description: 'A gentle rotation that improves spinal mobility and relieves back stiffness.',
    difficulty: 'beginner',
    targetZones: ['back', 'core'],
    safetyTips: ['Keep your spine tall', 'Twist from your core, not your arms'],
    doList: ['Sit tall with legs extended', 'Cross one leg over and twist toward it', 'Use your arm for gentle support'],
    dontList: ['Force the twist', 'Round your back', 'Hold your breath'],
    duration: '30 seconds each side',
    reps: '2-3 sets',
    contraindications: ['back'],
    relatedProductIds: ['yoga-mat', 'yoga-blocks'],
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=300&fit=crop'
  }
];

export function getFilteredExercises(
  targetZones: string[],
  injuries: string[],
  level: string
): Exercise[] {
  return exercises.filter(exercise => {
    // Filter by target zones
    const zoneMatch = targetZones.length === 0 || 
      targetZones.includes('full-body') ||
      targetZones.some(zone => exercise.targetZones.includes(zone));
    
    // Filter out exercises contraindicated for injuries
    const safeForInjuries = !injuries.some(injury => 
      exercise.contraindications.includes(injury)
    );
    
    // Filter by difficulty level
    let levelMatch = true;
    if (level === 'sedentary') {
      levelMatch = exercise.difficulty === 'beginner';
    } else if (level === 'active') {
      levelMatch = exercise.difficulty !== 'advanced';
    }
    // Athletes can do all levels
    
    return zoneMatch && safeForInjuries && levelMatch;
  });
}
