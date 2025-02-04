
const express = require("express");
const { register, login,BasicInfo} = require("../controllers/authControl");
const {Classes}=require("../controllers/class");
const { getDashboardStats } = require('../controllers/DashboardApi');
const vendorController = require('../controllers/VendorController');
const { 
  getAllEquipments, 
  addEquipment, 
  updateEquipment, 
  deleteEquipment 
} = require('../controllers/Equipment');
const {
  getWorkoutPlan,
  saveWorkoutPlan,
  getUsers
} = require('../controllers/WorkoutPlanner');
const {
  getTrainerProfile,
  updateTrainerProfile,
  updateAvailability,
  updateNotifications,
  changePassword,
  updateDarkMode,
  submitFeedback,
} = require('../controllers/TrainerController');

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.put("/Basicdetails",BasicInfo)
router.post("/scheduleclass",Classes)
router.get('/fetchequipments', getAllEquipments);
router.post('/addequipment', addEquipment);
router.put('/equipments/:id', updateEquipment);
router.delete('/equipments/:id', deleteEquipment);
router.get('/users', getUsers);
router.get('/workout-plan/:userId', getWorkoutPlan);
router.post('/workout-plan', saveWorkoutPlan);
router.get('/trainer/:trainerId', getTrainerProfile);
router.put('/trainer/:trainerId', updateTrainerProfile);
router.put('/trainer/:trainerId/availability', updateAvailability);
router.put('/trainer/:trainerId/notifications', updateNotifications);
router.post('/trainer/:trainerId/change-password', changePassword);
router.put('/trainer/:trainerId/dark-mode', updateDarkMode);
router.post('/trainer/:trainerId/feedback', submitFeedback);
router.get('/stats', getDashboardStats);
//vendore
router.get('/', vendorController.getVendors);
router.post('/', vendorController.addVendor);
router.put('/:id', vendorController.updateVendor);
router.delete('/:id', vendorController.deleteVendor);
router.get('/maintenance', vendorController.getMaintenanceSchedules);



router.get("/scheduledclass/:email", async (req, res) => {
    try {
      const email = req.params.email;
      console.log('Fetching classes for email:', email);
  
      const classesRef = db.collection("Classes");
      const snapshot = await classesRef
        .where("email", "==", email)
        .get();
  
      if (snapshot.empty) {
        console.log('No classes found for email:', email);
        return res.json([]);
      }
  
      const classes = [];
      snapshot.forEach(doc => {
        classes.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
      console.log('Found classes:', classes);
      res.json(classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
      res.status(500).json({ error: "Failed to fetch classes" });
    }
  });

module.exports = router;
