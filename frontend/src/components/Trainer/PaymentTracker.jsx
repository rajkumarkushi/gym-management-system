import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const mockPayments = [
  { id: 1, date: '2023-05-01', amount: 2000, status: 'Paid' },
  { id: 2, date: '2023-06-01', amount: 2000, status: 'Pending' },
  { id: 3, date: '2023-07-01', amount: 2000, status: 'Not Paid' },
];

export default function PaymentTracker() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Payment Tracker
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell component="th" scope="row">
                        {payment.date}
                      </TableCell>
                      <TableCell align="right">${payment.amount}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

