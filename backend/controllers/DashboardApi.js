const { db } = require('../firebaseconfig');

// Get dashboard overview stats
const getDashboardStats = async (req, res) => {
  try {
    // Get members count
    const membersSnapshot = await db.collection('gymusers')
      .where('status', '==', 'active')
      .get();
    const totalMembers = membersSnapshot.size;

    // Get trainers count
    const trainersSnapshot = await db.collection('gymusers')
      .where('status', '==', 'active')
      .get();
    const activeTrainers = trainersSnapshot.size;

    // Get monthly revenue
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const revenueSnapshot = await db.collection('gymusers')
      .where('paymentDate', '>=', new Date(currentYear, currentMonth, 1))
      .where('paymentDate', '<=', new Date(currentYear, currentMonth + 1, 0))
      .get();
    
    let monthlyRevenue = 0;
    revenueSnapshot.forEach(doc => {
      monthlyRevenue += doc.data().amount;
    });

    // Get active classes
    const classesSnapshot = await db.collection('classes')
      .where('status', '==', 'active')
      .get();
    const activeClasses = classesSnapshot.size;

    // Get revenue trends
    const revenueTrends = await getRevenueTrends();

    // Get membership distribution
    const membershipStats = await getMembershipDistribution();

    res.status(200).json({
      totalMembers,
      activeTrainers,
      monthlyRevenue,
      activeClasses,
      revenueTrends,
      membershipStats,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
};

// Helper functions for trends and distribution
const getRevenueTrends = async () => {
  const trends = [];
  const currentDate = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
    
    const snapshot = await db.collection('payments')
      .where('paymentDate', '>=', month)
      .where('paymentDate', '<=', endOfMonth)
      .get();
    
    let monthlyTotal = 0;
    snapshot.forEach(doc => {
      monthlyTotal += doc.data().amount;
    });

    trends.push({
      month: month.toLocaleString('default', { month: 'short' }),
      amount: monthlyTotal
    });
  }
  
  return trends;
};

const getMembershipDistribution = async () => {
  const activeMembers = await db.collection('members')
    .where('status', '==', 'active')
    .get();
  
  const inactiveMembers = await db.collection('members')
    .where('status', '==', 'inactive')
    .get();

  return [
    { name: 'Active', value: activeMembers.size },
    { name: 'Inactive', value: inactiveMembers.size }
  ];
};

module.exports = {
  getDashboardStats
};