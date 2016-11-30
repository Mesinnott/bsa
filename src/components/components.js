import {reg} from './reg-component'
import {directory} from './directory-component'
import {login} from './login-component'
import {register} from './register-component'
import {home} from './home-component'
import {receipt} from './receipt-component'
import {campAvail} from './campAvail-component'
// Import your components here
let components = [
  reg,
  directory,
  login,
  register,
  home,
  campAvail,
  receipt
]



const dependencies = components.map(c => { return `app.components.${c}`})

export {
  dependencies
}
