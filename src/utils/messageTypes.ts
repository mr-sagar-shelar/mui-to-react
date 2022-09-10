import { CssStyle } from './buildCssString'
import { UnitType, LanguageType } from './buildSizeStringByUnit'
import { UserComponentSetting } from './userComponentSetting'
export type messageTypes =
  | { type: 'notify-copy-success' }
  | { type: 'new-css-style-set'; cssStyle: CssStyle }
  | { type: 'new-unit-type-set'; unitType: UnitType }
  | { type: 'new-language-set'; languageType: LanguageType }
  | { type: 'update-user-component-settings'; userComponentSettings: UserComponentSetting[] }
