const { db } = require('../firebaseconfig');

// Get trainer profile
const getTrainerProfile = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const trainerDoc = await db.collection('gymusers').doc(trainerId).get();

    if (!trainerDoc.exists) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    res.status(200).json({ id: trainerDoc.id, ...trainerDoc.data() });
  } catch (error) {
    console.error('Error fetching trainer profile:', error);
    res.status(500).json({ error: 'Failed to fetch trainer profile' });
  }
};

// Update trainer profile
const updateTrainerProfile = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { name, email, phone, bio, profileImage } = req.body;

    await db.collection('gymusers').doc(trainerId).update({ name, email, phone, bio, profileImage });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating trainer profile:', error);
    res.status(500).json({ error: 'Failed to update trainer profile' });
  }
};

// Update availability
const updateAvailability = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { availability } = req.body;

    await db.collection('gymusers').doc(trainerId).update({ availability });

    res.status(200).json({ message: 'Availability updated successfully' });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
};

// Update notification preferences
const updateNotifications = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { notifications } = req.body;

    await db.collection('gymusers').doc(trainerId).update({ notifications });

    res.status(200).json({ message: 'Notification preferences updated successfully' });
  } catch (error) {
    console.error('Error updating notifications:', error);
    res.status(500).json({ error: 'Failed to update notifications' });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { newPassword } = req.body;

    // Here you would typically hash the password and update it in your auth system
    await db.collection('gymusers').doc(trainerId).update({ password: newPassword });

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
};

// Update dark mode preference
const updateDarkMode = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { darkMode } = req.body;

    await db.collection('gymusers').doc(trainerId).update({ darkMode });

    res.status(200).json({ message: 'Dark mode preference updated successfully' });
  } catch (error) {
    console.error('Error updating dark mode preference:', error);
    res.status(500).json({ error: 'Failed to update dark mode preference' });
  }
};

// Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { feedback } = req.body;

    // Here you might want to save the feedback to a separate collection
    await db.collection('feedback').add({ trainerId, feedback, createdAt: new Date() });

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

module.exports = {
  getTrainerProfile,
  updateTrainerProfile,
  updateAvailability,
  updateNotifications,
  changePassword,
  updateDarkMode,
  submitFeedback,
}; 