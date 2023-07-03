import {createI18n} from 'vue-i18n'
import messages from './messages.js'

export const defaultLocale = 'en-US'
let _i18n

function setup(options = { locale: defaultLocale }) {
    console.log(options)
    _i18n = createI18n({
        legacy: false,
        locale: options.locale,
        fallbackLocale: defaultLocale,
        globalInjection: true,
        messages,
    })
    setLocale(options.locale)
    return _i18n
}
// Sets the active locale.
function setLocale(newLocale) {
    _i18n.global.locale.value = newLocale
}

// Public interface
export default {
    // Expose the VueI18n instance via a getter
    get vueI18n() {
        return _i18n
    },
    setup,
    setLocale,
}