// ** React Imports
import { useState, MouseEvent, useCallback } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { IconButton } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import Table from '@mui/material/Table'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Table Components Imports
import { RoleType } from 'src/types/apps/roleType'

interface viewDataType {
  totalRoles: number
  totalActiveRoles: number
  totalInactiveRoles: number
}

const viewData: viewDataType = {
  totalRoles: 82,
  totalActiveRoles: 37,
  totalInactiveRoles: 25
}

interface CellType {
  row: RoleType
}

const roles = [
  {
    id: 1,
    name: 'Location Management'
  },
  {
    id: 2,
    name: 'Category Management'
  },
  {
    id: 3,
    name: 'Product Management'
  },
  {
    id: 4,
    name: 'PromoCode Management'
  },
  {
    id: 5,
    name: 'Channel Management'
  },
  {
    id: 6,
    name: 'User Management'
  },
  {
    id: 7,
    name: 'Notification Management'
  },
  {
    id: 8,
    name: 'Order Management'
  }
]

const rolesArr = [
  'Location Management',
  'Category Management',
  'Product Management',
  'PromoCode Management',
  'Channel Management',
  'User Management',
  'Notification Management',
  'Order Management'
]

const NotificationList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(10)
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
  }

  const togglePermission = (id: string) => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      rolesArr.forEach(role => {
        const id = role.toLowerCase().split(' ').join('-')
        togglePermission(`${id}-read`)
        togglePermission(`${id}-write`)
        togglePermission(`${id}-create`)
      })
    }
  }

  const handleFilter = useCallback((val: string) => {
    setValue(val)
    setIsFirst(false)
    if (val == '') {
      setFilterData(roles)

      return
    }
    let data: any = []
    data = roles.filter((item: { name: any }) => item.name.toLowerCase().search(val) != -1)
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
          <MenuItem
            onClick={() => {
              handleRowOptionsClose()
              handleClickOpen()
              setDialogTitle('Edit')
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleRowOptionsClose}>
            <Icon icon='mdi:delete-outline' fontSize={20} />
            Delete
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
            <Grid item xs={12} md={4}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#16B1FF', height: '100%' }}>
                <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                  <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                    Total Roles: {viewData.totalRoles}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#d43b48', height: '100%' }}>
                <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                  <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                    Total Active Roles: {viewData.totalActiveRoles}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#79eb6a', height: '100%' }}>
                <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                  <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                    Total Inactive Roles: {viewData.totalInactiveRoles}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} sx={{ mt: 15 }}>
        <Card>
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
                placeholder='Search Role'
                onChange={e => handleFilter(e.target.value)}
              />
            </Box>
            <Button
              sx={{ mb: 2 }}
              variant='contained'
              onClick={() => {
                handleClickOpen()
                setDialogTitle('Add')
              }}
            >
              Add Role
            </Button>
          </Box>
          <DataGrid
            autoHeight
            rows={isFirst ? roles : filterData}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <Typography variant='h5' component='span'>
            {`${dialogTitle} Role`}
          </Typography>
          <Typography variant='body2'>Set Role Permissions</Typography>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
          <Box sx={{ my: 4 }}>
            <FormControl fullWidth>
              <TextField label='Role Name' placeholder='Enter Role Name' />
            </FormControl>
          </Box>
          <Typography variant='h6'>Role Permissions</Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: '0 !important' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap',
                        alignItems: 'center',
                        textTransform: 'capitalize',
                        '& svg': { ml: 1, cursor: 'pointer' }
                      }}
                    >
                      Administrator Access
                      <Tooltip placement='top' title='Allows a full access to the system'>
                        <Box sx={{ display: 'flex' }}>
                          <Icon icon='mdi:information-outline' fontSize='1rem' />
                        </Box>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <FormControlLabel
                      label='Select All'
                      sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                      control={
                        <Checkbox
                          size='small'
                          onChange={handleSelectAllCheckbox}
                          indeterminate={isIndeterminateCheckbox}
                          checked={selectedCheckbox.length === roles.length * 3}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rolesArr.map((i: any, index: number) => {
                  const id = i.toLowerCase().split(' ').join('-')

                  return (
                    <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          color: theme => `${theme.palette.text.primary} !important`
                        }}
                      >
                        {i}
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='Read'
                          control={
                            <Checkbox
                              size='small'
                              id={`${id}-read`}
                              onChange={() => togglePermission(`${id}-read`)}
                              checked={selectedCheckbox.includes(`${id}-read`)}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='Write'
                          control={
                            <Checkbox
                              size='small'
                              id={`${id}-write`}
                              onChange={() => togglePermission(`${id}-write`)}
                              checked={selectedCheckbox.includes(`${id}-write`)}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='Create'
                          control={
                            <Checkbox
                              size='small'
                              id={`${id}-create`}
                              onChange={() => togglePermission(`${id}-create`)}
                              checked={selectedCheckbox.includes(`${id}-create`)}
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
          <Box className='demo-space-x'>
            <Button size='large' type='submit' variant='contained' onClick={handleClose}>
              Submit
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default NotificationList
