// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { CardHeader, Divider } from '@mui/material'

// import { DataGridPro } from '@mui/x-data-grid-pro'
import Box from '@mui/material/Box'

// ** Custom Table Components Imports
import TableHeaderSort from 'src/views/apps/category/TableHeaderSort'
import { SortCategoryType } from 'src/types/apps/sortCategoryType'
import { AgGridReact } from 'ag-grid-react'

import { useSettings } from 'src/@core/hooks/useSettings'

const categories: SortCategoryType[] = [
  {
    id: 1,
    title: 'Yaa Discuss'
  },
  {
    id: 2,
    title: 'Fruit & Vegetables '
  },
  {
    id: 3,
    title: 'Cooking Essential'
  },
  {
    id: 4,
    title: 'Fruit & Vegetables-discount'
  },
  {
    id: 5,
    title: 'Dates and Coffe'
  },
  {
    id: 6,
    title: 'Cooking Essential'
  },
  {
    id: 7,
    title: 'Fruit & Vegetables-discount'
  },
  {
    id: 8,
    title: 'Dates and Coffe'
  },
  {
    id: 9,
    title: 'Dates and Coffe'
  },
  {
    id: 10,
    title: 'Cooking Essential'
  },
  {
    id: 11,
    title: 'Fruit & Vegetables-discount'
  },
  {
    id: 12,
    title: 'Dates and Coffe'
  }
]
const SortList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const { settings } = useSettings()

  const { mode } = settings
  const handleFilter = useCallback((val: string) => {
    setValue(val)
    setIsFirst(false)
    if (val == '') {
      setFilterData(categories)

      return
    }
    let data: any = []
    data = categories.filter((item: { title: any }) => item.title.toLowerCase().search(val) != -1)
    setFilterData(data)
  }, [])

  let tableColor = ''

  if (mode == 'dark') {
    tableColor = 'rgba(234, 234, 255, 0.87)'
  } else {
    tableColor = 'rgba(76, 78, 100, 0.87)'
  }

  const columns = [
    {
      flex: 0.9,
      minWidth: 230,
      field: 'title',
      headerName: 'Title',
      rowDrag: (params: any) => !params.node.group,
      cellStyle: () => {
        return {
          color: tableColor,
          fontFamily: 'Inter'
        }
      }
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader variant='h4' sx={{ p: 5 }} title='Drag and Drop to Sort Categories' />
          <Divider sx={{ m: '0 !important' }} />
          <TableHeaderSort value={value} handleFilter={handleFilter} />
          <Box
            className={mode == 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}
            style={{ width: '100%', height: 500 }}
          >
            <AgGridReact
              rowData={isFirst ? categories : filterData}
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
