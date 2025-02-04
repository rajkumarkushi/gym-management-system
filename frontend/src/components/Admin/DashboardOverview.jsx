import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Skeleton,
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import {
  People,
  FitnessCenter,
  TrendingUp,
  AttachMoney,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  CalendarToday,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Styled Components
const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

const COLORS = ['#FFD700', '#2A2A3C'];

export default function DashboardOverview() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/auth/stats');
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setDashboardData(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      setLoading(false);
    }
  };

  const renderStatsCard = (title, value, icon, trend) => (
    <StatsCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
            <MetricValue>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </MetricValue>
            {trend && (
              <Typography
                variant="body2"
                sx={{
                  color: trend >= 0 ? 'success.main' : 'error.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                {trend >= 0 ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                {Math.abs(trend)}%
              </Typography>
            )}
          </Box>
          <IconButton size="small">
            {icon}
          </IconButton>
        </Box>
      </CardContent>
    </StatsCard>
  );

  if (loading) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="rectangular" height={60} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Quick Stats Section */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          {renderStatsCard(
            'Total Members',
            dashboardData?.totalMembers,
            <People sx={{ color: 'primary.main' }} />,
            5 // Example trend value
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderStatsCard(
            'Active Trainers',
            dashboardData?.activeTrainers,
            <FitnessCenter sx={{ color: 'primary.main' }} />,
            2
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderStatsCard(
            'Monthly Revenue',
            `$${dashboardData?.monthlyRevenue?.toLocaleString()}`,
            <AttachMoney sx={{ color: 'primary.main' }} />,
            8
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderStatsCard(
            'Active Classes',
            dashboardData?.activeClasses,
            <CalendarToday sx={{ color: 'primary.main' }} />,
            -3
          )}
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <StatsCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Revenue Overview</Typography>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardData?.revenueTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#FFD700"
                      fill="#FFD700"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StatsCard>
        </Grid>

        {/* Membership Distribution */}
        <Grid item xs={12} md={4}>
          <StatsCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Membership Status</Typography>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Box height={300} display="flex" flexDirection="column" alignItems="center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData?.membershipDistribution || []}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dashboardData?.membershipDistribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Members']} />
                  </PieChart>
                </ResponsiveContainer>
                <Box display="flex" justifyContent="center" gap={2}>
                  {dashboardData?.membershipDistribution?.map((entry, index) => (
                    <Box key={entry.name} display="flex" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: COLORS[index],
                        }}
                      />
                      <Typography variant="body2">
                        {entry.name}: {entry.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>
    </Box>
  );
}