import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Grid,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';

interface Emergency {
  _id: string;
  userId: string;
  type: string;
  location: string;
  notes: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  createdAt: string;
}

const statusColor = {
  Pending: 'warning',
  'In Progress': 'info',
  Resolved: 'success',
};

const EmergencyStatusPage: React.FC = () => {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/emergency/68013ec7c987e57fe93e0055')
      .then((res) => {
        setEmergencies(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
   <>
   <Navbar>
   <Box className="p-4" sx={{ maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight={700}>
        Emergency Status Dashboard
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {emergencies.map((emergency) => (
            <Grid item xs={12} sm={6} md={4} key={emergency._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card
                  sx={{
                    borderLeft: `6px solid`,
                    borderColor: `${statusColor[emergency.status]}.main`,
                    borderRadius: 3,
                    boxShadow: 6,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Type: {emergency.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Location: {emergency.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Notes: {emergency.notes || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Reported On:{' '}
                      {new Date(emergency.createdAt).toLocaleString()}
                    </Typography>

                    <Chip
                      label={emergency.status}
                      color={statusColor[emergency.status] as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}

                      sx={{ mt: 2, fontWeight: 'bold' }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
   </Navbar>
   </>
  );
};

export default EmergencyStatusPage;
