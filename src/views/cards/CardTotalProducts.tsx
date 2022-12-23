// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports

const CardTotalProducts = () => {
  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#eda540', height: '100%' }}>
      <CardContent sx={{ p: theme => `${theme.spacing(5.25, 5, 4.5)} !important` }}>
        <Typography
          variant='h6'
          sx={{
            mb: 2.75,
            alignItems: 'center',
            textAlign: 'center',
            color: 'common.white',
            '& svg': { mr: 2.5 }
          }}
        >
          Total Products
        </Typography>
        <Typography variant='h4' sx={{ mb: 3, color: 'common.white', textAlign: 'center' }}>
          34566
        </Typography>
        <Typography variant='body2' sx={{ mb: 1, color: 'common.white', textAlign: 'center' }}>
          Ordered Today: 36
        </Typography>
        <Typography variant='body1' sx={{ color: 'common.white', textAlign: 'center' }}>
          Last 7 Days: 6451
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardTotalProducts
