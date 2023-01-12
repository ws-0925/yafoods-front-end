// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import Link from 'next/link'
import { useRouter } from 'next/router'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value } = props
  const router = useRouter()

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search Product Variant'
          onChange={e => handleFilter(e.target.value)}
        />
      </Box>
      <Box>
        <Button variant='contained' sx={{ mr: 5 }} onClick={() => router.back()}>
          Back
        </Button>
        <Button variant='contained' component={Link} href='/products/AddProductVariant/'>
          Add New Product Variant
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
