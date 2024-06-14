import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// tes

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Define a Mongoose schema and model for minuman
const minumanSchema = new mongoose.Schema({
  img: String,
  nama: String,
  harga: Number,
  popular: Boolean
});

const Minuman = mongoose.model('Minuman', minumanSchema);

// Define a Mongoose schema and model for orders
const orderSchema = new mongoose.Schema({
  userName: String,
  items: [
    {
      nama: String,
      harga: Number,
      quantity: Number
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

// Endpoint to get minuman data
app.get('/api/minuman', async (req, res) => {
  try {
    const minuman = await Minuman.find();
    res.json(minuman);
    console.log('minuman fetched', minuman)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch minuman data' });
  }
});

// Function to generate a WhatsApp URL
const generateWhatsAppUrl = (userName, items, total) => {
  const itemDetails = items.map(item => `${item.nama} (IDR ${item.harga} x ${item.quantity})`).join(', ');
  const message = `Halo, saya ${userName} ingin memesan ${itemDetails} dengan total pembayaran sebesar IDR ${total}.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/+6282280797058?text=${encodedMessage}`;
};

// Endpoint for checkout
app.post('/api/checkout', async (req, res) => {
  const { userName, items, total } = req.body;

  try {
    // Save the order to MongoDB
    const newOrder = new Order({ userName, items, total });
    await newOrder.save();

    // Generate WhatsApp URL
    const whatsappUrl = generateWhatsAppUrl(userName, items, total);
    res.status(201).json({ whatsappUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process checkout' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
