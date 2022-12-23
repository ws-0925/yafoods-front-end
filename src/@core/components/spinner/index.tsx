// ** MUI Import
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook
  const SpinnerImg = styled('img')(({ theme }) => ({
    maxWidth: '3.5rem',
    borderRadius: '50%',
    [theme.breakpoints.down('xl')]: {
      maxWidth: '3.5rem'
    },
    [theme.breakpoints.down('lg')]: {
      maxWidth: '3rem'
    }
  }))

  const src = `/images/logos/logo.png`

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <SpinnerImg alt='logo' src={src} />

      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
