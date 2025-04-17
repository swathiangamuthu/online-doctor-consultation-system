import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../Navbar';
import useTypedSelector from '../../hooks/useTypedSelector';
import { selectedUserId } from '../../redux/auth/authSlice';

const emergencyTypes = ['Medical', 'Fire', 'Crime', 'Accident', 'Other'];

const EmergencyReportForm: React.FC = () => {
  const [type, setType] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
    const userId = useTypedSelector(selectedUserId);
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
      setLocation(coords);
    });
  }, []);
console.log(userId);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/emergency/report', {
        type,
        location,
        notes,
        userId: userId,
      });
      setSuccessMsg('Emergency reported successfully!');
      setType('');
      setNotes('');
    } catch (error) {
      console.error('Error reporting emergency:', error);
      setSuccessMsg('Something went wrong. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Navbar>
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        px: 2,
      }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card sx={{ maxWidth: 500, width: '100%', p: 3, borderRadius: 4, boxShadow: 10 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center" fontWeight={600}>
              🚨 Report Emergency
            </Typography>
            <TextField
              select
              fullWidth
              label="Emergency Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{ mb: 2 }}
            >
              {emergencyTypes.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Location"
              value={location}
              disabled
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Emergency'}
            </Button>
            {successMsg && (
              <Typography
                variant="body2"
                color="success.main"
                align="center"
                sx={{ mt: 2 }}
              >
                {successMsg}
              </Typography>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
    </Navbar>
    </>
  );
};

export default EmergencyReportForm;
