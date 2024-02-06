import { ObjectId } from "mongodb"
import mongoose from "mongoose"

const itemSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    productNumber: {
        type: String,
        require: true,
    },
    assets: {
        type: [ObjectId],
        require: false,
        default: undefined,
    },
    cost: {
        type: Number,
        default: 0,
    }
})

export const Item = mongoose.model('Item', itemSchema)