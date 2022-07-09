import express from 'express'
import mongoose from 'mongoose'
import { Item } from '../types/Book.type'
import { logger } from '../utils/errors/logger'
import status from 'statuses'
import ItemModel from '../models/Item'

const ItemController = express.Router()

ItemController.get('/', async (req, res, next) => {
  try {
    const books: Item[] = await ItemModel.find({})

    res.status(200).json(books)
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

ItemController.get('/search', async (req, res, next) => {
  try {
    const { title } = req.query
    // console.log(ItemModel.getI)
    // const items: Item[] = await ItemModel.find({ $text: { $search: title } });

    // res.status(200).send(items);
  } catch (error) {
    next(error)
  }
})

ItemController.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const book: Item = await ItemModel.findById(id)

    if (!book) {
      throw status(404)
    }
    res.status(200).send(book)
  } catch (error) {
    next(error)
  }
})

ItemController.post('/', async (req, res, next) => {
  try {
    const item = new ItemModel(req.body.book)
    // check if this book already exists
    // add validation

    const savedItem = await item.save()

    res.status(201).json(savedItem)
  } catch (err) {
    next(err)
  }
})

ItemController.put('/:id', async (req, res, next) => {
  try {
    const { book } = req.body

    const updatedItem = await ItemModel.findByIdAndUpdate(
      book._id,
      { ...book },
      { new: true }
    )

    res.status(200).send(updatedItem)
  } catch (err) {
    next(err)
  }
})

ItemController.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    await ItemModel.deleteOne({ id })

    res.status(204).send('OK')
  } catch (err) {
    next(err)
  }
})

export default ItemController
