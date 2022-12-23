// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { CardHeader, Divider } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { getAdminLogs } from 'src/store/apps/logs'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'

// ** Custom Table Components Imports
import { AdminLogsType } from 'src/types/apps/logsType'

interface CellType {
  row: AdminLogsType
}

const AdminLoginLogs = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(10)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAdminLogs())
  }, [dispatch])

  const admins = useSelector((state: RootState) => state.logs.admins)

  const handleFilter = useCallback(
    (val: string) => {
      setValue(val)
      setIsFirst(false)
      if (val == '') {
        setFilterData(admins)

        return
      }
      let data: any = []
      data = admins.filter((item: { name: any }) => item.name.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [admins]
  )

  const columns = [
    {
      flex: 0.3,
      minWidth: 230,
      field: 'name',
      headerName: 'User Name',
      renderCell: ({ row }: CellType) => {
        const { name } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{name}</Box>
      }
    },
    {
      flex: 0.3,
      minWidth: 230,
      field: 'mobileNumber',
      headerName: 'Mobile Number',
      renderCell: ({ row }: CellType) => {
        const { mobileNumber } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{mobileNumber}</Box>
      }
    },
    {
      flex: 0.3,
      minWidth: 230,
      field: 'ipAddress',
      headerName: 'Ip Address',
      renderCell: ({ row }: CellType) => {
        const { ipAddress } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{ipAddress}</Box>
      }
    },
    {
      flex: 0.3,
      minWidth: 230,
      field: 'createdAt',
      headerName: 'Created At',
      renderCell: ({ row }: CellType) => {
        const { createdAt } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{createdAt}</Box>
      }
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader variant='h4' sx={{ p: 5 }} title='Admins Login Logs' />
          <Divider />
          <Box
            sx={{
              p: 5,
              pb: 3,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <TextField
                size='small'
                value={value}
                sx={{ mr: 6, mb: 2 }}
                placeholder='Search Admin'
                onChange={(e: any) => handleFilter(e.target.value)}
              />
            </Box>
          </Box>
          <DataGrid
            autoHeight
            rows={isFirst ? admins : filterData}
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

export default AdminLoginLogs
