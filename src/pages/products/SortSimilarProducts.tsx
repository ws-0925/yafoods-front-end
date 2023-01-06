// ** React Imports
import { useState, useCallback, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'

// import { DataGridPro } from '@mui/x-data-grid-pro'
import Box from '@mui/material/Box'

// ** Custom Table Components Imports
import TableHeaderSort from 'src/views/apps/category/TableHeaderSort'
import { AgGridReact } from 'ag-grid-react'
import { useDispatch, useSelector } from 'react-redux'
import { useSettings } from 'src/@core/hooks/useSettings'
import { AppDispatch, RootState } from 'src/store'

// ** Actions Imports
import { fetchData } from 'src/store/apps/products'
import { ThemeColor } from 'src/@core/layouts/types'

import PopupCellRenderer from './PopupCellRenderer'

interface ProductStatusType {
  [key: string]: ThemeColor
}
const SortList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const { settings } = useSettings()
  const { mode } = settings

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const products = useSelector((state: RootState) => state.products.products)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const productStatusList: ProductStatusType = {
    active: 'success',
    inactive: 'secondary'
  }

  const handleFilter = useCallback(
    (val: string) => {
      setValue(val)
      setIsFirst(false)
      if (val == '') {
        setFilterData(products)

        return
      }
      let data: any = []
      data = products.filter((item: { similarProduct: any }) => item.similarProduct.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [products]
  )

  let tableColor = ''

  if (mode == 'dark') {
    tableColor = 'rgba(234, 234, 255, 0.87)'
  } else {
    tableColor = 'rgba(76, 78, 100, 0.87)'
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 230,
      field: 'similarProduct',
      headerName: 'Category Name',
      rowDrag: (params: any) => !params.node.group,

      cellStyle: () => {
        return {
          color: tableColor,
          fontFamily: 'Inter'
        }
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'productCategory',
      headerName: 'Product Category',
      cellStyle: () => {
        return {
          color: tableColor,
          fontFamily: 'Inter'
        }
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'channel',
      headerName: 'Channel',
      cellStyle: () => {
        return {
          color: tableColor,
          fontFamily: 'Inter'
        }
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      cellRendererFramework: PopupCellRenderer
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title=' Drag and Drop to Sort Similar Products'
            sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
          />
          <Divider />
          <TableHeaderSort value={value} handleFilter={handleFilter} />
          <Box
            className={mode == 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}
            style={{ width: '100%', height: 500 }}
          >
            <AgGridReact
              rowData={isFirst ? products : filterData}
              columnDefs={columns}
              animateRows={true}
              rowDragManaged={true}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SortList
