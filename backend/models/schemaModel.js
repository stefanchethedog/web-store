import mongoose from "mongoose"

const schemaMetadataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    keys: [{
        name: {
            type: String
        },
        type: {
            type: String
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        }
    }]
})

schemaMetadataSchema.index({ name: 1 }, { unique: true });

export const Schema = mongoose.model('Schema', schemaMetadataSchema)