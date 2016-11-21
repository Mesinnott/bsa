import {reg} from './reg-component'
import {directory} from './directory'
import {login} from './login-component'
import {register} from './register'


// Import your components here

let components = [
  reg,
  directory,
  login,
  register
]

const dependencies = components.map(c => { return `app.components.${c}`})

export {
  dependencies
}
