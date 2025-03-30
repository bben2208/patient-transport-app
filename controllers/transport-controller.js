exports.getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.find();
    res.render('index', { transports });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching transports');
  }
};

exports.getCreateForm = (req, res) => {
  res.render('form', { transport: null });
};

exports.createTransport = async (req, res) => {
  try {
    const { name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff, pickupMileage, dropoffMileage } = req.body;

    const validPickupMileage = Number(pickupMileage);
    const validDropoffMileage = Number(dropoffMileage);
    if (isNaN(validPickupMileage) || isNaN(validDropoffMileage)) {
      return res.status(400).send('Invalid mileage values');
    }

    const totalMileage = Math.abs(validDropoffMileage - validPickupMileage);

    const transport = new Transport({ name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff, pickupMileage, dropoffMileage, totalMileage });
    await transport.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating transport');
  }
};

