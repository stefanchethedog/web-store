import express from "express";
import { Schema } from "../models/schemaModel";

const router = express.Router();


// POST METHODS
// Create a new schema
router.post('/', async (req, res) => {
  try {
    const { name, keys } = req.body;
    const newSchema = await Schema.create({ name, keys });
    res.status(201).json(newSchema);
  } catch (error) {
    console.error('Error creating schema:', error);
    res.status(500).json({ error: 'Failed to create schema' });
  }
});


// GET METHODS
// Get All schema
router.get("/", async (_, res) => {
  try {
    const schemas = await Schema.find({});
    return res.status(200).json(schemas);
  } catch (err) {
    const error: Error = err as Error;
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
});

// Get a single schema by ID
router.get('/:id', async (req, res) => {
  try {
    const schema = await Schema.findById(req.params.id);
    if (!schema) {
      return res.status(404).json({ error: 'Schema not found' });
    }
    res.json(schema);
  } catch (error) {
    console.error('Error fetching schema:', error);
    res.status(500).json({ error: 'Failed to fetch schema' });
  }
});

// Get a single schema by name (unique + index)
router.get('/:name', async (req, res) => {
  try {
    const schema = await Schema.findOne({ name: req.params.name });
    if (!schema) {
      return res.status(404).json({ error: 'Schema not found' });
    }
    res.json(schema);
  } catch (error) {
    console.error('Error fetching schema:', error);
    res.status(500).json({ error: 'Failed to fetch schema' });
  }
});


// PUT METHOD
// Update a schema by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, keys } = req.body;
    const updatedSchema = await Schema.findByIdAndUpdate(req.params.id, { name, keys }, { new: true });
    if (!updatedSchema) {
      return res.status(404).json({ error: 'Schema not found' });
    }
    res.json(updatedSchema);
  } catch (error) {
    console.error('Error updating schema:', error);
    res.status(500).json({ error: 'Failed to update schema' });
  }
});

// Update a schema by name
router.put('/:name', async (req, res) => {
  try {
    const { keys } = req.body;
    const updatedSchema = await Schema.findOneAndUpdate({ name: req.params.name }, { keys }, { new: true });
    if (!updatedSchema) {
      return res.status(404).json({ error: 'Schema not found' });
    }
    res.json(updatedSchema);
  } catch (error) {
    console.error('Error updating schema:', error);
    res.status(500).json({ error: 'Failed to update schema' });
  }
});



// DELETE METHODS
router.delete('/:id', async (req, res) => {
  try {
    const deletedSchema = await Schema.findByIdAndDelete(req.params.id);
    if (!deletedSchema) {
      return res.status(404).json({ error: 'Schema not found' });
    }
    res.json({ message: 'Schema deleted successfully' });
  } catch (error) {
    console.error('Error deleting schema:', error);
    res.status(500).json({ error: 'Failed to delete schema' });
  }
});

router.delete('/delete-by-name/:name', async (req, res) => {
  try {
    const deletedSchema = await Schema.findOneAndDelete({ name: req.params.name });
    if (!deletedSchema) {
      return res.status(404).json({ error: 'Schema not found' });
    }
    res.json({ message: 'Schema deleted successfully' });
  } catch (error) {
    console.error('Error deleting schema:', error);
    res.status(500).json({ error: 'Failed to delete schema' });
  }
});


export default router;
