import { LANGUAGE } from '../config/language'
import THAI from './th'
import ENGLISH from './en'

const t = () => {
  switch(LANGUAGE) {
    case 'th':
      return THAI
    case 'en':
      return ENGLISH
    default:
      return ENGLISH
  }
}

export default { t }