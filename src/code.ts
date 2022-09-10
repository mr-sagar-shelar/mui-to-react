import { STORAGE_KEYS } from './utils/storageKeys'
import { LanguageType, UnitType } from './utils/buildSizeStringByUnit'
import { modifyTreeForComponent } from './utils/modifyTreeForComponent'
import { buildCode } from './utils/buildCode'
import { buildTagTree } from './utils/buildTagTree'
import { buildCssString, CssStyle } from './utils/buildCssString'
import { UserComponentSetting } from './utils/UserComponentSetting'
import { TextCount } from './utils/getCssDataForTag'

figma.showUI(__html__, { width: 800, height: 800 })

const selectedNodes = figma.currentPage.selection

async function generate(node: SceneNode, config: { cssStyle?: CssStyle; unitType?: UnitType; languageType?: LanguageType }) {
  let cssStyle = config.cssStyle
  if (!cssStyle) {
    cssStyle = await figma.clientStorage.getAsync(STORAGE_KEYS.CSS_STYLE_KEY)

    if (!cssStyle) {
      cssStyle = 'css'
    }
  }

  let unitType = config.unitType
  if (!unitType) {
    unitType = await figma.clientStorage.getAsync(STORAGE_KEYS.UNIT_TYPE_KEY)

    if (!unitType) {
      unitType = 'px'
    }
  }

  let languageType = config.languageType
  if (!languageType) {
    languageType = await figma.clientStorage.getAsync(STORAGE_KEYS.LANGUAGE_KEY)

    if (!languageType) {
      languageType = 'javascript'
    }
  }

  const userComponentSettings: UserComponentSetting[] = (await figma.clientStorage.getAsync(STORAGE_KEYS.USER_COMPONENT_SETTINGS_KEY)) || []

  const textCount = new TextCount()

  const originalTagTree = buildTagTree(node, unitType, textCount)
  if (originalTagTree === null) {
    figma.notify('Please select a visible node')
    return
  }

  const tag = await modifyTreeForComponent(originalTagTree, figma)
  const generatedCodeStr = buildCode(tag, cssStyle)
  const cssString = buildCssString(tag, cssStyle)

  figma.ui.postMessage({ generatedCodeStr, cssString, cssStyle, unitType, languageType, userComponentSettings })
}

if (selectedNodes.length > 1) {
  figma.notify('Please select only 1 node')
  figma.closePlugin()
} else if (selectedNodes.length === 0) {
  figma.notify('Please select a node')
  figma.closePlugin()
} else {
  generate(selectedNodes[0], {})
}

figma.ui.onmessage = (msg) => {
  if (msg.type === 'notify-copy-success') {
    figma.notify('copied to clipboard👍')
  }
  if (msg.type === 'new-css-style-set') {
    figma.clientStorage.setAsync(STORAGE_KEYS.CSS_STYLE_KEY, msg.cssStyle)
    generate(selectedNodes[0], { cssStyle: msg.cssStyle })
  }
  if (msg.type === 'new-unit-type-set') {
    figma.clientStorage.setAsync(STORAGE_KEYS.UNIT_TYPE_KEY, msg.unitType)
    generate(selectedNodes[0], { unitType: msg.unitType })
  }
  if (msg.type === 'new-language-set') {
    figma.clientStorage.setAsync(STORAGE_KEYS.LANGUAGE_KEY, msg.languageType)
    generate(selectedNodes[0], { languageType: msg.languageType })
  }
  if (msg.type === 'update-user-component-settings') {
    figma.clientStorage.setAsync(STORAGE_KEYS.USER_COMPONENT_SETTINGS_KEY, msg.userComponentSettings)
    generate(selectedNodes[0], {})
  }
}
