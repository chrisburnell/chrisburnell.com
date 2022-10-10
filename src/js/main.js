import "@11ty/is-land/is-land"

import ColorScheme from "./modules/color-scheme"
new ColorScheme(document.getElementById("color-scheme-toggle"))

import welcome from "./common/welcome"
welcome()

import sounds from "./common/sounds"
sounds()

import shareButton from "./common/share-button"
shareButton()
