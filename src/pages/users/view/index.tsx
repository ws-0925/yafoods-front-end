import Grid from '@mui/material/Grid'

import UserViewLeft from './userViewLeft'
import OrderList from './orderList'

const UserView = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <OrderList />
      </Grid>
    </Grid>
  )
}

export default UserView
