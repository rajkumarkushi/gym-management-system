import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  People,
  AttachMoney,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';

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

// Demo Data
const profitData = [
  { month: 'Jan', profit: 15000 },
  { month: 'Feb', profit: 18000 },
  { month: 'Mar', profit: 16000 },
  { month: 'Apr', profit: 20000 },
  { month: 'May', profit: 22000 },
  { month: 'Jun', profit: 25000 },
];

const membershipData = [
  { month: 'Jan', current: 150, previous: 120 },
  { month: 'Feb', current: 180, previous: 140 },
  { month: 'Mar', current: 200, previous: 160 },
  { month: 'Apr', current: 220, previous: 180 },
  { month: 'May', current: 250, previous: 200 },
  { month: 'Jun', current: 280, previous: 220 },
];

const salesData = {
  monthly: [
    { name: 'Jan', sales: 12000 },
    { name: 'Feb', sales: 15000 },
    { name: 'Mar', sales: 18000 },
    { name: 'Apr', sales: 20000 },
    { name: 'May', sales: 22000 },
    { name: 'Jun', sales: 25000 },
  ],
  annually: [
    { name: '2019', sales: 150000 },
    { name: '2020', sales: 180000 },
    { name: '2021', sales: 220000 },
    { name: '2022', sales: 250000 },
    { name: '2023', sales: 300000 },
  ],
};

const newMembersData = {
  distribution: [
    { name: 'Walk-in', value: 30 },
    { name: 'Referral', value: 25 },
    { name: 'Online', value: 45 },
  ],
  trend: [
    { month: 'Jan', members: 20 },
    { month: 'Feb', members: 25 },
    { month: 'Mar', members: 30 },
    { month: 'Apr', members: 35 },
    { month: 'May', members: 40 },
    { month: 'Jun', members: 45 },
  ],
};

const COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4'];

export default function InsightsAnalytics() {
  const [salesPeriod, setSalesPeriod] = useState('monthly');

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Insights & Analytics
      </Typography>

      {/* Quick Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total Revenue
                  </Typography>
                  <MetricValue>$25,000</MetricValue>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'success.main',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <ArrowUpward fontSize="small" />
                    15%
                  </Typography>
                </Box>
                <IconButton>
                  <AttachMoney sx={{ color: 'primary.main' }} />
                </IconButton>
              </Box>
            </CardContent>
          </StatsCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Active Members
                  </Typography>
                  <MetricValue>280</MetricValue>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'success.main',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <ArrowUpward fontSize="small" />
                    12%
                  </Typography>
                </Box>
                <IconButton>
                  <People sx={{ color: 'primary.main' }} />
                </IconButton>
              </Box>
            </CardContent>
          </StatsCard>
        </Grid>

        {/* Add more quick stats cards here */}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Profit Chart */}
        <Grid item xs={12} md={6}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profit Overview
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={profitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area
                      type="monotone"
                      dataKey="profit"
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

        {/* Membership Comparison */}
        <Grid item xs={12} md={6}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Membership Growth
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={membershipData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="current"
                      stroke="#FFD700"
                      name="Current Year"
                    />
                    <Line
                      type="monotone"
                      dataKey="previous"
                      stroke="#FF6B6B"
                      name="Previous Year"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StatsCard>
        </Grid>

        {/* Sales Chart */}
        <Grid item xs={12} md={8}>
          <StatsCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Sales Overview</Typography>
                <FormControl size="small">
                  <Select
                    value={salesPeriod}
                    onChange={(e) => setSalesPeriod(e.target.value)}
                  >
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="annually">Annually</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData[salesPeriod]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="sales" fill="#FFD700" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StatsCard>
        </Grid>

        {/* New Members Distribution */}
        <Grid item xs={12} md={4}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                New Members Source
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={newMembersData.distribution}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {newMembersData.distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box display="flex" justifyContent="center" gap={2} mt={2}>
                  {newMembersData.distribution.map((entry, index) => (
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
                        {entry.name}: {entry.value}%
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