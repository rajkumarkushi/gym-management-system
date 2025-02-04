export const saveWorkoutPlan = async (workoutData) => {
    const response = await fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workoutData)
    });
    return response.json();
  };
  
  export const getUserWorkout = async (userId) => {
    const response = await fetch(`/api/workouts/${userId}`);
    return response.json();
  };