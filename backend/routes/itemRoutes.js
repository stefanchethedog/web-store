import express from 'express';
import { createItem, getItems, getItemById, updateItem, deleteItem } from './../controllers/itemController.js';

const router = express.Router();

// Create an item with nested documents
router.post('/:schemaName', async (req, res) => {
  const { schemaName } = req.params;
  try {
    const newItem = await createItem(schemaName, req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create an item with objectId references
router.post('/create-unnested/:schemaName', async (req, res) => {
  const { schemaName } = req.params;
  try {
    const newItem = await createItem(schemaName, req.body, false);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all items for a particular schema
router.get('/:schemaName', async (req, res) => {
  const { schemaName } = req.params;
  try {
    const items = await getItems(schemaName);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get an item by ID
router.get('/:schemaName/:itemId', async (req, res) => {
  const { schemaName, itemId } = req.params;
  try {
    const item = await getItemById(schemaName, itemId);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an item by ID
router.put('/:schemaName/:itemId', async (req, res) => {
  const { schemaName, itemId } = req.params;
  try {
    const updatedItem = await updateItem(schemaName, itemId, req.body);
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update-unnested/:schemaName/:itemId', async (req, res) => {
  const { schemaName, itemId } = req.params;
  try {
    const updatedItem = await updateItem(schemaName, itemId, req.body, false);
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an item by ID
router.delete('/:schemaName/:itemId', async (req, res) => {
  const { schemaName, itemId } = req.params;
  try {
    await deleteItem(schemaName, itemId);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
