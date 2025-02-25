import React, { useState, useRef } from 'react';
import { 
  Pencil, 
  Eye, 
  Trash2, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Link2,
  Image
} from 'lucide-react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';

// Toolbar Button Component
const ToolbarButton = ({ icon: Icon, onClick, active, title }) => (
  <Tooltip title={title}>
    <IconButton
      onClick={onClick}
      sx={{
        p: 1,
        borderRadius: 1,
        bgcolor: active ? 'grey.200' : 'transparent',
        '&:hover': { bgcolor: 'grey.100' },
      }}
    >
      <Icon size={16} />
    </IconButton>
  </Tooltip>
);

// Content Management System
const ContentManagement = () => {
  const [contents, setContents] = useState([
    { 
      id: 1, 
      title: 'React Hooks Guide', 
      type: 'Article', 
      status: 'Published', 
      category: 'React',
      content: '<h1>React Hooks Guide</h1><p>This is a guide about React Hooks.</p>'
    },
    { 
      id: 2, 
      title: 'Material UI Components', 
      type: 'Tutorial', 
      status: 'Draft', 
      category: 'UI/UX',
      content: '<h1>Material UI Components</h1><p>Learn about Material UI.</p>'
    }
  ]);

  const [showEditor, setShowEditor] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [contentToDelete, setContentToDelete] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = <img src="${e.target.result}" alt="${file.name}" style="max-width: 100%; margin: 10px 0;" />;
          execCommand('insertHTML', img);
        };
        reader.readAsDataURL(file);
      } else {
        const fileHTML = `
          <div style="padding: 0.5rem; margin: 0.5rem 0; background-color: #f3f4f6; border-radius: 0.25rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>📎</span>
            <span>${file.name}</span>
          </div>
        `;
        execCommand('insertHTML', fileHTML);
      }
    }
  };

  const handleLinkInsert = () => {
    const url = prompt('Enter URL:', 'https://');
    if (url) {
      const text = window.getSelection().toString() || prompt('Enter link text:', '');
      if (text) {
        const link = <a href="${url}" target="_blank" style="color: #2563eb; text-decoration: underline;">${text}</a>;
        execCommand('insertHTML', link);
      }
    }
  };

  const handleSave = (status) => {
    const newContent = {
      id: editingContent?.id || Date.now(),
      title: document.getElementById('content-title').value,
      type: document.getElementById('content-type').value,
      status: status,
      category: document.getElementById('content-category').value,
      content: editorRef.current.innerHTML,
      lastModified: new Date().toISOString()
    };

    setContents(prev => 
      editingContent 
        ? prev.map(item => item.id === editingContent.id ? newContent : item)
        : [...prev, newContent]
    );

    setShowEditor(false);
    setEditingContent(null);
  };

  const handleDelete = (content) => {
    setContentToDelete(content);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setContents(prev => prev.filter(item => item.id !== contentToDelete.id));
    setShowDeleteDialog(false);
    setContentToDelete(null);
  };

  const handlePreview = (content) => {
    setPreviewContent(content);
    setShowPreview(true);
  };

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', mx: 'auto' }}>
      {/* Content List */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Content Editor</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="all">All Content</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
            </Select>
            <Button 
              variant="contained" 
              onClick={() => setShowEditor(true)}
            >
              Create New
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contents
                .filter(item => filter === 'all' || item.status.toLowerCase() === filter.toLowerCase())
                .map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                    <Chip
                     label={item.status}
                        sx={{
                         bgcolor: item.status === 'Published' ? 'success.light' : item.status === 'Draft' ? 'info.light' : 'warning.light',
                         color: item.status === 'Published' ? 'success.dark' : item.status === 'Draft' ? 'info.dark' : 'warning.dark',
                           }}
                           />

                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit">
                          <IconButton 
                            onClick={() => { setEditingContent(item); setShowEditor(true); }}
                            sx={{ color: 'primary.main', '&:hover': { color: 'primary.dark' } }}
                          >
                            <Pencil size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Preview">
                          <IconButton 
                            onClick={() => handlePreview(item)}
                            sx={{ color: 'info.main', '&:hover': { color: 'info.dark' } }}
                          >
                            <Eye size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            onClick={() => handleDelete(item)}
                            sx={{ color: 'error.main', '&:hover': { color: 'error.dark' } }}
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Editor Dialog */}
      <Dialog open={showEditor} onClose={() => setShowEditor(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingContent ? 'Edit Content' : 'Create New Content'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              id="content-title"
              label="Title"
              defaultValue={editingContent?.title}
              fullWidth
            />
            <Select
              id="content-type"
              label="Type"
              defaultValue={editingContent?.type || 'Article'}
              fullWidth
            >
              <MenuItem value="Article">Article</MenuItem>
              <MenuItem value="Tutorial">Tutorial</MenuItem>
              <MenuItem value="Guide">Guide</MenuItem>
            </Select>
            <TextField
              id="content-category"
              label="Category"
              defaultValue={editingContent?.category}
              fullWidth
            />
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <ToolbarButton icon={Bold} onClick={() => execCommand('bold')} title="Bold" />
                <ToolbarButton icon={Italic} onClick={() => execCommand('italic')} title="Italic" />
                <ToolbarButton icon={Underline} onClick={() => execCommand('underline')} title="Underline" />
                <ToolbarButton icon={AlignLeft} onClick={() => execCommand('justifyLeft')} title="Align Left" />
                <ToolbarButton icon={AlignCenter} onClick={() => execCommand('justifyCenter')} title="Center" />
                <ToolbarButton icon={AlignRight} onClick={() => execCommand('justifyRight')} title="Align Right" />
                <ToolbarButton icon={List} onClick={() => execCommand('insertUnorderedList')} title="Bullet List" />
                <ToolbarButton icon={ListOrdered} onClick={() => execCommand('insertOrderedList')} title="Numbered List" />
                <ToolbarButton icon={Link2} onClick={handleLinkInsert} title="Insert Link" />
                <ToolbarButton icon={Image} onClick={() => fileInputRef.current?.click()} title="Insert Image" />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.doc,.docx"
                />
              </Box>
              <Box
                ref={editorRef}
                contentEditable
                dangerouslySetInnerHTML={{ __html: editingContent?.content || '' }}
                sx={{ minHeight: '400px', p: 2, outline: 'none' }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditor(false)}>Cancel</Button>
          <Button onClick={() => handleSave('Draft')} variant="outlined">Save as Draft</Button>
          <Button onClick={() => handleSave('Published')} variant="contained">
            {editingContent ? 'Update' : 'Publish'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onClose={() => setShowPreview(false)} maxWidth="md" fullWidth>
        <DialogTitle>{previewContent?.title}</DialogTitle>
        <DialogContent>
          <Box dangerouslySetInnerHTML={{ __html: previewContent?.content }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPreview(false)} variant="contained">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Delete Content</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete "{contentToDelete?.title}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContentManagement;