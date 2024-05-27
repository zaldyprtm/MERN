import mongoose from 'mongoose';

const minumanSchema = new mongoose.Schema({
    img: String,
    nama: String,
    harga: Number,
    popular: Boolean,
});

const Minuman = mongoose.model('Minuman', minumanSchema);

export default Minuman;
