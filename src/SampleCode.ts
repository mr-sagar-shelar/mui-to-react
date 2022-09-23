export const componentExample = `
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

export const noInlineExample = `
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

export const materialButton = `
<Stack spacing={2} direction="row">
  <Button variant="text">Sample </Button>
  <Button variant="contained">Contained</Button>
  <Button variant="outlined">Outlined</Button>
</Stack>
`

export const styledComponent = `
const ButtonContained = styled.div\`
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0561c4;
\`
const UnstyledButton = styled.div\`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1.1rem 2.2rem;
  gap: 0.8rem;
\`
const Text1 = styled.div\`
  text-align: left;
  vertical-align: top;
  font-size: 15px;
  font-family: Deutsche Bank Text;
  letter-spacing: 0.046000000834465024rem;
  line-height: 2.6rem;
  color: #ffffff;
\`

const ButtonComponent = () => {
    return (
      <ButtonContained>
        <UnstyledButton>
          <Text1>Styled Component</Text1>
        </UnstyledButton>
      </ButtonContained>
    )
  }
  
render(<ButtonComponent />)
`

export const cssComponent = `
.button-contained {
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0561c4;
}
.unstyled-button {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1.1rem 2.2rem;
  gap: 0.8rem;
}
.text-1 {
  text-align: left;
  vertical-align: top;
  font-size: 15px;
  font-family: Deutsche Bank Text;
  letter-spacing: 0.046000000834465024rem;
  line-height: 2.6rem;
  color: #ffffff;
}

const ButtonComponent = () => {
    return (
      <button className="button-contained">
        <button className="unstyled-button">
          <p className="text-1">Sample</p>
        </button>
      </button>
    )
  }
  
render(<ButtonComponent />)
`
