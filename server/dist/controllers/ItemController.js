'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const logger_1 = require('../utils/errors/logger')
const statuses_1 = __importDefault(require('statuses'))
const Item_1 = __importDefault(require('../models/Item'))
const ItemController = express_1.default.Router()
ItemController.get('/', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const books = yield Item_1.default.find({})
      res.status(200).json(books)
    } catch (error) {
      logger_1.logger.error(error)
      next(error)
    }
  })
)
ItemController.get('/search', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { title } = req.query
      // console.log(ItemModel.getI)
      // const items: Item[] = await ItemModel.find({ $text: { $search: title } });
      // res.status(200).send(items);
    } catch (error) {
      next(error)
    }
  })
)
ItemController.get('/:id', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id } = req.params
      const book = yield Item_1.default.findById(id)
      if (!book) {
        throw (0, statuses_1.default)(404)
      }
      res.status(200).send(book)
    } catch (error) {
      next(error)
    }
  })
)
ItemController.post('/', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const item = new Item_1.default(req.body.book)
      // check if this book already exists
      // add validation
      const savedItem = yield item.save()
      res.status(201).json(savedItem)
    } catch (err) {
      next(err)
    }
  })
)
ItemController.put('/:id', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { book } = req.body
      const updatedItem = yield Item_1.default.findByIdAndUpdate(
        book._id,
        Object.assign({}, book),
        { new: true }
      )
      res.status(200).send(updatedItem)
    } catch (err) {
      next(err)
    }
  })
)
ItemController.delete('/:id', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id } = req.params
      yield Item_1.default.deleteOne({ id })
      res.status(204).send('OK')
    } catch (err) {
      next(err)
    }
  })
)
exports.default = ItemController
//# sourceMappingURL=ItemController.js.map
