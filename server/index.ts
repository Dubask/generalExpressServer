import app from './app'
import { HOST_LISTEN_TEXT } from './utils/consts'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`${HOST_LISTEN_TEXT}${PORT}`))
