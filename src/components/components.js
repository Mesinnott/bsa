import {reg} from './reg-component'
import {directory} from './directory-component'
import {login} from './login-component'
import {register} from './register-component'
import {reciept} from './reciept-component'
import {campAvail} from './campAvail-component.js'


// Import your components here
let components = [
  reg,
  directory,
  login,
  register,
  reciept,
  campAvail
]



const dependencies = components.map(c => { return `app.components.${c}`})

export {
  dependencies
}
