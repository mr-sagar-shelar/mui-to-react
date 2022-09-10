import * as React from 'react'
import * as ReactDom from 'react-dom'
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import Typography from '@mui/material/Typography'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-css'
import { CssStyle } from './utils/buildCssString'
import { LanguageType, UnitType } from './utils/buildSizeStringByUnit'
import { UserComponentSetting } from './utils/UserComponentSetting'
import 'ace-builds/src-noconflict/theme-monokai'
import './ui.css'
import SplitPane, { Pane } from 'react-split-pane-next'
import Header from './components/Header'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
const zip = new JSZip()

const componentExample = `
function App() {
  const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}  
`.trim()
const noInlineExample = `
const Wrapper = ({ children }) => (
<div style={{
  background: 'papayawhip',
  width: '100%',
  padding: '2rem'
}}>
  {children}
</div>
)
const Title = () => (
<h3 style={{ color: 'palevioletred' }}>
  Hello World!
</h3>
)
render(
<Wrapper>
  <Title />
</Wrapper>
)
`.trim()

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2'
    }
  }
})

const App: React.VFC = () => {
  const [currentCode, setCurrentCode] = React.useState(noInlineExample)
  const [selectedCssStyle, setCssStyle] = React.useState<CssStyle>('css')
  const [selectedUnitType, setUnitType] = React.useState<UnitType>('px')
  const [selectedLanguage, setSelectedLanguage] = React.useState<LanguageType>('javascript')
  const [userComponentSettings, setUserComponentSettings] = React.useState<UserComponentSetting[]>([])

  const scope = { Typography }

  const onChange = (newValue: string) => {
    setCurrentCode(newValue)
  }

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
    <ThemeProvider theme={darkTheme}>
      <Header selectedLanguage={selectedLanguage} selectedUnitType={selectedUnitType} selectedCssStyle={selectedCssStyle} onDownloadCilck={onDownloadCilck} />
      <LiveProvider code={currentCode} scope={scope}>
        <SplitPane split="vertical">
          <Pane initialSize="50%" minSize="30%">
            <AceEditor
              mode="javascript"
              name="JS"
              theme="monokai"
              width={'100%'}
              height={'100%'}
              showPrintMargin={true}
              showGutter={true}
              tabSize={2}
              value={currentCode}
              setOptions={{
                useWorker: false
              }}
              onChange={onChange}
            />
          </Pane>
          <Pane initialSize="50%" minSize="30%">
            <LiveError />
            <LivePreview />
          </Pane>
        </SplitPane>
      </LiveProvider>
    </ThemeProvider>
  )
}

ReactDom.render(<App />, document.getElementById('mui-to-react'))
