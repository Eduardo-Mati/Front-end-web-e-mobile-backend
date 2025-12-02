import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    inStock: {type: Boolean, required: true},
    quantity:{type: Number, default: 0, required: true},
    validity: {type: Date, required: true},
    manufacturingDate: {type: Date, required: false},
})

const Product = mongoose.model('Product', productSchema);

export default Product;
