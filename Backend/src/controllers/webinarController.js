const Webinar = require("../models/Webinar");

// Get all webinars (with pagination & filtering)
exports.getWebinars = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, host } = req.query;

    const query = {};
    if (status) query.status = status;
    if (host) query.host = host;

    const webinars = await Webinar.find(query)
      .populate("host", "name email")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ date: 1 });

    const total = await Webinar.countDocuments(query);

    res.json({ total, page, limit, webinars });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single webinar by ID
exports.getWebinarById = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id).populate("host", "name email");
    if (!webinar) return res.status(404).json({ message: "Webinar not found" });
    res.json(webinar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a webinar (only authenticated users)
exports.createWebinar = async (req, res) => {
  try {
    const { title, description, date, link } = req.body;
    const newWebinar = new Webinar({
      title,
      description,
      date,
      link,
      host: req.user.id, // From authentication middleware
    });

    const savedWebinar = await newWebinar.save();
    res.status(201).json(savedWebinar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a webinar (only host or admin)
exports.updateWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id);
    if (!webinar) return res.status(404).json({ message: "Webinar not found" });

    // Ensure only the host or an admin can update
    if (webinar.host.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this webinar" });
    }

    const updatedWebinar = await Webinar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedWebinar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a webinar (only host or admin)
exports.deleteWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id);
    if (!webinar) return res.status(404).json({ message: "Webinar not found" });

    // Ensure only the host or an admin can delete
    if (webinar.host.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this webinar" });
    }

    await webinar.deleteOne();
    res.json({ message: "Webinar deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
