import mongoose from 'mongoose';
import { Schema as SchemaModel } from '../models/schemaModel.js';

const compiledModels = {};

async function createItemModel(schemaName){
    try{
        if(compiledModels[schemaName]){
            return compiledModels[schemaName];
        }

        const schema = await SchemaModel.findOne({ name: schemaName });
        if(!schema){
            throw new Error("Schema not found");
        }

        const itemSchema = new mongoose.Schema({});

        for(const key of schema.keys){
            if(key.type === 'Schema'){
                itemSchema.add({ [key.name]: { type: 'ObjectId' }});
            }else{
                itemSchema.add({ [key.name]: { type: key.type }});
            }
        }

        const model = mongoose.model(schemaName, itemSchema);
        compiledModels[schemaName] = model;
        return model;
    }catch(error){
        console.error('Error creating item model: ', error);
        throw error;
    }
}

async function createNestedItemModel(schemaName) {
    try {
        if(compiledModels[schemaName]){
            return compiledModels[schemaName];
        }

        async function createSchema(schemaName) {
            try {
                
                const schema = await SchemaModel.findOne({ name: schemaName });

                if (!schema) {
                    throw new Error("Schema not found");
                }

                const itemSchema = new mongoose.Schema({});

                for (const key of schema.keys) {
                    if (key.type !== 'Schema') {
                        itemSchema.add({ [key.name]: { type: key.type, required: key.required } });
                    } else {
                        // Recursively create nested schema
                        const keySchema = await createSchema(key.name);
                        itemSchema.add({ [key.name]: keySchema });
                    }
                }

                return itemSchema;
            } catch (error) {
                console.error('Error creating schema: ', error);
                throw error;
            }
        }

        const dynamicSchema = await createSchema(schemaName);
        const model = mongoose.model(schemaName, dynamicSchema);
        compiledModels[schemaName] = model;

        return model;
    } catch (error) {
        console.error('Error creating nested item model: ', error);
        throw error;
    }
}


export { createItemModel, createNestedItemModel };