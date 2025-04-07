const Transport = require("../model/transport");

// Get all transports created by the logged-in user
exports.getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.find({ user: req.user._id });
    res.render("dashboard", { user: req.user, transports });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching transports");
  }
};

exports.getCreateForm = (req, res) => {
  res.render("form", { transport: null });
};

exports.createTransport = async (req, res) => {
  try {
    const { name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff, pickupMileage, dropoffMileage } = req.body;
    const validPickupMileage = Number(pickupMileage);
    const validDropoffMileage = Number(dropoffMileage);
    if (isNaN(validPickupMileage) || isNaN(validDropoffMileage)) {
      return res.status(400).send("Invalid mileage values");
    }
    const totalMileage = Math.abs(validDropoffMileage - validPickupMileage);
    // Create new transport and associate with logged-in user
    const transport = new Transport({ 
      name, mobility, consent, dnar, respectForm, bariatric, 
      pickup, dropoff, 
      pickupMileage: validPickupMileage, dropoffMileage: validDropoffMileage, 
      totalMileage, 
      user: req.user._id 
    });
    await transport.save();
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating transport");
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (!transport) return res.status(404).send("Transport not found");
    res.render("form", { transport });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching transport data");
  }
};

exports.updateTransport = async (req, res) => {
  try {
    const { name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff, pickupMileage, dropoffMileage } = req.body;
    const totalMileage = Math.abs(Number(dropoffMileage) - Number(pickupMileage));
    await Transport.findByIdAndUpdate(req.params.id, {
      name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff,
      pickupMileage: Number(pickupMileage), dropoffMileage: Number(dropoffMileage), totalMileage
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating transport");
  }
};

exports.deleteTransport = async (req, res) => {
  try {
    await Transport.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting transport");
  }
};
