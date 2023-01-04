// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { addCity } from 'src/store/apps/city'

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
  country_id: yup.string().required()
})

const defaultValues = {
  eName: '',
  aName: '',
  country_id: ''
}

const SidebarAddCity = (props: SidebarAddCityType) => {
  // ** Props
  const { open, toggle } = props
  const dispatch = useDispatch<AppDispatch>()

  // ** State
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

  const onSubmit = (data: any) => {
    const { eName, aName, country_id } = data
    const cityData = {
      country_id: country_id,
      title: [
        {
          locale: 'en',
          value: eName
        },
        {
          locale: 'ar',
          value: aName
        }
      ]
    }
    dispatch(addCity(cityData))
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
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
              name='country_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='CountryId'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.country_id)}
                />
              )}
            />
            {errors.country_id && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.country_id.message}</FormHelperText>
            )}
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
