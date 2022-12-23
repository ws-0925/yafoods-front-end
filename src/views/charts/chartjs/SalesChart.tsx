// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import { Bar } from 'react-chartjs-2'
import DatePicker from 'react-datepicker'
import { ChartData, ChartOptions } from 'chart.js'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

interface BarProp {
  green: string
  labelColor: string
  borderColor: string
}

const SalesChart = (props: BarProp) => {
  // ** Props
  const { green, labelColor, borderColor } = props

  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          borderColor,
          drawBorder: false,
          color: borderColor
        },
        ticks: { color: labelColor }
      },
      y: {
        min: 0,
        max: 25000,
        grid: {
          borderColor,
          drawBorder: false,
          color: borderColor
        },
        ticks: {
          stepSize: 5000,
          color: labelColor
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }

  const data: ChartData<'bar'> = {
    labels: [
      '7/11',
      '8/11',
      '9/11',
      '10/11',
      '11/11',
      '12/11',
      '13/11',
      '14/11',
      '15/11',
      '16/11',
      '17/11',
      '18/11',
      '19/11',
      '20/11',
      '21/11',
      '22/11',
      '23/11',
      '24/11',
      '25/11',
      '26/11',
      '27/11',
      '28/11',
      '29/11',
      '30/11',
      '1/12',
      '2/12',
      '3/12',
      '4/12',
      '5/12',
      '6/12',
      '7/12'
    ],
    datasets: [
      {
        maxBarThickness: 15,
        backgroundColor: green,
        borderColor: 'transparent',
        borderRadius: { topRight: 15, topLeft: 15 },
        data: [
          2751, 9024, 1920, 20512, 12125, 815, 5225, 8711, 12237, 15120, 20220, 2011, 19023, 1251, 15123, 21125, 8711,
          11127, 2751, 9032, 19012, 2015, 12125, 1185, 2512, 1230, 19120, 20115, 12235, 8125, 2123
        ]
      }
    ]
  }

  const CustomInput = forwardRef(({ ...props }: any, ref) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='mdi:calendar-outline' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon icon='mdi:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Card>
      <CardHeader
        title='Sales[Last 30 Days]'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <DatePicker
            selectsRange
            id='chartjs-bar'
            endDate={endDate}
            selected={startDate}
            startDate={startDate}
            onChange={handleOnChange}
            placeholderText='Click to select a date'
            customInput={<CustomInput start={startDate} end={endDate} />}
          />
        }
      />
      <CardContent>
        <Bar data={data} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default SalesChart
