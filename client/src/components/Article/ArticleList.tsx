import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Box,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import Navbar from "../Navbar";

const MotionCard = motion(Card);
const MotionModal = motion(Modal);

interface Article {
  _id: string;
  title: string;
  author: string;
  content: string;
  date: string;
}

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [authorFilter, setAuthorFilter] = useState<string>("All");

  useEffect(() => {
    axios
      .get<Article[]>("http://localhost:5000/articles")
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setLoading(false);
      });
  }, []);

  const handleClose = () => setSelectedArticle(null);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAuthor =
      authorFilter === "All" || article.author === authorFilter;

    return matchesSearch && matchesAuthor;
  });

  const uniqueAuthors = Array.from(new Set(articles.map((a) => a.author)));

  return (
    <>
      <Navbar>
        <Container sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom align="center" fontWeight={600}>
            📰 Latest Articles
          </Typography>

          {/* Search and Filter */}
          <Box display="flex" justifyContent="space-between" alignItems="center" my={3} flexWrap="wrap" gap={2}>
            <TextField
              label="Search by title or author"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <SearchIcon /> */}
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
            />

            <FormControl size="small" sx={{ width: 200 }}>
              <InputLabel>Filter by Author</InputLabel>
              <Select
                value={authorFilter}
                label="Filter by Author"
                onChange={(e) => setAuthorFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {uniqueAuthors.map((author) => (
                  <MenuItem key={author} value={author}>
                    {author}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {filteredArticles.map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={article._id}>
                  <MotionCard
                    whileHover={{
                      scale: 1.05,
                      background: "linear-gradient(145deg, #ffe6f0, #e0f7fa)",
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    sx={{
                      backdropFilter: "blur(10px)",
                      background: "linear-gradient(145deg, #ffffffcc, #f0f0f0cc)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      borderRadius: "20px",
                      height: "100%",
                      p: 2,
                      transition: "background 0.3s ease-in-out",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedArticle(article)}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        ✍️ {article.author}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1.5 }}>
                        {article.content.slice(0, 100)}...
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        📅 {new Date(article.date).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Modal for full article view */}
          <MotionModal
            open={!!selectedArticle}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={!!selectedArticle}>
              <Box
                component={motion.div}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                  position: "absolute" as const,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: "90%", sm: 500 },
                  bgcolor: "#ffffffee",
                  borderRadius: 4,
                  boxShadow: 24,
                  p: 4,
                  backdropFilter: "blur(8px)",
                }}
              >
                <IconButton
                  onClick={handleClose}
                  sx={{ position: "absolute", top: 10, right: 10 }}
                >
                  ❌
                </IconButton>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  {selectedArticle?.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  ✍️ {selectedArticle?.author} | 📅{" "}
                  {new Date(selectedArticle?.date || "").toLocaleDateString()}
                </Typography>
                <Typography variant="body1" mt={2}>
                  {selectedArticle?.content}
                </Typography>
              </Box>
            </Fade>
          </MotionModal>
        </Container>
      </Navbar>
    </>
  );
};

export default ArticleList;
