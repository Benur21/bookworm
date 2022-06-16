import en from '../i18n/en.json';
import pt from "../i18n/pt.json";

/**
 * 
 */
const i18n = (id: string, defaultValue: string, lang?: string) => {
  let lng: any;
  switch (lang) {
    case "pt":
      lng = pt;
      break;
    case "en":
    default:
      lng = en;
      break;
  }
  
  return lng[id] ? lng[id] : defaultValue;
}

export default i18n;
