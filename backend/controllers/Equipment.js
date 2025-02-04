const { db } = require('../firebaseconfig');

// Get all equipment
const getAllEquipments = async (req, res) => {
  try {
    const equipmentsSnapshot = await db.collection('equipments').get();
    const equipments = [];
    equipmentsSnapshot.forEach((doc) => {
      equipments.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(equipments);
  } catch (error) {
    console.error('Error fetching equipments:', error);
    res.status(500).json({ error: 'Failed to fetch equipments' });
  }
};

// Add new equipment
const addEquipment = async (req, res) => {
  try {
    const { name, category, weight, quantity, description, status } = req.body;

    const equipmentData = {
      name,
      category,
      weight: Number(weight),
      quantity: Number(quantity),
      description: description || '',
      status: status || 'available',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection('equipments').add(equipmentData);
    res.status(201).json({ id: docRef.id, ...equipmentData });
  } catch (error) {
    console.error('Error adding equipment:', error);
    res.status(500).json({ error: 'Failed to add equipment' });
  }
};

// Update equipment
const updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const equipmentRef = db.collection('equipments').doc(id);
    const updateData = { 
      ...req.body, 
      updatedAt: new Date().toISOString() 
    };

    await equipmentRef.update(updateData);
    res.status(200).json({ id, ...updateData });
  } catch (error) {
    console.error('Error updating equipment:', error);
    res.status(500).json({ error: 'Failed to update equipment' });
  }
};

// Delete equipment
const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const equipmentRef = db.collection('equipments').doc(id);
    const equipmentDoc = await equipmentRef.get();

    if (!equipmentDoc.exists) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    await equipmentRef.delete();
    res.status(200).json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
};

module.exports = {
  getAllEquipments,
  addEquipment,
  updateEquipment,
  deleteEquipment
};