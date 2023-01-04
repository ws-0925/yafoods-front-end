// ** React Imports
import { useState, MouseEvent, useCallback, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import CardHeader from '@mui/material/CardHeader'
import { IconButton } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/admin-user/TableHeader'
import { AdminUserType } from 'src/types/apps/adminUserType'

// ** import react-redux
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useSelector } from 'react-redux'
import { getAdmins } from 'src/store/apps/admin-users'

interface viewDataType {
  totalActiveUsers: number
  totalInactiveUsers: number
}

const viewData: viewDataType = {
  totalActiveUsers: 37,
  totalInactiveUsers: 25
}

interface CellType {
  row: AdminUserType
}

const UserList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(10)

  const users = useSelector((state: RootState) => state.adminUsers.users)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAdmins())
  }, [dispatch])

  const handleFilter = useCallback(
    (val: string) => {
      setValue(val)
      setIsFirst(false)
      if (val == '') {
        setFilterData(users)

        return
      }
      let data: any = []
      data = users.filter((item: any) => item.name.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [users]
  )

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

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{name}</Box>
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
      field: 'mobile_no',
      headerName: 'Mobile Number',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.mobile_no}
          </Typography>
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
          <CardHeader title='User Management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
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
