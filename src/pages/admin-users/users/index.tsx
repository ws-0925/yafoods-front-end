// ** React Imports
import { useState, MouseEvent, useCallback } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import { IconButton } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/admin-user/TableHeader'

interface viewDataType {
  totalActiveUsers: number
  totalInactiveUsers: number
}

interface UserType {
  id: number
  name: {
    firstName: string
    lastName: string
  }
  email: string
  mobile: string
  gender: string
  employedId: number
  designation: string
  roleAccess: any[]
  password: string
  confirmPassword: string
  status: string
}

const users = [
  {
    id: 1,
    name: {
      firstName: 'John',
      lastName: 'Doe'
    },
    email: 'johndoe@example.com',
    mobile: '1234125',
    gender: 'male',
    employedId: 311,
    designation: 'Software Engineer',
    roleAccess: '',
    password: '',
    confirmPassword: '',
    status: 'active'
  },
  {
    id: 2,
    name: {
      firstName: 'Jack',
      lastName: 'Steven'
    },
    email: 'jactsteven@example.com',
    mobile: '1234125',
    gender: 'male',
    employedId: 312,
    designation: 'Software Engineer',
    roleAccess: '',
    password: '',
    confirmPassword: '',
    status: 'inactive'
  },
  {
    id: 3,
    name: {
      firstName: 'Alexandra',
      lastName: 'Doe'
    },
    email: 'alexandradoe@example.com',
    mobile: '2351512',
    gender: 'female',
    employedId: 313,
    designation: 'Software Engineer',
    roleAccess: '',
    password: '',
    confirmPassword: '',
    status: 'active'
  }
]

const viewData: viewDataType = {
  totalActiveUsers: 37,
  totalInactiveUsers: 25
}

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: UserType
}

const userStatusList: UserStatusType = {
  active: 'success',
  inactive: 'secondary'
}

const UserList = () => {
  // ** State
  const [status, setStatus] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(10)

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setIsFirst(false)
    if (e.target.value == '') {
      setFilterData(users)

      return
    }
    const data = users.filter((item: { status: string }) => item.status == e.target.value)
    setFilterData(data)
    setStatus(e.target.value)
  }, [])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
    setIsFirst(false)
    if (val == '') {
      setFilterData(users)

      return
    }
    let data: any = []
    data = users.filter(
      (item: any) =>
        item.name.firstName.toLowerCase().search(val) != -1 || item.name.lastName.toLowerCase().search(val) != -1
    )
    setFilterData(data)
  }, [])

  const RowOptions = ({ id }: { id: number | string }) => {
    console.log(id)

    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='mdi:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Edit
          </MenuItem>
        </Menu>
      </>
    )
  }

  const columns = [
    {
      flex: 0.3,
      minWidth: 230,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }: CellType) => {
        const { name } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            {name.firstName} {name.lastName}
          </Box>
        )
      }
    },
    {
      flex: 0.3,
      minWidth: 250,
      field: 'email',
      headerName: 'Email',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.email}
          </Typography>
        )
      }
    },
    {
      flex: 0.3,
      minWidth: 250,
      field: 'mobile',
      headerName: 'Mobile Number',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.mobile}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.status}
            color={userStatusList[row.status]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {viewData && (
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#16B1FF', height: '100%' }}>
                <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                  <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                    Total Active Users: {viewData.totalActiveUsers}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#d43b48', height: '100%' }}>
                <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                  <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                    Total Inactive Users: {viewData.totalInactiveUsers}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Status' }}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            rows={isFirst ? users : filterData}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
