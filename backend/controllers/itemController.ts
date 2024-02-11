import { createItemModel, createNestedItemModel } from '../models/itemModel';
import { Model } from 'mongoose';
import { Schema } from '../models/schemaModel';
import validPayload from '../utils/schema-validator';

// Create an ItemModel instance based on the provided schema name
const createItem = async (schemaName: string, data: any, isNested = true) => {
  try {
    const schema = await Schema.findOne({ name: schemaName });
    const allSchemas = await Schema.find();
    const result = validPayload(data, schema, allSchemas);
    if (result !== true) {
      throw new Error(result.toString());
    }
    let ItemModel: typeof Model;
    if (isNested)
      ItemModel = await createNestedItemModel(schemaName)
    else {
      ItemModel = await createItemModel(schemaName);
    }
    const newItem = new ItemModel(data);
    await newItem.save();
    return newItem;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

// Get all items of a particular schema
const getItems = async (schemaName: string, isNested = true) => {
  try {
    let ItemModel: typeof Model;
    ItemModel = isNested ? await createNestedItemModel(schemaName) : await createItemModel(schemaName);

    const items = await ItemModel.find();
    return items;
  } catch (error) {
    console.error('Error getting items:', error);
    throw error;
  }
};

// Get a single item by ID
const getItemById = async (schemaName: string, itemId: any, isNested = true) => {
  try {
    let ItemModel: typeof Model;
    ItemModel = isNested ? await createNestedItemModel(schemaName) : await createItemModel(schemaName);

    const item = await ItemModel.findById(itemId);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  } catch (error) {
    console.error('Error getting item:', error);
    throw error;
  }
};

// Update an item by ID
const updateItem = async (schemaName: string, itemId: any, newData: any, isNested = true) => {
  try {
    let ItemModel;
    ItemModel = isNested ? await createNestedItemModel(schemaName) : await createItemModel(schemaName);

    const updatedItem = await ItemModel.findByIdAndUpdate(itemId, newData, { new: true });
    if (!updatedItem) {
      throw new Error('Item not found');
    }
    return updatedItem;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

// Delete an item by ID
const deleteItem = async (schemaName: string, itemId: any, isNested = true) => {
  try {
    let ItemModel;
    ItemModel = isNested ? await createNestedItemModel(schemaName) : await createItemModel(schemaName);

    const deletedItem = await ItemModel.findByIdAndDelete(itemId);
    if (!deletedItem) {
      throw new Error('Item not found');
    }
    return { message: 'Item deleted successfully' };
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

export { createItem, getItems, getItemById, updateItem, deleteItem };
