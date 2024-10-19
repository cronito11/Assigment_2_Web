import mongoose from 'mongoose'
//Data for products
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Description is required'
  },
  price: {
    type: Number,
    trim: true,
    required: 'price is required'
  },
  quantity: {
    type: Number,
    trim: true,
    required: 'quantity is required'
  },
  category: {
    type: String,
    trim: true,
    required: 'price is required'
  },created: {
    type: Date,
    default: Date.now
    },
    updated: {
    type: Date,
    default: Date.now
    },

});

export default mongoose.model('product', UserSchema);


