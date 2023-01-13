// ** import react
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

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
import { InputLabel } from '@mui/material'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { addCity } from 'src/store/apps/city'
import { getCountries } from 'src/store/apps/country'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { toast } from 'react-hot-toast'

interface SidebarEditCityType {
  open: boolean
  editData: any
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
  aName: yup.string().required()
})

const SidebarEditCity = (props: SidebarEditCityType) => {
  // ** Props
  const { open, toggle, editData } = props
  const name = editData.name
  const dispatch = useDispatch<AppDispatch>()
  const [countryId, setCountryId] = useState<number>(0)

  const countries = useSelector((state: RootState) => state.country.countries)
  const defaultValues = {
    eName: name,
    aName: ''
  }

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

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

  const handleChangeCountry = (e: any) => {
    setCountryId(e.target.value)
  }

  const onSubmit = (data: any) => {
    const { eName, aName } = data
    const cityData = {
      country_id: countryId,
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

    dispatch(addCity(cityData)).then(res => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('internal server error')
    })
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
                  sx={{ direction: 'rtl' }}
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.eName)}
                />
              )}
            />
            {errors.aName && <FormHelperText sx={{ color: 'error.main' }}>{errors.aName.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='country_id'>Select Country</InputLabel>
            <Select
              fullWidth
              value={countryId}
              label='Select Country'
              id='country-id'
              onChange={handleChangeCountry}
              inputProps={{ placeholder: 'Select Country' }}
            >
              <MenuItem value={0}>Select Country</MenuItem>
              {countries.map((country: any) => (
                <MenuItem value={country.id} key={country.id}>
                  {country.name}
                </MenuItem>
              ))}
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

export default SidebarEditCity
