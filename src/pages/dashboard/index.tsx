// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// ** Main Card Imports
import CardTotalOrders from 'src/views/cards/CardTotalOrders'
import CardTotalSales from 'src/views/cards/CardTotalSales'
import CardTotalProducts from 'src/views/cards/CardTotalProducts'
import CardTotalCustomers from 'src/views/cards/CardTotalCustomers'

// ** Styled Component Import
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Main Chart Imports
import OrdersChart from 'src/views/charts/chartjs/OrdersChart'
import SalesChart from 'src/views/charts/chartjs/SalesChart'
import SalesCityChart from 'src/views/charts/chartjs/SalesCityChart'
import SalesComparisonChart1 from 'src/views/charts/chartjs/SalesComparisonChart1'
import SalesComparisonChart2 from 'src/views/charts/chartjs/SalesComparisonChart2'
import StatusChart from 'src/views/charts/chartjs/StatusChart'
import OrderBySourceChart from 'src/views/charts/chartjs/OrderBySourceChart'
import SalesByPaymentChart from 'src/views/charts/chartjs/SalesByPaymentChart'
import SalesByChannelsChart from 'src/views/charts/chartjs/SalesByChannelsChart'

// ** register categoryscale
// import { CategoryScale } from 'chart.js'
// import Chart from 'chart.js/auto'

// Chart.register(CategoryScale)

const Dashboard = () => {
  const theme = useTheme()
  const barChartYellow = '#ffcf5c'
  const barChartGreen = '#79eb6a'
  const barChartRed = '#d43b48'
  const barChartBlue = '#16B1FF'
  const barChartDarkBlue = '#3b3a7e'
  const labelColor = theme.palette.text.disabled
  const borderColor = theme.palette.divider

  return (
    <DatePickerWrapper className='match-height'>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h4'>Dashboard</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardTotalOrders />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardTotalSales />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardTotalProducts />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardTotalCustomers />
        </Grid>
        <Grid item xs={12} md={6}>
          <OrdersChart yellow={barChartYellow} labelColor={labelColor} borderColor={borderColor} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SalesChart green={barChartGreen} labelColor={labelColor} borderColor={borderColor} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SalesComparisonChart1 green={barChartGreen} labelColor={labelColor} borderColor={borderColor} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SalesComparisonChart2 darkBlue={barChartDarkBlue} labelColor={labelColor} borderColor={borderColor} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SalesCityChart red={barChartRed} labelColor={labelColor} borderColor={borderColor} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatusChart blue={barChartBlue} labelColor={labelColor} borderColor={borderColor} />
        </Grid>
        <Grid item xs={12} md={4}>
          <OrderBySourceChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <SalesByPaymentChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <SalesByChannelsChart />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default Dashboard
