import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Close, Notifications } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const contentTypes = [
  { id: 1, title: "📝 Articles", description: "Rich text, images, embedded media." },
  { id: 2, title: "📹 Videos", description: "Hosted content with adaptive streaming." },
  { id: 3, title: "📖 Interactive Guides", description: "Step-by-step tutorials with interactive elements." },
  { id: 4, title: "🎤 Webinars & Live Sessions", description: "Scheduled live video sessions with chat/Q&A." },
];

const Scheduling = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(dayjs());
  const [openDialog, setOpenDialog] = useState(false);
  const [scheduledMessages, setScheduledMessages] = useState([]);
  const [sentReminders, setSentReminders] = useState([]); // Stores sent reminders

  // Check for scheduled messages every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setScheduledMessages((prevMessages) => {
        const now = dayjs();
        return prevMessages.filter((msg) => {
          if (now.isAfter(dayjs(msg.scheduledAt))) {
            console.log(`🔔 Reminder Sent: "${msg.title}" at ${dayjs().format("MMMM D, YYYY h:mm A")}`);
            setSentReminders((prev) => [...prev, msg]); // Move to sent reminders
            return false; // Remove from scheduled list
          }
          return true;
        });
      });
    }, 10000); // Runs every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handlers = {
    openDialog: (content) => {
      setSelectedContent(content);
      setScheduleDate(dayjs());
      setOpenDialog(true);
    },
    closeDialog: () => setOpenDialog(false),
    scheduleContent: () => {
      if (!selectedContent) return;

      const confirmation = window.confirm(
        `Content \"${selectedContent.title}\" scheduled for: ${scheduleDate.format("MMMM D, YYYY h:mm A")}\n\nClick OK to confirm.`
      );

      if (confirmation) {
        const newMessage = {
          id: new Date().getTime(),
          title: selectedContent.title,
          scheduledAt: scheduleDate.toISOString(),
          relativeTime: scheduleDate.fromNow(),
        };

        setScheduledMessages((prev) => [...prev, newMessage]);
        setOpenDialog(false);
      }
    },
    clearMessages: () => {
      setScheduledMessages([]);
      setSentReminders([]);
    },
  };

  return (
    <Box sx={{ p: 4, maxWidth: "900px", mx: "auto", textAlign: "center" }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3, color: "#1976D2" }}>
        📅 Schedule Your Content
      </Typography>

      <Grid container spacing={4}>
        {contentTypes.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)", background: "#E3F2FD" },
              }}
              onClick={() => handlers.openDialog(item)}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976D2", mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#555" }}>{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handlers.closeDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Schedule Content
          <IconButton onClick={handlers.closeDialog} color="error">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedContent && (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {selectedContent.title}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker value={scheduleDate} onChange={setScheduleDate} />
              </LocalizationProvider>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlers.closeDialog} color="error" variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handlers.scheduleContent}>
            Schedule Content
          </Button>
        </DialogActions>
      </Dialog>

      {scheduledMessages.length > 0 && (
        <Box sx={{ mt: 4, p: 2, background: "#F5F5F5", borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976D2", mb: 2 }}>
            ✅ Scheduled Content
          </Typography>
          <List>
            {scheduledMessages.map((msg) => (
              <React.Fragment key={msg.id}>
                <ListItem>
                  <ListItemText
                    primary={`${msg.title} 📅 ${dayjs(msg.scheduledAt).format("MMMM D, YYYY h:mm A")}`}
                    secondary={`⏳ ${dayjs(msg.scheduledAt).fromNow()}`} // Dynamic update
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}

      {sentReminders.length > 0 && (
        <Box sx={{ mt: 4, p: 2, background: "#FFF3E0", borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#D84315", mb: 2 }}>
            🔔 Sent Reminders
          </Typography>
          <List>
            {sentReminders.map((msg) => (
              <React.Fragment key={msg.id}>
                <ListItem>
                  <ListItemText
                    primary={`✅ ${msg.title} (Sent)`}
                    secondary={`📅 ${dayjs(msg.scheduledAt).format("MMMM D, YYYY h:mm A")}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}

      <Button variant="contained" color="error" onClick={handlers.clearMessages} sx={{ mt: 2 }}>
        Clear All
      </Button>
    </Box>
  );
};

export default Scheduling;