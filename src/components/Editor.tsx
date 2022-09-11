import * as React from 'react'
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import * as Mui from '@mui/material'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/theme-monokai'
import SplitPane, { Pane } from 'react-split-pane-next'

const materialScope = { ...Mui }

interface EditorProps {
  currentCode: string
  setCurrentCode: (code: string) => void
}

export default function Editor(props: EditorProps) {
  const { currentCode, setCurrentCode } = props

  const onChange = (newValue: string) => {
    setCurrentCode(newValue)
  }

  return (
    <>
      <LiveProvider code={currentCode} scope={materialScope}>
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
    </>
  )
}
