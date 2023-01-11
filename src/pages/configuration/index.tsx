// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { Divider } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Switch from '@mui/material/Switch'
import Icon from 'src/@core/components/icon'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'

// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'
// import Select from '@mui/material/Select'
// import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// ** Custom Table Components Imports
import { ConfigurationType, VersionType } from 'src/types/apps/configurationType'

interface CellType {
  row: ConfigurationType
}

interface CellType1 {
  row: VersionType
}

const configurations = [
  {
    id: 1,
    name: 'Cash on Delivery',
    status: 'active'
  },
  {
    id: 2,
    name: 'Credit',
    status: 'inactive'
  },
  {
    id: 3,
    name: 'Credit Card',
    status: 'active'
  },
  {
    id: 4,
    name: 'Apple Pay',
    status: 'active'
  },
  {
    id: 5,
    name: 'Wallet',
    status: 'inactive'
  }
]

const versions = [
  {
    id: 1,
    name: 'cur_android_version',
    version: '2.1.6'
  },
  {
    id: 2,
    name: 'cur_ios_version',
    version: '2.1.0'
  },
  {
    id: 3,
    name: 'cur_driver_android_version',
    version: '1.4.2'
  }
]

const NotificationList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(10)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number>(0)

  const handleEditClickOpen = (id: number) => {
    setSelectedId(id - 1)

    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
  }
  const handleFilter = useCallback((val: string) => {
    setValue(val)
    setIsFirst(false)
    if (val == '') {
      setFilterData(configurations)

      return
    }
    let data: any = []
    data = configurations.filter((item: { name: any }) => item.name.toLowerCase().search(val) != -1)
    setFilterData(data)
  }, [])

  const RowOptions = ({ id }: { id: number }) => {
    console.log(id)

    return <Icon icon='mdi:pencil-outline' fontSize={20} onClick={() => handleEditClickOpen(id)} />
  }

  const columns = [
    {
      flex: 0.3,
      minWidth: 230,
      field: 'name',
      headerName: 'Role Name',
      renderCell: ({ row }: CellType) => {
        const { name } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{name}</Box>
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: CellType) => {
        const { status } = row

        return status == 'active' ? <Switch defaultChecked onChange={() => console.log('herer')} /> : <Switch />
      }
    }
  ]

  const columns1 = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'NO',
      renderCell: ({ row }: CellType1) => {
        let index = 0
        for (let i = 0; i < versions.length; i++) {
          if (row.id == versions[i].id) {
            index = i + 1
          }
        }

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{index}</Box>
      }
    },
    {
      flex: 0.3,
      minWidth: 230,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }: CellType1) => {
        const { name } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{name}</Box>
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'version',
      headerName: 'Option Value',
      renderCell: ({ row }: CellType1) => {
        const { version } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{version}</Box>
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType1) => <RowOptions id={row.id} />
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mt: 15 }}>
        <Card>
          <CardHeader variant='h5' title='OMS CONFIGURATION' />
          <Divider sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: '0 !important' }} />
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
                placeholder='Search Configuration'
                onChange={e => handleFilter(e.target.value)}
              />
            </Box>
          </Box>
          <DataGrid
            autoHeight
            rows={isFirst ? configurations : filterData}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
        <Card sx={{ mt: 15 }}>
          <CardHeader variant='h5' title='Manage Version' />
          <DataGrid
            autoHeight
            rows={versions}
            columns={columns1}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
        <Dialog
          open={openEdit}
          onClose={handleEditClose}
          aria-labelledby='user-view-edit'
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
          aria-describedby='user-view-edit-description'
        >
          <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            Edit Version
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              Updating user version.
            </DialogContentText>
            <form>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <TextField fullWidth label='Name' defaultValue={versions[selectedId].version} />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditClose}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleEditClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default NotificationList
