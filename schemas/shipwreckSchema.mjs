//////////////////////////////////////////////////////////////////////////////////////////////////
// schema for collection: shipwrecks
//////////////////////////////////////////////////////////////////////////////////////////////////
import mongoose from "mongoose";

const shipwreckSchema = new mongoose.Schema({
  feature_type: {
    type: String,
    require: true,
  },
  chart: {
    type: String,
    required: true,
  },
  latdec: {
    type: Number,
    required: true,
  },
  londec: {
    type: Number,
    required: true,
  },
  coordinates: {
    type: Number,
  },
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// pre-save hook to assign the coordinates value
//////////////////////////////////////////////////////////////////////////////////////////////////
shipwreckSchema.pre("save", function (next) {
  if (this.latdec !== undefined && this.londec !== undefined) {
    this.coordinates = [this.londec, this.latdec];
  }
  next();
});

const Shipwrecks = mongoose.model("Shipwrecks", shipwreckSchema);

export default Shipwrecks;
