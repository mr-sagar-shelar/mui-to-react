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
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  onDownloadCilck: () => void
}

const drawerWidth = 240

export default function DrawerAppBar(props: Props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [language, setLanguage] = React.useState('1')
  const [styleType, setStyleType] = React.useState('1')
  const [spacing, setSpacing] = React.useState('1')

  const onLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value)
  }

  const onStyleChange = (event: SelectChangeEvent) => {
    setStyleType(event.target.value)
  }

  const onSpacingChange = (event: SelectChangeEvent) => {
    setSpacing(event.target.value)
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            MUI to React
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
              <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={language} onChange={onLanguageChange} label="Language">
                <MenuItem value={1}>Javascript</MenuItem>
                <MenuItem value={2}>Typescript</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-standard-label">Style Type</InputLabel>
              <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={styleType} onChange={onStyleChange} label="Language">
                <MenuItem value={1}>CSS</MenuItem>
                <MenuItem value={2}>Styled Components</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-standard-label">Spacing</InputLabel>
              <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={spacing} onChange={onSpacingChange} label="Language">
                <MenuItem value={1}>sx</MenuItem>
                <MenuItem value={2}>px</MenuItem>
                <MenuItem value={3}>rem</MenuItem>
                <MenuItem value={4}>rem(as 10px)</MenuItem>
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
