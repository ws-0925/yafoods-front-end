// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { SingleOrderType } from 'src/types/apps/orderType'

interface data {
  data: SingleOrderType
}

const now = new Date()
const currentMonth = now.toLocaleString('default', { month: 'short' })

const data = {
  order: {
    id: 4987,
    issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
    address: '7777 Mendez Plains',
    company: 'Hall-Robbins PLC',
    companyEmail: 'don85@johnson.com',
    city: 'USA',
    contact: '(616) 865-4180',
    name: 'Jordan Stevenson',
    service: 'Software Development',
    total: 3428,
    avatar: '',
    avatarColor: 'primary',
    orderStatus: 'picked',
    balance: '$724',
    orderDate: `23 ${currentMonth} ${now.getFullYear()}`,
    source: 'android'
  },
  billDetails: {
    billTo: 'Tony Herrera',
    email: 'tony@herrera.com',
    mobile: '555-555-5555'
  },
  deliverOrder: {
    transactionId: 235302195898,
    amount: '10.00',
    orderDate: `23 ${currentMonth} ${now.getFullYear()}`,
    deliverDate: `23 ${currentMonth} ${now.getFullYear()}`,
    deliverTime: '10:00',
    source: 'android'
  }
}

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const LogoImg = styled('img')(({ theme }) => ({
  maxWidth: '2.5rem',
  borderRadius: '50%',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '2.5rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '2rem'
  }
}))

const OrderView = () => {
  // ** Hook

  if (data) {
    return (
      <Box>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                    <LogoImg alt='logo' src='/images/logos/logo.png' />
                    <Typography variant='h6' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2 }}>
                      {themeConfig.templateName}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                  <Table sx={{ maxWidth: '350px' }}>
                    <TableBody>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='h6'>Order Number</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='h6'>{`#${data.order.id}`}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Date Issued:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.order.issuedDate}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Date Due:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.order.orderDate}</Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            </Grid>
          </CardContent>

          <Divider
            sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: theme => `${theme.spacing(5.5)} !important` }}
          />

          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={4} sx={{ mb: { lg: 0, xs: 4 } }}>
                <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                  Deliver To:
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Name: {data.order.name}
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Company: {data.order.company}
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Address: {data.order.address}
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Contact: {data.order.contact}
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Company Email: {data.order.companyEmail}
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Payment Method: 'Apple Pay'
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Order Status: {data.order.orderStatus}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ display: 'flex' }}>
                <div>
                  <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                    Bill To:
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>Name:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'>{data.billDetails.billTo}</Typography>
                          </MUITableCell>
                        </TableRow>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>Email:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'>{data.billDetails.email}</Typography>
                          </MUITableCell>
                        </TableRow>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>Mobile:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'>{data.billDetails.mobile}</Typography>
                          </MUITableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ mb: { lg: 0, xs: 4 } }}>
                <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                  Deliver Order:
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Transaction ID: {data.deliverOrder.transactionId}
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Amount Paid Online: {data.deliverOrder.amount}
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Order Date: {data.deliverOrder.orderDate}
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Deliver Date: {data.deliverOrder.deliverDate}
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Deliver Time: {data.deliverOrder.deliverTime}
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Source: {data.deliverOrder.source}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>

          <Divider sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: '0 !important' }} />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>price</TableCell>
                  <TableCell>qty</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Banana</TableCell>
                  <TableCell>48</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>132</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Apple</TableCell>
                  <TableCell>42</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>68</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <CardContent sx={{ pt: 8 }}>
            <Grid container>
              <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}></Grid>
              <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
                <CalcWrapper>
                  <Typography variant='body2'>Total amount before discount:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    SAR 1800
                  </Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Discount:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    -SAR 30
                  </Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Total amount before discount:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    SAR 1770
                  </Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Deliver fee:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    21%
                  </Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>VAT(15%):</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    SAR 15.67
                  </Typography>
                </CalcWrapper>
                <Divider
                  sx={{ mt: theme => `${theme.spacing(5)} !important`, mb: theme => `${theme.spacing(3)} !important` }}
                />
                <CalcWrapper>
                  <Typography variant='body2'>Total:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    SAR 1690
                  </Typography>
                </CalcWrapper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ mt: 15 }}>
          <Box sx={{ p: 5 }}>
            <Typography variant='h5'>Order Logs</Typography>
          </Box>
          <Divider sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: '0 !important' }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Status</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Created at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Confirmed</TableCell>
                  <TableCell>Jack</TableCell>
                  <TableCell>Android</TableCell>
                  <TableCell></TableCell>
                  <TableCell>2022-12-12</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    )
  } else {
    return null
  }
}

export default OrderView
