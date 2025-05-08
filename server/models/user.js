import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true,  },
  password: { type: String, required: true },
  phone: { type: String, required: true ,match: /^[0-9+]{10,15}$/,}, // if Number it removes leading zeroes
  bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true,default:undefined } // [longitude, latitude]
  },
  createdAt: { type: Date, default: Date.now },
  userBloodRequests: [{type: mongoose.Schema.Types.ObjectId, ref: "BloodRequest"}]
});

userSchema.index({ location: '2dsphere' }); // For geolocation queries
const User = mongoose.model('User', userSchema);
export default User;

/*
Location is a field that stores geographic 
coordinates (latitude & longitude). */