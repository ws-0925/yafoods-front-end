// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
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
          placeholder='Search PromoCode'
          onChange={e => handleFilter(e.target.value)}
        />
      </Box>
      <Button
        sx={{ mb: 2 }}
        variant='contained'
        onClick={() => {
          router.replace('/promocode/AddPromoCode')
        }}
      >
        Add PromoCode
      </Button>
    </Box>
  )
}

export default TableHeader
