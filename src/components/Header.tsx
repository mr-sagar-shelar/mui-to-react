import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { CssStyle } from '../utils/buildCssString'
import { UnitType, LanguageType } from '../utils/buildSizeStringByUnit'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { messageTypes } from '../utils/messageTypes'

const cssStyles: { value: CssStyle; label: string }[] = [
  { value: 'css', label: 'CSS' },
  { value: 'styled-components', label: 'Styled Components' }
]

const languageTypes: { value: LanguageType; label: string }[] = [
  { value: 'javascript', label: 'Javascript' },
  { value: 'typescript', label: 'Typescript' }
]

const unitTypes: { value: UnitType; label: string }[] = [
  { value: 'sx', label: 'sx' },
  { value: 'px', label: 'px' },
  { value: 'rem', label: 'rem' },
  { value: 'remAs10px', label: 'rem(as 10px)' }
]

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  onDownloadCilck: () => void
  selectedCssStyle: CssStyle
  selectedLanguage: LanguageType
  selectedUnitType: UnitType
}

const drawerWidth = 240

export default function DrawerAppBar(props: Props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const onLanguageChange = (event: SelectChangeEvent) => {
    const msg: messageTypes = { type: 'new-language-set', languageType: event.target.value as LanguageType }
    parent.postMessage({ pluginMessage: msg }, '*')
  }

  const onStyleChange = (event: SelectChangeEvent) => {
    const msg: messageTypes = { type: 'new-css-style-set', cssStyle: event.target.value as CssStyle }
    parent.postMessage({ pluginMessage: msg }, '*')
  }

  const onUnitChange = (event: SelectChangeEvent) => {
    const msg: messageTypes = { type: 'new-unit-type-set', unitType: event.target.value as UnitType }
    parent.postMessage({ pluginMessage: msg }, '*')
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI to React
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding onClick={props.onDownloadCilck}>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary={'Download'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            MUI to React
          </Typography> */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
              <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={props.selectedLanguage} onChange={onLanguageChange} label="Language">
                {languageTypes.map((style) => (
                  <MenuItem key={style.value} value={style.value}>
                    {style.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-standard-label">Style Type</InputLabel>
              <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={props.selectedCssStyle} onChange={onStyleChange} label="Style Type">
                {cssStyles.map((style) => (
                  <MenuItem key={style.value} value={style.value}>
                    {style.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-standard-label">Units</InputLabel>
              <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={props.selectedUnitType} onChange={onUnitChange} label="Units">
                {unitTypes.map((style) => (
                  <MenuItem key={style.value} value={style.value}>
                    {style.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar />
      </Box>
    </Box>
  )
}
