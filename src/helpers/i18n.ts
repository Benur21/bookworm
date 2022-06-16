import en from '../i18n/en.json';
import pt from "../i18n/pt.json";

/**
 * This function returns the translation of some text.
 * @param {string} id Required. ID of the text.
 * @param {string} defaultValue Optional. Text to show if no translation. Default is ID.
 * @param {string} lang Optional. Use this language instead of the localStorage one.
 */
const i18n = (id: string, defaultValue?: string, lang?: string) => {
  let lng: any;
  if (!lang) {
    lang = localStorage.getItem("lang") || "en";
  }
  switch (lang) {
    case "pt":
      lng = pt;
      break;
    case "en":
      lng = en;
      break;
    default:
      lng = {}
      break;
  }
  
  return lng[id] ? lng[id] : (defaultValue || id);
}

export default i18n;
