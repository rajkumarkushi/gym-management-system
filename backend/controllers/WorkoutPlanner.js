const { db } = require('../firebaseconfig');

// Get workout plan for a user
const getWorkoutPlan = async (req, res) => {
  try {
    const { userId } = req.params;
    const workoutDoc = await db.collection('workoutPlans')
      .where('userId', '==', userId)
      .get();

    if (workoutDoc.empty) {
      return res.status(200).json({});
    }

    const workoutPlan = workoutDoc.docs[0].data();
    res.status(200).json({ id: workoutDoc.docs[0].id, ...workoutPlan });
  } catch (error) {
    console.error('Error fetching workout plan:', error);
    res.status(500).json({ error: 'Failed to fetch workout plan' });
  }
};

// Save or update workout plan
const saveWorkoutPlan = async (req, res) => {
  try {
    const { userId, weeklyPlan } = req.body;

    if (!userId || !weeklyPlan) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if plan exists
    const existingPlan = await db.collection('workoutPlans')
      .where('userId', '==', userId)
      .get();

    const workoutData = {
      userId,
      weeklyPlan,
      updatedAt: new Date().toISOString()
    };

    let response;
    if (!existingPlan.empty) {
      // Update existing plan
      const planId = existingPlan.docs[0].id;
      await db.collection('workoutPlans').doc(planId).update(workoutData);
      response = { id: planId, ...workoutData };
    } else {
      // Create new plan
      workoutData.createdAt = new Date().toISOString();
      const docRef = await db.collection('workoutPlans').add(workoutData);
      response = { id: docRef.id, ...workoutData };
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Error saving workout plan:', error);
    res.status(500).json({ error: 'Failed to save workout plan' });
  }
};

// Get all users with workout plans
const getUsers = async (req, res) => {
  try {
    const usersSnapshot = await db.collection('gymusers').get();
    const users = [];
    usersSnapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

module.exports = {
  getWorkoutPlan,
  saveWorkoutPlan,
  getUsers
};