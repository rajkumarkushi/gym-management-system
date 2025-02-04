const {db}=require("../firebaseconfig")
const { v4: uuidv4 } = require('uuid');



const Classes=async(req,res)=>{ 
  
    try {
      const {
        email,
        className,
        description,
        trainer,
        startTime,
        endTime,
        room,
      } = req.body;
  
      // Validate required fields
      if (!email || !className || !trainer || !startTime || !endTime || !room) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          message: 'All fields are required'
        });
      }
  
      // Create the document in Firestore
      const classData = {
        email,
        className,
        description,
        trainer,
        startTime,
        endTime,
        room,
        createdAt:"",
        status: 'active'
      };
  
      console.log('Attempting to save to Firebase:', classData);
  
      // Add to Firestore
      const docRef = await db.collection('Classes').add(classData);
  
      console.log('Successfully saved to Firebase with ID:', docRef.id);
  
      // Return success response
      res.status(201).json({
        id: docRef.id,
        ...classData,
        message: 'Class scheduled successfully'
      });
  
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      res.status(500).json({
        error: 'Failed to schedule class',
        message: error.message
      });
    }
  }
  
  // GET endpoint to fetch scheduled classes
 

module.exports={Classes};

