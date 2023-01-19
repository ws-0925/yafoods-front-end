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

  const handleAllRight = () => {
    setRight([...right, ...left])
    setLeft([])
  }

  const handleCheckedRight = () => {
    setRight([...right, ...leftChecked])
    console.log(right)
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

  const customList = (items: any) => {
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

            return (
              <>
                {isFirst ? <label style={{ paddingLeft: '15px', paddingTop: '5px' }}>{value.parent_name}</label> : ''}
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
                  <ListItemText id={labelId} primary={value.name} sx={{ paddingLeft: '15px' }} />
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
      <Grid item>{customList(left)}</Grid>
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
      <Grid item>{customList(right)}</Grid>
    </Grid>
  )
}
