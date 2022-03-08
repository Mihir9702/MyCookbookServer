import app from './app'
import connect from './server/connect'

app.listen(5002, () => connect(app))

export default app
