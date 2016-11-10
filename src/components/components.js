import {potter} from './potter'
import {reg} from './reg-component'

let components = [
  potter,
  reg
]

const dependencies = components.map(c => { return `app.components.${c}`})

export {
  dependencies
}
