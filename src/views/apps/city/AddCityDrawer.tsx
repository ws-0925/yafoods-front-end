// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface SidebarAddCityType {
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  eName: yup.string().required(),
  aName: yup.string().required(),
  region: yup.string().required(),
  description: yup.string().required(),
  storeId: yup.number().typeError('Contact Number field is required').required()
})

const defaultValues = {
  eName: '',
  aName: '',
  description: '',
  region: '',
  storeId: Number('')
}

const SidebarAddCity = (props: SidebarAddCityType) => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [status, setStatus] = useState<string>('')

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = () => {
    console.log('click me')
  }

  const handleClose = () => {
    setStatus('')
    toggle()
    reset()
  }

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header sx={{ mt: 10 }}>
        <Typography variant='h4'>Add City</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5, pt: 15 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='eName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='English Name'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.eName)}
                />
              )}
            />
            {errors.eName && <FormHelperText sx={{ color: 'error.main' }}>{errors.eName.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='aName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Arabic Name'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.eName)}
                />
              )}
            />
            {errors.aName && <FormHelperText sx={{ color: 'error.main' }}>{errors.aName.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Description'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.description)}
                />
              )}
            />
            {errors.description && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='region'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Region'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.region)}
                />
              )}
            />
            {errors.region && <FormHelperText sx={{ color: 'error.main' }}>{errors.region.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='storeId'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='StoreId'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.storeId)}
                />
              )}
            />
            {errors.storeId && <FormHelperText sx={{ color: 'error.main' }}>{errors.storeId.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='status-select'>Select Status</InputLabel>
            <Select
              fullWidth
              value={status}
              id='select-status'
              label='Select Status'
              labelId='status-select'
              onChange={handleStatusChange}
              inputProps={{ placeholder: 'Select Role' }}
            >
              <MenuItem value=''>Select Status</MenuItem>
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='inactive'>Inactive</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', mt: 20 }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddCity
