import 'dotenv/config'
import app from './app'
import connect from './server/connect'

app.listen(process.env.PORT, () => connect(app))

export default app
