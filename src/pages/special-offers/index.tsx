// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Actions Imports
import { getSpecialOffers } from 'src/store/apps/special-offers'
import { deleteCategory } from 'src/store/apps/category'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/special-offers/TableHeader'
import { SpecialOfferType } from 'src/types/apps/specialOfferType'
import { toast } from 'react-hot-toast'

interface SpecialOfferStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: SpecialOfferType
}

const specialOfferStatusList: SpecialOfferStatusType = {
  1: 'success',
  0: 'secondary'
}

const SpecialOfferList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(10)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const specialOffers = useSelector((state: RootState) => state.specialOffers.specialOffers)

  useEffect(() => {
    dispatch(getSpecialOffers())
  }, [dispatch])

  const handleDeleteCategory = (id: number) => {
    dispatch(deleteCategory(id)).then(res => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('internal server error')
    })
  }

  const handleFilter = useCallback(
    (val: string) => {
      setValue(val)
      setIsFirst(false)
      if (val == '') {
        setFilterData(specialOffers)

        return
      }
      let data: any = []
      data = specialOffers.filter((item: any) => item.special_offer_id.id.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [specialOffers]
  )

  const columns = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'id',
      headerName: 'Category Name',
      renderCell: ({ row }: CellType) => {
        const { id } = row.special_offer_id

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{id}</Box>
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'image',
      headerName: 'Category Name',
      renderCell: ({ row }: CellType) => {
        const { image } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{image}</Box>
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.special_offer_id.status == 1 ? 'active' : 'inactive'}
            color={specialOfferStatusList[row.special_offer_id.status]}
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
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Delete Special Offer'>
              <IconButton size='small' onClick={() => handleDeleteCategory(row.special_offer_id.id)}>
                <Icon icon='mdi:delete-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit Special Offer'>
              <IconButton
                size='small'
                component={Link}
                href={{
                  pathname: '/special-offers/EditSpecialOffer',
                  query: {
                    id: row.special_offer_id.id
                  }
                }}
              >
                <Icon icon='mdi:edit-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Special Offer Management'
            sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
          />
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            rows={isFirst ? specialOffers : filterData}
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

export default SpecialOfferList