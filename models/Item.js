import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    quantityAvailable: Number,
    description: String


})

module.exports = mongoose.models.Item || mongoose.model('Item', ItemSchema)