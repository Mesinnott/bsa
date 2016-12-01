import {reg} from './reg-component'
import {directory} from './directory-component'
import {login} from './login-component'
import {register} from './register-component'
import {home} from './home-component'
import {receipt} from './receipt-component'
import {campavail} from './campavail-component'
// Import your components here
let components = [
  reg,
  directory,
  login,
  register,
  home,
  campavail,
  receipt
]



const dependencies = components.map(c => { return `app.components.${c}`})

export {
  dependencies
}
