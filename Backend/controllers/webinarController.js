const Webinar = require("../models/Webinar");

exports.createWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.create(req.body);
    res.status(201).json(webinar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find();
    res.status(200).json(webinars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
