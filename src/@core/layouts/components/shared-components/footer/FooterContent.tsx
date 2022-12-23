// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import themeConfig from 'src/configs/themeConfig'

const FooterContent = () => {
  // ** Var

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`© 2023 `}
        {themeConfig.templateName}
        {`, Built by `}
        <Box component='span'>CODE INC</Box>
      </Typography>
    </Box>
  )
}

export default FooterContent
