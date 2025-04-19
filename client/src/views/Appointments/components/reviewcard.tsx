import React from 'react';
import { Card, CardContent, Typography, Rating, Box, Avatar, Grid } from '@mui/material';

interface Review {
  _id: string;
  email: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <Typography>No reviews available.</Typography>;
  }

  return (
    <>
      {reviews.map((review) => (
        <Grid sx={{width:"600px", marginTop:"20px"}} item xs={12} sm={6} md={4} key={review._id}>
          <Card sx={{ boxShadow: 4, borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
                  {review.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6">{review.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.email}
                  </Typography>
                </Box>
              </Box>

              <Rating value={review.rating} readOnly />
              <Typography variant="body1" mt={2}>
                {review.comment || 'No comment provided.'}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                {new Date(review.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default ReviewList;
