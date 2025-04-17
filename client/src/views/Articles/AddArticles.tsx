import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import Navbar from "../../components/Navbar";

interface Article {
  title: string;
  content: string;
  author: string;
  date: string;
}

const AddArticleForm: React.FC = () => {
  const [article, setArticle] = useState<Article>({
    title: "",
    content: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/articles/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });

      if (res.ok) {
        alert("Article added successfully!");
        setArticle({ title: "", content: "", author: "", date: new Date().toISOString().split("T")[0] });
      } else {
        alert("Failed to add article.");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding article.");
    }
  };

  return (
   <>
   <Navbar>
   <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h5" mb={3} fontWeight="bold" align="center">
          📝 Add New Article
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={article.title}
            onChange={handleChange}
            required
          />
          <TextField
            name="content"
            label="Content"
            variant="outlined"
            multiline
            minRows={4}
            value={article.content}
            onChange={handleChange}
            required
          />
          <TextField
            name="author"
            label="Author"
            variant="outlined"
            value={article.author}
            onChange={handleChange}
            required
          />
          <TextField
            name="date"
            type="date"
            label="Date"
            value={article.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Submit Article
          </Button>
        </Box>
      </Paper>
    </Box>
   </Navbar>
   </>
  );
};

export default AddArticleForm;
