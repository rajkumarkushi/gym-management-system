const { db } = require('../firebaseconfig');

// Fetch all vendors and equipment
const getVendors = async (req, res) => {
  try {
    const vendorsSnapshot = await db.collection('vendor').get();
    const vendors = [];
    vendorsSnapshot.forEach((doc) => {
      vendors.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
};

// Add a new vendor or equipment
const addVendor = async (req, res) => {
  try {
    const { name, contact, equipment } = req.body;
    const vendorData = {
      name,
      contact,
      equipment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection('vendor').add(vendorData);
    res.status(201).json({ id: docRef.id, ...vendorData });
  } catch (error) {
    console.error('Error adding vendor:', error);
    res.status(500).json({ error: 'Failed to add vendor' });
  }
};

// Update vendor or equipment data
const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { 
      ...req.body, 
      updatedAt: new Date().toISOString() 
    };

    await db.collection('vendor').doc(id).update(updateData);
    res.status(200).json({ id, ...updateData });
  } catch (error) {
    console.error('Error updating vendor:', error);
    res.status(500).json({ error: 'Failed to update vendor' });
  }
};

// Delete a vendor or equipment record
const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('vendor').doc(id).delete();
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    res.status(500).json({ error: 'Failed to delete vendor' });
  }
};

// Fetch maintenance schedules
const getMaintenanceSchedules = async (req, res) => {
  try {
    const maintenanceSnapshot = await db.collection('maintenance').get();
    const maintenanceSchedules = [];
    maintenanceSnapshot.forEach((doc) => {
      maintenanceSchedules.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(maintenanceSchedules);
  } catch (error) {
    console.error('Error fetching maintenance schedules:', error);
    res.status(500).json({ error: 'Failed to fetch maintenance schedules' });
  }
};

module.exports = {
  getVendors,
  addVendor,
  updateVendor,
  deleteVendor,
  getMaintenanceSchedules
};