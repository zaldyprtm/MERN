import mongoose from 'mongoose';

const minumanSchema = new mongoose.Schema({
    img: String,
    nama: String,
    harga: Number,
    popular: Boolean,
});


const minumanData = [
    { img: "/menu/blackcoffee.jpg", nama: "Black Coffee", harga: 12000, popular: true },
    { img: "/menu/espresso.jpg", nama: "Espresso", harga: 18000, popular: false },
    { img: "/menu/cappucino.jpg", nama: "Cappucino", harga: 15000, popular: true },
    { img: "/menu/icecoffee.jpg", nama: "Es Kopi", harga: 10000, popular: true },
    { img: "/menu/mocha.jpg", nama: "Mocha", harga: 20000, popular: false },
    { img: "/menu/macchiato.jpg", nama: "Macchiato", harga: 22000, popular: false },
    { img: "/menu/V.jpg", nama: "V60", harga: 20000, popular: false }
  ];

const Minuman = mongoose.model('Minuman', minumanSchema);

export default Minuman;
