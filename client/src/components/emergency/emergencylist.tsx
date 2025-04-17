import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Chip, Select, MenuItem, CircularProgress, Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../Navbar';

type Emergency = {
    _id: string;
    userId: string;
    type: string;
    location: string;
    notes: string;
    status: 'Pending' | 'Resolved' | 'Rejected' | 'Reviewing';
    createdAt: string;
};

const statusColor: Record<string, 'error' | 'success' | 'warning' | 'info'> = {
    Pending: 'warning',
    Resolved: 'success',
    Rejected: 'error',
    Reviewing: 'info',
};

const statusOptions = ['Pending', 'In Progress', 'Resolved'];

const EmergencyStatusTable: React.FC = () => {
    const [data, setData] = useState<Emergency[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/emergency/`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching emergencies:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            await axios.put(`http://localhost:5000/emergency/${id}`, { status: newStatus });
            fetchData(); // Refresh data
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div className="flex justify-center mt-10"><CircularProgress /></div>;
    }

    return (
        <>
            <Navbar>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4"
                >
                    <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
                        Emergency Status Overview
                    </Typography>
                    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell><strong>Type</strong></TableCell>
                                    <TableCell><strong>Location</strong></TableCell>
                                    <TableCell><strong>Notes</strong></TableCell>
                                    <TableCell><strong>Created</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                    <TableCell><strong>Action</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((emergency) => (
                                    <TableRow key={emergency._id}>
                                        <TableCell>{emergency.type}</TableCell>
                                        <TableCell>
                                            <a
                                                href={`https://www.google.com/maps?q=${encodeURIComponent(emergency.location)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#1976d2', textDecoration: 'underline' }}
                                            >
                                                {emergency.location}
                                            </a>
                                        </TableCell>

                                        <TableCell>{emergency.notes}</TableCell>
                                        <TableCell>{new Date(emergency.createdAt).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={emergency.status}
                                                color={statusColor[emergency.status]}
                                                sx={{ fontWeight: 'bold' }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={emergency.status}
                                                onChange={(e) => updateStatus(emergency._id, e.target.value)}
                                                size="small"
                                            >
                                                {statusOptions.map((status) => (
                                                    <MenuItem key={status} value={status} >
                                                        {status}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </motion.div>
            </Navbar>
        </>
    );
};

export default EmergencyStatusTable;
