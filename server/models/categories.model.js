
import mongoose from 'mongoose'
//Data for categories
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  created: {
    type: Date,
    default: Date.now
    },
    updated: {
    type: Date,
    default: Date.now
    },
});

export default mongoose.model('categories', UserSchema);


