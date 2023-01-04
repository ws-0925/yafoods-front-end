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

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { addArea } from 'src/store/apps/area'

interface SidebarAddAreaType {
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
  areaCode: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
  google_area_title: yup.string().required(),
  google_area_title_ar: yup.string().required(),
  city_id: yup.number().required()
})

const defaultValues = {
  eName: '',
  aName: '',
  areaCode: '',
  latitude: '',
  longitude: '',
  google_area_title: '',
  google_area_title_ar: '',
  city_id: ''
}

const SidebarAddArea = (props: SidebarAddAreaType) => {
  // ** Props
  const { open, toggle } = props
  const dispatch = useDispatch<AppDispatch>()

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
    const { eName, aName, areaCode, latitude, longitude, google_area_title, google_area_title_ar, city_id } = data
    const areaData = {
      city_id: city_id,
      latitude: latitude,
      longitude: longitude,
      area_code: areaCode,
      title: [
        {
          locale: 'en',
          value: eName
        },
        {
          locale: 'ar',
          value: aName
        }
      ],
      google_area_title: [
        {
          locale: 'en',
          value: google_area_title
        },
        {
          locale: 'ar',
          value: google_area_title_ar
        }
      ]
    }
    dispatch(addArea(areaData))
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
        <Typography variant='h4'>Add Area</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5, pt: 10 }}>
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
              name='areaCode'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Area Code'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.areaCode)}
                />
              )}
            />
            {errors.areaCode && <FormHelperText sx={{ color: 'error.main' }}>{errors.areaCode.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='latitude'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Latitude'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.latitude)}
                />
              )}
            />
            {errors.latitude && <FormHelperText sx={{ color: 'error.main' }}>{errors.latitude.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='longitude'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='longitude'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.longitude)}
                />
              )}
            />
            {errors.longitude && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.longitude.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='google_area_title'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='google_area_title'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.google_area_title)}
                />
              )}
            />
            {errors.google_area_title && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.google_area_title.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='google_area_title_ar'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='google_area_title_ar'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.google_area_title_ar)}
                />
              )}
            />
            {errors.google_area_title_ar && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.google_area_title_ar.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='city_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='city_id'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.city_id)}
                />
              )}
            />
            {errors.city_id && <FormHelperText sx={{ color: 'error.main' }}>{errors.city_id.message}</FormHelperText>}
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', mt: 5 }}>
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

export default SidebarAddArea
