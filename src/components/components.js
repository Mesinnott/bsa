import {reg} from './reg-component'
import {directory} from './directory'
// Import your components here

let components = [
  reg,
  directory
]

const dependencies = components.map(c => { return `app.components.${c}`})

export {
  dependencies
}
