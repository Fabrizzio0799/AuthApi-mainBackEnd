import {app} from './app.js'
import {port} from './libs/variables.js'

app.listen(port,()=>{console.log('Server lisent on port ',port)});