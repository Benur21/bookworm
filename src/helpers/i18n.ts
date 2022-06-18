import en from '../i18n/en.json';
import { Language, fallBackLang as defaultLang } from './consts';

const langsList = Object.values(Language);
const getSelectedLang = () =>
  (localStorage.getItem('lang') as Language | undefined) || defaultLang;

/**
 * This function returns the translation of some text.
 * @param {keyof typeof en} id Required. ID of the text.
 * @param {string} defaultValue Optional. Text to show if no translation. Default is ID.
 * @param {string} lang Optional. Use this language instead of the localStorage one.
 */
const i18n = (id: keyof typeof en, defaultValue?: string, lang?: Language) => {
  let loadedLang: (typeof en) | any;
  
  if (!lang) {
    // Make sure the lang saved in LS is available in the Language enum
    const selectedLang = getSelectedLang();
    if (langsList.includes(selectedLang)) {
      lang = selectedLang;
    } else {
      lang = defaultLang;
      localStorage.setItem("lang", defaultLang);
    }
  }
  
  try {
    loadedLang = require(`../i18n/${lang}.json`);
  } catch (err) {
    console.error("Language file not found.")
    loadedLang = {};
  }
  
  return loadedLang[id] ? loadedLang[id] : (defaultValue || id);
}

i18n.langs = langsList;
i18n.getSelectedLang = getSelectedLang;
i18n.defaultLang = defaultLang;

export default i18n;
