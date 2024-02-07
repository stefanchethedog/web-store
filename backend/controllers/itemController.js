import { ObjectId } from 'mongodb';
import { createItemModel, createNestedItemModel } from '../models/itemModel.js';
import { Schema as SchemaModel } from '../models/schemaModel.js';

// Create an ItemModel instance based on the provided schema name
const createItem = async (schemaName, data, isNested= true) => {
  try {
    
    let ItemModel;
    const schema = await SchemaModel.findOne({ name: schemaName });
    if(isNested)
      ItemModel = await createNestedItemModel(schemaName)
    else{
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
const getItems = async (schemaName, isNested= true) => {
  try {
    let ItemModel;
    ItemModel = isNested? await createNestedItemModel(schemaName): await createItemModel(schemaName);

    const items = await ItemModel.find();
    return items;
  } catch (error) {
    console.error('Error getting items:', error);
    throw error;
  }
};

// Get a single item by ID
const getItemById = async (schemaName, itemId, isNested= true) => {
  try {
    let ItemModel;
    ItemModel = isNested? await createNestedItemModel(schemaName): await createItemModel(schemaName);

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
const updateItem = async (schemaName, itemId, newData, isNested= true) => {
  try {
    let ItemModel;
    ItemModel = isNested? await createNestedItemModel(schemaName): await createItemModel(schemaName);

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
const deleteItem = async (schemaName, itemId, isNested= true) => {
  try {
    let ItemModel;
    ItemModel = isNested? await createNestedItemModel(schemaName): await createItemModel(schemaName);

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
