import {faq} from './faq-component'
import {reg} from './reg-component'
import {home} from './home-component'
import {admin} from './admin-component'
import {login} from './login-component'
import {groups} from './groups-component'
import {navbar} from './navbar-component'
import {receipt} from './receipt-component'
import {viewreg} from './viewReg-component'
import {director} from './director-component'
import {register} from './register-component'
import {viewcamp} from './viewCamp-component'
import {adminadd} from './adminAdd-component'
import {campavail} from './campAvail-component'
import {directory} from './directory-component'


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
