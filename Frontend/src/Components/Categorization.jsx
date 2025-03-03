import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Tabs, Tab, Box, Typography, Card, CardContent, Grid, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Dashboard = () => {
  const [selectedTime, setSelectedTime] = useState("today");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  const [categoryData, setCategoryData] = useState({});

  const timeFilters = ["today", "yesterday", "monthYear"];
  const subCategories = ["All", "Articles", "Videos", "Tutorials", "Webinars"];

  // Fetch data from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then((response) => {
        const data = response.data;
        const formattedData = {};

        data.forEach((item) => {
          if (!formattedData[item.type]) {
            formattedData[item.type] = [];
          }
          formattedData[item.type].push({ name: item.name, count: item.count });
        });

        setCategoryData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter data based on selected time and subcategory
  const getFilteredData = () => {
    if (!categoryData || Object.keys(categoryData).length === 0) return [];

    if (selectedSubCategory === "All") {
      return Object.values(categoryData)
        .flat()
        .reduce((acc, item) => {
          let existing = acc.find((el) => el.name === item.name);
          if (existing) {
            existing.count += item.count;
          } else {
            acc.push({ ...item });
          }
          return acc;
        }, []);
    }
    return categoryData[selectedSubCategory] || [];
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Box display="flex" justifyContent="center" gap={2} my={2}>
          {timeFilters.map((time) => (
            <Button key={time} variant={selectedTime === time ? "contained" : "outlined"} onClick={() => { setSelectedTime(time); setSelectedSubCategory("All"); }}>
              {time === "monthYear" ? "Month/Year" : time.charAt(0).toUpperCase() + time.slice(1)}
            </Button>
          ))}
        </Box>

        {selectedTime === "monthYear" && (
          <Box display="flex" justifyContent="center" gap={2} my={2}>
            <DatePicker
              views={["year", "month", "day"]}
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              views={["year", "month", "day"]}
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        )}

        <Tabs value={selectedSubCategory} onChange={(e, newValue) => setSelectedSubCategory(newValue)} centered>
          {subCategories.map((sub, index) => (
            <Tab key={index} label={sub} value={sub} />
          ))}
        </Tabs>

        <Grid container spacing={2} justifyContent="center" mt={2}>
          {getFilteredData().map((category, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Card sx={{ textAlign: "center", p: 1, backgroundColor: "#f5f5f5", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="subtitle1" color="primary" fontWeight="bold">{category.name}</Typography>
                    <Typography variant="h6" color="green">{category.count}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </LocalizationProvider>
  );
};

export default Dashboard;
