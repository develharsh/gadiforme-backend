const tripModel = require("../models/tripModel");
const applicationModel = require("../models/applicationModel");
const errorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");

module.exports.add = async (req, res) => {
  try {
    const { trip, vehicle, cost } = req.body;
    if (!trip || !mongoose.isValidObjectId(trip))
      throw { message: "Invalid Trip" };
    const tripDoc = await tripModel.findById(trip).lean();
    if (!tripDoc) throw { message: "No Such Trip Exists" };
    let data = {
      applicant: req.user.user._id,
      trip,
      vehicle,
      cost,
    };
    await applicationModel.create(data);
    res
      .status(201)
      .json({ success: true, message: "Details Sent Successfully" });
  } catch (error) {
    const response = errorResponse(error);
    console.log("Application Add Error", error);
    res
      .status(response.code)
      .json({ success: false, message: response.message });
  }
};