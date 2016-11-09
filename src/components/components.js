import {potter} from './potter'

let components = [
  potter
]

const dependencies = components.map(c => { return `app.components.${c}`})

export {
  dependencies
}
