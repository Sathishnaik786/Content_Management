import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const dummyContent = [
  { id: 1, title: "Nike Air Max Promo", type: "sponsored", link: "https://nike.com/airmax" },
  { id: 2, title: "Coca-Cola Summer Campaign", type: "sponsored", link: "https://coca-cola.com/summer" },
  { id: 3, title: "Apple iPhone 15 Collaboration", type: "branded", link: "https://apple.com/iphone15" },
  { id: 4, title: "Adidas Sportswear Partnership", type: "branded", link: "https://adidas.com/sportswear" },
  { id: 5, title: "Influencer Partnership with Samsung", type: "branded", link: "https://samsung.com/influencer" },
  { id: 6, title: "FTC Disclosure for Affiliate Links", type: "disclosure", link: "https://ftc.gov/disclosure" },
  { id: 7, title: "YouTube Sponsorship Disclosure", type: "disclosure", link: "https://youtube.com/sponsorship-rules" }
];

const AffiliateSponsoredManagement = () => {
  const [analytics, setAnalytics] = useState(
    dummyContent.map((item) => ({ ...item, clicks: 0 }))
  );

  const trackClick = (id) => {
    setAnalytics((prevAnalytics) =>
      prevAnalytics.map((item) =>
        item.id === id ? { ...item, clicks: item.clicks + 1 } : item
      )
    );
  };

  const createPieData = (data) => ({
    labels: data.map((item) => item.title),
    datasets: [
      {
        data: data.map((item) => item.clicks),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0", "#F44336"],
      },
    ],
  });

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Affiliate & Sponsored Content
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {analytics.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={() => trackClick(item.id)}>
                    {item.link}
                  </a>
                </TableCell>
                <TableCell>{item.clicks}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => trackClick(item.id)}>
                    Track Click
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
        Analytics
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div style={{ width: "30%" }}>
          <Typography variant="h6">Clicks Pie Chart</Typography>
          <Pie data={createPieData(analytics)} />
        </div>
      </div>
    </div>
  );
};

export default AffiliateSponsoredManagement;