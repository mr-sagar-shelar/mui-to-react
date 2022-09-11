import * as React from 'react'
import * as ReactDom from 'react-dom'
import { CssStyle } from './utils/buildCssString'
import { LanguageType, UnitType } from './utils/buildSizeStringByUnit'
import { UserComponentSetting } from './utils/UserComponentSetting'
import Header from './components/Header'
import { ThemeProvider } from '@mui/material/styles'
import { saveAs } from 'file-saver'
import CssBaseline from '@mui/material/CssBaseline'
import JSZip from 'jszip'
import Editor from './components/Editor'
import { darkTheme } from './theme'
import { materialButton } from './SampleCode'
const zip = new JSZip()

const App: React.VFC = () => {
  const [currentCode, setCurrentCode] = React.useState(materialButton)
  const [selectedCssStyle, setCssStyle] = React.useState<CssStyle>('css')
  const [selectedUnitType, setUnitType] = React.useState<UnitType>('px')
  const [selectedLanguage, setSelectedLanguage] = React.useState<LanguageType>('javascript')
  const [userComponentSettings, setUserComponentSettings] = React.useState<UserComponentSetting[]>([])

  const onDownloadCilck = () => {
    zip.file('FromCode.js', currentCode)

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, 'GeneratedCode.zip')
    })
  }

  React.useEffect(() => {
    onmessage = (event) => {
      if (event.data.pluginMessage) {
        setCssStyle(event.data.pluginMessage.cssStyle)
        setUnitType(event.data.pluginMessage.unitType)
        setSelectedLanguage(event.data.pluginMessage.languageType)
        const codeStr = event.data.pluginMessage.generatedCodeStr + '\n\n' + event.data.pluginMessage.cssString
        setCurrentCode(codeStr)
        setUserComponentSettings(event.data.pluginMessage.userComponentSettings)
      }
    }
  }, [])

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Header selectedLanguage={selectedLanguage} selectedUnitType={selectedUnitType} selectedCssStyle={selectedCssStyle} onDownloadCilck={onDownloadCilck} />
        <Editor currentCode={currentCode} setCurrentCode={setCurrentCode} />
      </ThemeProvider>
    </>
  )
}

ReactDom.render(<App />, document.getElementById('mui-to-react'))
