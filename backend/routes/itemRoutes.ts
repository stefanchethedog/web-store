import express from 'express';
import { createItem, getItems, getItemById, updateItem, deleteItem } from '../controllers/itemController';

const router = express.Router();

// Create an item with nested documents
router.post('/create-nested/:schemaName', async (req, res) => {
  const { schemaName } = req.params;
  try {
    const newItem = await createItem(schemaName, req.body);
    res.status(201).json(newItem);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Create an item with objectId references
router.post('/create-unnested/:schemaName', async (req, res) => {
  const { schemaName } = req.params;
  try {
    const newItem = await createItem(schemaName, req.body, false);
    res.status(201).json(newItem);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Get all items for a particular schema
router.get('/get-items-by-schema-name/:schemaName', async (req, res) => {
  const { schemaName } = req.params;
  try {
    const items = await getItems(schemaName);
    res.json(items);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Get an item by ID
router.get('/get-item-by-id/:schemaName/:itemId', async (req, res) => {
  const { schemaName, itemId } = req.params;
  try {
    const item = await getItemById(schemaName, itemId);
    res.json(item);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Get items by schemas
router.post('/get-items-by-schemas', async (req, res) => {
  try {
      const schemas: string[] = req.body;

      const itemsPromises = schemas.map(async (schemaName) => {
          try {
              console.log(schemaName);
              const items = await getItems(schemaName);
              return { name: schemaName, items: items };
          } catch (error) {
              throw error;
          }
      });

      const items = await Promise.all(itemsPromises);

      res.json(items);
  } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
  }
});

// Update an item by ID
router.put('/:schemaName/:itemId', async (req, res) => {
  const { schemaName, itemId } = req.params;
  try {
    const updatedItem = await updateItem(schemaName, itemId, req.body);
    res.json(updatedItem);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

router.put('/update-unnested/:schemaName/:itemId', async (req, res) => {
  const { schemaName, itemId } = req.params;
  try {
    const updatedItem = await updateItem(schemaName, itemId, req.body, false);
    res.json(updatedItem);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Delete an item by ID
router.delete('/:schemaName/:itemId', async (req, res) => {
  const { schemaName, itemId } = req.params;
  try {
    await deleteItem(schemaName, itemId);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

export default router;
