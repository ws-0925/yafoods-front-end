// ** MUI Components
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

interface LogoIllustrationProp {
  image?: string
}

// Styled Components
const LogoImg = styled('img')(({ theme }) => ({
  maxWidth: '3.5rem',
  borderRadius: '50%',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '3.5rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '3rem'
  }
}))

const LogoIllustration = (props: LogoIllustrationProp) => {
  // ** Props
  const { image } = props

  // ** Hook
  const theme = useTheme()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const src = image || `/images/logos/logo.png`

  if (!hidden) {
    return <LogoImg alt='logo' src={src} />
  } else {
    return null
  }
}

export default LogoIllustration
