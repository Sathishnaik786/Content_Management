import React, { useState, useEffect } from "react";
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardMedia, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, Badge, Box, TextField, Popover, Snackbar, Alert, Typography, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, useMediaQuery, useTheme, Grid,
} from "@mui/material";
import { Favorite, ThumbDown, Comment, Share, Delete, Visibility, Close, Send } from "@mui/icons-material";

const ContentTable = ({ rows, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentComment, setCurrentComment] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [comments, setComments] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [rowsData, setRowsData] = useState(rows);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [statusCounts, setStatusCounts] = useState({});

  // Color scheme
  const colors = {
    primary: "#3a86ff",
    secondary: "#8338ec",
    success: "#06d6a0",
    warning: "#ffbe0b",
    error: "#ef476f",
    pending: "#118ab2",
    background: "#f1faee",
    cardBg: "#ffffff",
    lightBg: "#e9f5db",
    tableBg: "#f8f9fa",
    tableRowHover: "#e0fbfc",
    tableHeaderBg: "#d8e2dc",
    borderLight: "#e0e0e0",
    textPrimary: "#1d3557",
    textSecondary: "#457b9d"
  };

  // Calculate status counts for badge display
  useEffect(() => {
    const counts = {
      All: rowsData.length,
      Posted: rowsData.filter(row => row.status === "Posted").length,
      Verified: rowsData.filter(row => row.status === "Verified").length,
      Pending: rowsData.filter(row => row.status === "Pending").length,
      Rejected: rowsData.filter(row => row.status === "Rejected").length
    };
    setStatusCounts(counts);
  }, [rowsData]);

  // Handle image click for preview
  const handleImageClick = (image, title, description) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    setSelectedDescription(description);
    setPreviewDialogOpen(true);
  };

  // Handle status filter change
  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  // Handle like button click
  const handleLike = (id) => {
    setLikes((prevLikes) => {
      const alreadyLiked = prevLikes[id];
      return {
        ...prevLikes,
        [id]: alreadyLiked ? 0 : 1, // Toggle Like
      };
    });

    // Remove dislike if it exists
    setDislikes((prevDislikes) => ({
      ...prevDislikes,
      [id]: 0, // Reset Dislike if Liked
    }));
  };

  // Handle dislike button click
  const handleDislike = (id) => {
    setDislikes((prevDislikes) => {
      const alreadyDisliked = prevDislikes[id];
      return {
        ...prevDislikes,
        [id]: alreadyDisliked ? 0 : 1, // Toggle Dislike
      };
    });

    // Remove like if it exists
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: 0, // Reset Like if Disliked
    }));
  };

  // Comment functionality
  const handleCommentClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setCurrentUser(user);
    setCurrentComment("");
  };

  const handleCommentClose = () => {
    setAnchorEl(null);
    setCurrentComment("");
  };

  const handleCommentSubmit = () => {
    if (!currentComment.trim()) return;

    setComments((prevComments) => ({
      ...prevComments,
      [currentUser.id]: [...(prevComments[currentUser.id] || []), currentComment],
    }));

    handleCommentClose();
    setSnackbarMessage(`Message sent to ${currentUser.name}!`);
    setSnackbarOpen(true);
  };

  // Handle share button click
  const handleShare = (title, description) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href,
      })
        .then(() => setSnackbarMessage("Content shared successfully!"))
        .catch((error) => setSnackbarMessage("Error sharing content: " + error));
    } else {
      setSnackbarMessage("Web Share API is not supported in your browser.");
    }
    setSnackbarOpen(true);
  };

  // Handle delete button click
  const handleDelete = (id) => {
    setRowsData((prevRows) => prevRows.filter((row, idx) => idx !== id));
    if (onDelete) {
      onDelete(id);
    }
    setSnackbarMessage("Content deleted!");
    setSnackbarOpen(true);
  };

  // Rejection functionality
  const handleRejectionDialogOpen = (id) => {
    setSelectedRowId(id);
    setRejectionDialogOpen(true);
  };

  const handleRejectionDialogClose = () => {
    setRejectionDialogOpen(false);
    setRejectionReason("");
    setOtherReason("");
  };

  const handleRejectionReasonChange = (event) => {
    setRejectionReason(event.target.value);
  };

  const handleOtherReasonChange = (event) => {
    setOtherReason(event.target.value);
  };

  const handleRejectionSubmit = () => {
    if (rejectionReason === "Other" && !otherReason) {
      setSnackbarMessage("Please provide a reason for rejection.");
      setSnackbarOpen(true);
      return;
    }

    const reason = rejectionReason === "Other" ? otherReason : rejectionReason;

    // Create a new array with updated status to avoid mutation issues
    const updatedRows = [...rowsData];
    updatedRows[selectedRowId] = {
      ...updatedRows[selectedRowId],
      status: "Rejected",
      rejectionReason: reason
    };

    setRowsData(updatedRows);
    setSnackbarMessage(`Content rejected. Reason: ${reason}`);
    setSnackbarOpen(true);
    handleRejectionDialogClose();
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Posted": return colors.warning;
      case "Verified": return colors.success;
      case "Rejected": return colors.error;
      case "Pending": return colors.pending;
      default: return colors.primary;
    }
  };

  // Filter rows by status
  const filteredRows = statusFilter === "All"
    ? rowsData
    : rowsData.filter(row => row.status === statusFilter);

  return (
    <Box sx={{
      padding: isMobile ? 1 : 3,
      backgroundColor: colors.background,
      borderRadius: 2,
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
    }}>
      {/* Status Selection - Responsive Grid */}
      <Grid container spacing={1} sx={{ mb: 3, justifyContent: "center" }}>
        {["All", "Posted", "Verified", "Pending", "Rejected"].map((status) => {
          const statusColor = status === "All" ? colors.primary : getStatusColor(status);
          return (
            <Grid item key={status}>
              <Badge
                badgeContent={statusCounts[status] || 0}
                color="error"
                sx={{ 
                  "& .MuiBadge-badge": { 
                    fontSize: "0.7rem", 
                    backgroundColor: colors.error 
                  } 
                }}
              >
                <Button
                  variant={statusFilter === status ? "contained" : "outlined"}
                  color="inherit"
                  onClick={() => handleStatusChange(status)}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    minWidth: isMobile ? '70px' : '100px',
                    borderRadius: "20px",
                    borderColor: statusFilter !== status ? statusColor : "transparent",
                    boxShadow: statusFilter === status ? 3 : 0,
                    backgroundColor: statusFilter === status ? statusColor : "transparent",
                    color: statusFilter === status ? "#fff" : statusColor,
                    "&:hover": {
                      backgroundColor: statusFilter === status ? statusColor : `${statusColor}22`,
                      borderColor: statusColor
                    },
                    transition: "all 0.3s ease"
                  }}
                >
                  {status}
                </Button>
              </Badge>
            </Grid>
          );
        })}
      </Grid>

      {/* Table or Mobile Cards */}
      {isMobile ? (
        // Mobile Card View
        <Box>
          {filteredRows.length > 0 ? (
            filteredRows.map((row, index) => (
              <Card key={index} sx={{ 
                mb: 2, 
                borderRadius: 2, 
                overflow: "hidden", 
                boxShadow: 2,
                borderLeft: `4px solid ${getStatusColor(row.status)}`
              }}>
                <Box sx={{ 
                  p: 2, 
                  display: "flex", 
                  alignItems: "center", 
                  backgroundColor: colors.lightBg 
                }}>
                  <img
                    src={row.image}
                    alt="Preview"
                    style={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: "8px", 
                      objectFit: "cover",
                      border: `2px solid ${getStatusColor(row.status)}`
                    }}
                    onClick={() => handleImageClick(row.image, row.title, row.description)}
                  />
                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold" color={colors.textPrimary}>{row.title}</Typography>
                    <Typography variant="body2" color={colors.textSecondary} noWrap>{row.description}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          fontSize: "0.7rem",
                          padding: "2px 8px",
                          backgroundColor: getStatusColor(row.status),
                          color: "#fff",
                          mr: 1,
                          borderRadius: "12px"
                        }}
                      >
                        {row.status}
                      </Button>
                      <Typography variant="caption" sx={{ color: colors.textSecondary }}>User: {row.user.name}</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-around", 
                  p: 1, 
                  borderTop: `1px solid ${colors.borderLight}`,
                  backgroundColor: colors.cardBg 
                }}>
                  <IconButton size="small" sx={{ color: "#ff4d6d" }} onClick={() => handleLike(index)}>
                    <Favorite fontSize="small" />
                    <Typography variant="caption" sx={{ ml: 0.5 }}>{likes[index] || 0}</Typography>
                  </IconButton>
                  <IconButton size="small" sx={{ color: "#748cab" }} onClick={() => handleDislike(index)}>
                    <ThumbDown fontSize="small" />
                    <Typography variant="caption" sx={{ ml: 0.5 }}>{dislikes[index] || 0}</Typography>
                  </IconButton>
                  <IconButton size="small" sx={{ color: "#457b9d" }} onClick={(event) => handleCommentClick(event, row.user)}>
                    <Comment fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "#3a86ff" }} onClick={() => handleShare(row.title, row.description)}>
                    <Share fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "#ef476f" }} onClick={() => handleDelete(index)}>
                    <Delete fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: "#ff9e00" }}
                    onClick={() => handleRejectionDialogOpen(index)}
                    disabled={row.status === "Rejected"}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            ))
          ) : (
            <Paper sx={{ 
              p: 3, 
              textAlign: "center", 
              borderRadius: 2,
              backgroundColor: colors.cardBg,
              color: colors.textPrimary
            }}>
              <Typography variant="body1">No content found matching the selected filter</Typography>
            </Paper>
          )}
        </Box>
      ) : (
        // Desktop Table View
        <TableContainer component={Paper} sx={{ 
          borderRadius: 2, 
          boxShadow: 3,
          overflow: "hidden"
        }}>
          <Table>
            <TableHead sx={{ backgroundColor: colors.tableHeaderBg }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: colors.textPrimary }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.textPrimary }}>Description</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.textPrimary }}>Preview</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.textPrimary }}>User Details</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.textPrimary }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.textPrimary }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: colors.tableBg },
                      "&:hover": { backgroundColor: colors.tableRowHover },
                      transition: "background-color 0.2s ease",
                      borderLeft: `4px solid ${getStatusColor(row.status)}`
                    }}
                  >
                    <TableCell sx={{ color: colors.textPrimary }}>{row.title}</TableCell>
                    <TableCell sx={{ color: colors.textSecondary }}>{row.description}</TableCell>
                    <TableCell>
                      {row.videoLink ? (
                        <iframe
                          width="100"
                          height="60"
                          src={row.videoLink}
                          title={row.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <img
                          src={row.image}
                          alt="Preview"
                          style={{ 
                            width: 60, 
                            height: 60, 
                            cursor: "pointer", 
                            borderRadius: "8px", 
                            objectFit: "cover",
                            border: `2px solid ${getStatusColor(row.status)}`
                          }}
                          onClick={() => handleImageClick(row.image, row.title, row.description)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div style={{ color: colors.textPrimary }}>User ID: {row.user.id}</div>
                      <div style={{ color: colors.textPrimary }}>User Name: {row.user.name}</div>
                      <div style={{ color: colors.textSecondary }}>Role: {row.user.role}</div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(row.status),
                          color: "#fff",
                          boxShadow: 2,
                          borderRadius: "12px",
                          "&:hover": {
                            backgroundColor: getStatusColor(row.status) + "dd"
                          }
                        }}
                      >
                        {row.status}
                      </Button>
                      {row.status === "Rejected" && row.rejectionReason && (
                        <Typography variant="caption" display="block" sx={{ mt: 1, color: colors.error }}>
                          Reason: {row.rejectionReason}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        <IconButton size="small" sx={{ color: "#ff4d6d" }} onClick={() => handleLike(index)}>
                          <Favorite />
                          <Typography variant="caption" sx={{ ml: 0.5 }}>{likes[index] || 0}</Typography>
                        </IconButton>
                        <IconButton size="small" sx={{ color: "#748cab" }} onClick={() => handleDislike(index)}>
                          <ThumbDown />
                          <Typography variant="caption" sx={{ ml: 0.5 }}>{dislikes[index] || 0}</Typography>
                        </IconButton>
                        <IconButton size="small" sx={{ color: "#457b9d" }} onClick={(event) => handleCommentClick(event, row.user)}>
                          <Comment />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "#3a86ff" }} onClick={() => handleShare(row.title, row.description)}>
                          <Share />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "#ef476f" }} onClick={() => handleDelete(index)}>
                          <Delete />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: "#ff9e00" }}
                          onClick={() => handleRejectionDialogOpen(index)}
                          disabled={row.status === "Rejected"}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body1" sx={{ color: colors.textPrimary }}>No content found matching the selected filter</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Preview Dialog */}
      <Dialog
        open={previewDialogOpen}
        onClose={() => setPreviewDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden"
          }
        }}
      >
        <DialogTitle sx={{
          backgroundColor: colors.lightBg,
          borderBottom: `1px solid ${colors.borderLight}`,
          fontWeight: "bold",
          color: colors.textPrimary
        }}>
          {selectedTitle}
        </DialogTitle>
        <DialogContent sx={{ p: 3, mt: 1 }}>
          <Typography variant="body1" sx={{ mb: 2, color: colors.textSecondary }}>
            {selectedDescription}
          </Typography>
          <Card sx={{ overflow: "hidden", borderRadius: 2, boxShadow: 3 }}>
            {selectedImage && selectedImage.includes(".mp4") ? (
              <CardMedia
                component="video"
                src={selectedImage}
                alt="Expanded Preview"
                controls
                sx={{
                  height: isMobile ? 200 : 400,
                  objectFit: "cover"
                }}
              />
            ) : (
              <CardMedia
                component="img"
                image={selectedImage}
                alt="Expanded Preview"
                sx={{
                  height: isMobile ? 200 : 400,
                  objectFit: "cover"
                }}
              />
            )}
          </Card>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: `1px solid ${colors.borderLight}` }}>
          <Button
            onClick={() => setPreviewDialogOpen(false)}
            variant="contained"
            sx={{ 
              borderRadius: 20,
              backgroundColor: colors.primary,
              "&:hover": {
                backgroundColor: colors.primary + "cc"
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog
        open={rejectionDialogOpen}
        onClose={handleRejectionDialogClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
            maxWidth: isMobile ? '95%' : '500px'
          }
        }}
      >
        <DialogTitle sx={{
          backgroundColor: colors.error,
          color: "white",
          fontWeight: "bold"
        }}>
          Why do you want to reject this content?
        </DialogTitle>
        <DialogContent sx={{ p: 3, mt: 1 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ color: colors.textPrimary }}>Select a reason</FormLabel>
            <RadioGroup
              aria-label="rejection-reason"
              name="rejection-reason"
              value={rejectionReason}
              onChange={handleRejectionReasonChange}
              sx={{
                "& .MuiRadio-root": {
                  color: colors.error
                },
                "& .Mui-checked": {
                  color: colors.error + "!important"
                }
              }}
            >
              <FormControlLabel value="Inappropriate Content" control={<Radio />} label="Inappropriate Content" />
              <FormControlLabel value="Low Quality" control={<Radio />} label="Low Quality" />
              <FormControlLabel value="Spam" control={<Radio />} label="Spam" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          {rejectionReason === "Other" && (
            <TextField
              label="Please specify"
              multiline
              rows={2}
              fullWidth
              value={otherReason}
              onChange={handleOtherReasonChange}
              sx={{ 
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: colors.error
                  }
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: colors.error
                }
              }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: `1px solid ${colors.borderLight}` }}>
          <Button
            onClick={handleRejectionDialogClose}
            variant="outlined"
            sx={{ 
              borderRadius: 20,
              borderColor: colors.error,
              color: colors.error,
              "&:hover": {
                backgroundColor: colors.error + "22",
                borderColor: colors.error
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRejectionSubmit}
            variant="contained"
            sx={{ 
              borderRadius: 20,
              backgroundColor: colors.error,
              "&:hover": {
                backgroundColor: colors.error + "cc"
              }
            }}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      {/* Comment Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCommentClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: { 
            borderRadius: 2, 
            boxShadow: 3,
            border: `1px solid ${colors.primary}22`
          }
        }}
      >
        <Box sx={{ 
          p: 2, 
          width: isMobile ? 280 : 300,
          backgroundColor: colors.cardBg
        }}>
          <Typography variant="subtitle1" color={colors.textPrimary}><strong>User ID:</strong> {currentUser?.id}</Typography>
          <Typography variant="subtitle1" color={colors.textPrimary}><strong>User Name:</strong> {currentUser?.name}</Typography>

          <TextField
            label="Enter your message"
            multiline
            rows={2}
            fullWidth
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            sx={{ 
              mt: 1,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: colors.primary
                }
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.primary
              }
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Button
              variant="contained"
              endIcon={<Send />}
              onClick={handleCommentSubmit}
              sx={{ 
                borderRadius: 20,
                backgroundColor: colors.primary,
                "&:hover": {
                  backgroundColor: colors.primary + "cc"
                }
              }}
            >
              Send
            </Button>
            <Button
              variant="outlined"
              onClick={handleCommentClose}
              sx={{ 
                borderRadius: 20,
                borderColor: colors.primary,
                color: colors.primary,
                "&:hover": {
                  backgroundColor: colors.primary + "22",
                  borderColor: colors.primary
                }
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ 
            width: '100%', 
            borderRadius: 2, 
            boxShadow: 3,
            backgroundColor: colors.success,
            "& .MuiAlert-icon": {
              color: "#fff"
            }
          }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContentTable;