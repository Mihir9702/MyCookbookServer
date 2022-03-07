import { PORT } from './server/consts'
import app from './app'
import connect from './server/connect'

app.listen(PORT, () => connect(app))

export default app
