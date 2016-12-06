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
  admin
]



const dependencies = components.map(c => { return `app.components.${c}`})

export {
  dependencies
}
