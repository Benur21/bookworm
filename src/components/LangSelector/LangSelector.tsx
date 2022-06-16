import { render } from "../../index";
import i18n from "../../helpers/i18n";

interface LangSelectorTypes {
  x: number;
  y: number;
}

function LangSelector(props: LangSelectorTypes): JSX.Element {
  const {x, y} = props;
  
  const changeLanguage = (ev: any) => {
    localStorage.setItem("lang", ev.target.value);
    render();
  }
  
  return (
    <div
      className={`lang-selector movable`}
      style={{
        left: x,
        top: y,
      }}
    >
      <label htmlFor="language">{i18n('label.language')}:</label>
      <br />
      <select name="language" id="language" onChange={changeLanguage}>
        {i18n.langs.map(lang => (
          <option value={lang} selected={lang === localStorage.getItem('lang')}>
            {i18n('lang.title', undefined, lang)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LangSelector;
