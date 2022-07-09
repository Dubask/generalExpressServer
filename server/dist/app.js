'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const dotenv_1 = __importDefault(require('dotenv'))
const mongoose_1 = __importDefault(require('mongoose'))
const ItemController_1 = __importDefault(
  require('./controllers/ItemController')
)
const consts_1 = require('./utils/consts')
const handleErrors_1 = __importDefault(require('./middlewares/handleErrors'))
const statuses_1 = __importDefault(require('statuses'))
dotenv_1.default.config()
const app = (0, express_1.default)()
const PORT = process.env.PORT || 3000
mongoose_1.default.connect(process.env.MONGO_DB_URI)
const db = mongoose_1.default.connection
db.on('error', () => console.log('DB connection error'))
db.once('open', () => console.log('db connect'))
// app.use(cors);
app.use(express_1.default.json())
app.use(express_1.default.urlencoded({ extended: false }))
// ROUTES
app.use('/book', ItemController_1.default)
app.use('/book-notes', (req, res) => {})
app.get('*', function (req, res, next) {
  const notFound = (0, statuses_1.default)(404)
  next(notFound)
})
// MIDDLEWARES
app.use(handleErrors_1.default)
// MISC
app.listen(PORT, () => console.log(`${consts_1.HOST_LISTEN_TEXT}${PORT}`))
//# sourceMappingURL=app.js.map
