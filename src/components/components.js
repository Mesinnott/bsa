import {campavail} from './campAvail-component'
import {director} from './director-component'
import {directory} from './directory-component'
import {groups} from './groups-component'
import {home} from './home-component'
import {login} from './login-component'
import {receipt} from './receipt-component'
import {reg} from './reg-component'
import {register} from './register-component'
import {viewcamp} from './viewCamp-component'
import {admin} from './admin-component'
import {navbar} from './navbar-component.js'
import {faq} from './faq-component.js'
import {viewreg} from './viewReg-component.js'
import {adminadd} from './adminAdd-component.js'


// Import your components here

let components = [
  campavail,
  director,
  directory,
  groups,
  home,
  login,
  receipt,
  reg,
  register,
  viewcamp,
  admin,
  navbar,
  faq,
  viewreg,
  adminadd
]



const dependencies = components.map(c => { return `app.components.${c}`})

export {
  dependencies
}
