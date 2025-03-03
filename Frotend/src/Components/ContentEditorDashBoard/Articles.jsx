import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentTable from "./ContentTable";

const Articles = ({ statusFilter, handleStatusChange }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/articles"); // Adjust API URL if needed
        setArticles(response.data);
      } catch (err) {
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <ContentTable rows={articles} statusFilter={statusFilter} handleStatusChange={handleStatusChange} />;
};

export default Articles;
