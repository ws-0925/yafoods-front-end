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
  eTitle: yup.string().required(),
  aTitle: yup.string().required(),
  eSubject: yup.string().required(),
  aSubject: yup.string().required(),
  eMessage: yup.string().required(),
  aMessage: yup.string().required()
})

const defaultValues = {
  eTitle: '',
  aTitle: '',
  eSubject: '',
  aSubject: '',
  eMessage: '',
  aMessage: ''
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
        <Typography variant='h4'>Add Notification</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5, pt: 10 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='eTitle'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='English Title'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.eTitle)}
                />
              )}
            />
            {errors.eTitle && <FormHelperText sx={{ color: 'error.main' }}>{errors.eTitle.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='aTitle'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Arabic Title'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.aTitle)}
                />
              )}
            />
            {errors.aTitle && <FormHelperText sx={{ color: 'error.main' }}>{errors.aTitle.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='eSubject'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='English Subject'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.eSubject)}
                />
              )}
            />
            {errors.eSubject && <FormHelperText sx={{ color: 'error.main' }}>{errors.eSubject.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='aSubject'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Arabic Subject'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.eSubject)}
                />
              )}
            />
            {errors.aSubject && <FormHelperText sx={{ color: 'error.main' }}>{errors.aSubject.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='eMessage'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='English Message'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.eMessage)}
                />
              )}
            />
            {errors.eMessage && <FormHelperText sx={{ color: 'error.main' }}>{errors.eMessage.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='aMessage'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Arabic Message'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.aMessage)}
                />
              )}
            />
            {errors.aMessage && <FormHelperText sx={{ color: 'error.main' }}>{errors.aMessage.message}</FormHelperText>}
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', mt: '5' }}>
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
