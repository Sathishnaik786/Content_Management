import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentTable from "./ContentTable";

const Videos = ({ statusFilter, handleStatusChange }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/videos"); // Adjust URL as needed
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return <ContentTable rows={rows} statusFilter={statusFilter} handleStatusChange={handleStatusChange} />;
};

export default Videos;
