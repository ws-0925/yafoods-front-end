// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** import Redux
import { addAdmin } from 'src/store/apps/admin-users'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { useRouter } from 'next/router'

interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}

const AddUser = () => {
  // ** States

  const [values, setValues] = useState<State>({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [mobile_no, setMobileNo] = useState<string>('')
  const [country_code, setCountryCode] = useState<string>('')
  const [flag_country_code, setFlagCountryCode] = useState<string>('')
  const [admin_user_type_id, setAdminUserTypeId] = useState<string>('')

  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  // ** Actions
  // Handle Password
  const handlePasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }
  const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (values.password == values.password2) {
      const userData = {
        name: name,
        email: email,
        admin_user_type_id: admin_user_type_id,
        country_code: country_code,
        mobile_no: mobile_no,
        flag_country_code: flag_country_code,
        password: values.password
      }

      dispatch(addAdmin(userData))
    } else {
      console.log('the password does not match')
    }
  }

  return (
    <Card>
      <CardHeader title='Add User' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='name'
                value={name}
                onChange={e => {
                  setName(e.target.value)
                }}
                placeholder=''
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='email'
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                }}
                label='Email'
                placeholder='carterleonard@gmail.com'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Mobile Number'
                value={mobile_no}
                onChange={e => {
                  setMobileNo(e.target.value)
                }}
                placeholder=''
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Country Code'
                value={country_code}
                onChange={e => {
                  setCountryCode(e.target.value)
                }}
                placeholder=''
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Admin User Type Id'
                value={admin_user_type_id}
                onChange={e => {
                  setAdminUserTypeId(e.target.value)
                }}
                placeholder=''
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Flag Country Code'
                value={flag_country_code}
                onChange={e => {
                  setFlagCountryCode(e.target.value)
                }}
                placeholder=''
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='form-layouts-separator-password'
                  onChange={handlePasswordChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-password-2'>Confirm Password</InputLabel>
                <OutlinedInput
                  value={values.password2}
                  label='Confirm Password'
                  id='form-layouts-separator-password-2'
                  onChange={handleConfirmChange('password2')}
                  type={values.showPassword2 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        <Icon icon={values.showPassword2 ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button type='reset' size='large' color='secondary' variant='outlined' onClick={() => router.back()}>
            Back
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default AddUser
