import * as React from 'react'
import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

// import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ListItemIcon } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'

// import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

// import api
// import api from 'src/utils/api'

interface IProps {
  getCategory: (value: any) => void
  categories: any
}

function not(a: readonly any[], b: readonly any[]) {
  return a.filter(value => b.findIndex(v => v.id == value.id) < 0)
}

function intersection(a: readonly any[], b: readonly any[]) {
  return a.filter(value => !!b.find(v => v.id == value.id))
}

export default function TransferList(props: IProps) {
  const [checked, setChecked] = React.useState<readonly any[]>([])

  // const dispatch = useDispatch<AppDispatch>()

  const { getCategory, categories } = props

  // const [isFirst, setIsFirst] = React.useState<boolean>(true)
  const [left, setLeft] = React.useState<readonly any[]>(categories)
  const [right, setRight] = React.useState<readonly any[]>([])
  const rightChecked = intersection(checked, right)
  const leftChecked = intersection(checked, left)

  getCategory(right)

  useEffect(() => {
    setLeft(categories)
  }, [categories])

  const handleToggle = (value: any) => () => {
    const currentIndex = checked.findIndex(v => v.id == value.id)
    const newChecked = [...checked]

    if (currentIndex < 0) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleSelectAllSubCategory = (e: any, value: any, side: string) => {
    let allSubCategories: any[]
    if (side == 'left') {
      allSubCategories = left.filter(
        (item: any) =>
          item.parent_id == value.parent_id &&
          (e.target.checked ? checked.findIndex(val => val.id === item.id) < 0 : true)
      )
    } else {
      allSubCategories = right.filter(
        (item: any) =>
          item.parent_id == value.parent_id &&
          (e.target.checked ? checked.findIndex(val => val.id === item.id) < 0 : true)
      )
    }

    if (e.target.checked) {
      setChecked([...checked, ...allSubCategories])
    } else {
      setChecked(checked.filter(val => allSubCategories.findIndex(v => v.id === val.id) < 0))
    }
  }

  const handleAllRight = () => {
    setRight([...right, ...left])
    setLeft([])
  }

  const handleCheckedRight = () => {
    setRight([...right, ...leftChecked])
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft([...left, ...rightChecked])
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleAllLeft = () => {
    setLeft([...left, ...right])
    setRight([])
  }

  const customList = (items: any, side: string) => {
    let prev_parent_id: number
    const data = items.sort((a: any, b: any) => {
      return a.parent_id - b.parent_id
    })

    return (
      <Paper sx={{ width: 200, height: 230, overflow: 'auto', border: 'solid 1px' }}>
        <List dense component='div' role='list'>
          {data.map((value: any) => {
            const labelId = `transfer-list-item-${value.name}-label`
            const isFirst = prev_parent_id !== value.parent_id
            if (prev_parent_id !== value.parent_id) {
              prev_parent_id = value.parent_id
            }

            let isChecked = false

            if (isFirst) {
              if (side == 'left') {
                isChecked =
                  data
                    .filter((val: any) => val.parent_id === value.parent_id)
                    .findIndex((v: any) => leftChecked.findIndex((v1: any) => v.id === v1.id) < 0) < 0
              }
              if (side == 'right') {
                isChecked =
                  data
                    .filter((val: any) => val.parent_id === value.parent_id)
                    .findIndex((v: any) => rightChecked.findIndex((v1: any) => v.id === v1.id) < 0) < 0
              }
            }

            return (
              <>
                {isFirst ? (
                  <label style={{ paddingLeft: '15px', paddingTop: '5px' }}>
                    {value.parent_name}
                    <Checkbox onClick={e => handleSelectAllSubCategory(e, value, side)} checked={isChecked} />{' '}
                  </label>
                ) : (
                  ''
                )}
                <ListItem key={value.id} role='listitem' button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.findIndex(v => v.id == value.id) > -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': labelId
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.name} />
                </ListItem>
              </>
            )
          })}
          <ListItem />
        </List>
      </Paper>
    )
  }

  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item>{customList(left, 'left')}</Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label='move all right'
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected right'
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label='move selected left'
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label='move all left'
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right, 'right')}</Grid>
    </Grid>
  )
}
