import { renderApp } from "../../index";
import i18n from "../../helpers/i18n";

interface LangSelectorTypes {
  x: number;
  y: number;
}

function LangSelector(props: LangSelectorTypes): JSX.Element {
  const {x, y} = props;
  
  const changeLanguage: React.ChangeEventHandler<HTMLSelectElement> = ev => {
    localStorage.setItem('lang', ev.target.value);
    renderApp(); // rerender app to update texts
  };
  
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
      <select
        name="language"
        id="language"
        value={i18n.getSelectedLang()}
        onChange={changeLanguage}
      >
        {i18n.langs.map(lang => (
          <option key={lang} value={lang}>
            {i18n('lang.title', undefined, lang)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LangSelector;
