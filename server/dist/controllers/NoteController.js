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
const NoteModel = require('../models/Note')
const NoteController = express_1.default.Router()
NoteController.get('/', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const notes = yield NoteModel.find({})
      res.status(200).json(notes)
    } catch (err) {
      next(err)
    }
  })
)
NoteController.get('/search', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { title } = req.query
      console.log(title)
      const notes = yield NoteModel.find({ $text: { $search: title } })
      if (!notes) {
        const error = new Error('not found')
        error['code'] = 404
        throw error
      }
      res.status(200).send(notes)
    } catch (err) {
      next(err)
    }
  })
)
NoteController.get('/:id', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id } = req.params
      const book = yield NoteModel.findById(id)
      if (!book) {
        const error = new Error('not found')
        error['code'] = 404
        throw error
      }
      res.status(200).send(book)
    } catch (err) {
      next(err)
    }
  })
)
NoteController.post('/', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const note = new NoteModel(req.body.book)
      // check if this book already exists
      // add validation
      yield note.save()
      res.status(201).json(note)
    } catch (err) {
      next(err)
    }
  })
)
NoteController.put('/:id', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { book } = req.body
      const updatedNote = yield NoteModel.findByIdAndUpdate(
        book._id,
        Object.assign({}, book),
        { new: true }
      )
      res
        .status(200)
        .send(
          updatedNote === null || updatedNote === void 0
            ? void 0
            : updatedNote._doc
        )
    } catch (err) {
      next(err)
    }
  })
)
NoteController.delete('/:id', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id } = req.params
      yield NoteModel.deleteOne({ id })
      res.status(204).send('OK')
    } catch (err) {
      next(err)
    }
  })
)
exports.default = NoteController
//# sourceMappingURL=NoteController.js.map
