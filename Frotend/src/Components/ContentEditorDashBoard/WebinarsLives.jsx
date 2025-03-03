import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

const WebinarsLives = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogState, setDialogState] = useState({
    time: false,
    date: false,
    reminder: false,
    preview: false,
  });
  const [selectedWebinar, setSelectedWebinar] = useState(null);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/webinars");
        setWebinars(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch webinars");
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  const toggleDialog = (type, webinar = null) => {
    setSelectedWebinar(webinar);
    setDialogState((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4">Webinars & Live Sessions</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {webinars.map((webinar) => (
              <TableRow key={webinar._id}>
                <TableCell>{webinar.title}</TableCell>
                <TableCell>{webinar.date}</TableCell>
                <TableCell>{webinar.time}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => toggleDialog("preview", webinar)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => toggleDialog("reminder", webinar)}
                  >
                    Set Reminder
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Preview Dialog */}
      <Dialog
        open={dialogState.preview}
        onClose={() => toggleDialog("preview")}
      >
        <DialogTitle>Preview Webinar</DialogTitle>
        <DialogContent>
          {selectedWebinar && (
            <Typography>{selectedWebinar.description}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleDialog("preview")} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reminder Dialog */}
      <Dialog
        open={dialogState.reminder}
        onClose={() => toggleDialog("reminder")}
      >
        <DialogTitle>Set Reminder</DialogTitle>
        <DialogContent>
          <Typography>Reminder for: {selectedWebinar?.title}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleDialog("reminder")} color="primary">
            Cancel
          </Button>
          <Button onClick={() => toggleDialog("reminder")} color="secondary">
            Set Reminder
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WebinarsLives;