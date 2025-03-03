import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentTable from "./ContentTable";

const TutorialsGuides = ({ statusFilter, handleStatusChange }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tutorials"); // Adjust URL as needed
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };

    fetchTutorials();
  }, []);

  return <ContentTable rows={rows} statusFilter={statusFilter} handleStatusChange={handleStatusChange} />;
};

export default TutorialsGuides;
