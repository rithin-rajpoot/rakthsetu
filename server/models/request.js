import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema({
    fullName:{type:"string", required: true},
    seekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bloodType: { type: String, required: true },
    urgency: { type: String, enum: ['Normal', 'Urgent'], default: 'Normal' },
    status: { type: String, enum: ['Pending', 'Matched', 'Completed', 'Cancelled'], default: 'Pending' },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true,default:undefined } // [longitude, latitude]
      },
    matchedDonorsId:[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now }
  });
bloodRequestSchema.index({ location: '2dsphere' }) 
const BloodRequest  = mongoose.model('BloodRequest', bloodRequestSchema);
export default BloodRequest;