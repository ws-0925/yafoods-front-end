import * as React from 'react'
import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

// import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

interface IProps {
  getCategory: (value: any) => void
  categories: any
}

export default function TransferList(props: IProps) {
  // const dispatch = useDispatch<AppDispatch>()

  const { getCategory, categories } = props

  const [left, setLeft] = React.useState<readonly any[]>(categories)
  const [right, setRight] = React.useState<readonly any[]>([])

  getCategory(right)

  useEffect(() => {
    setLeft(categories)
  }, [categories])

  const handleAllRight = () => {
    setRight([...right, ...left])
    setLeft([])
  }

  const handleAllLeft = () => {
    setLeft([...left, ...right])
    setRight([])
  }

  const handleDblClick = (value: any) => {
    // there is no item in left. => right's value.
    const inRight = !!(left.findIndex(val => val.id === value.id) < 0)
    if (inRight) {
      //pop the value in right. push the item that same id
      setRight(right.filter(val => val.id !== value.id))
      setLeft([...left, value])
    } else {
      setLeft(left.filter(val => val.id !== value.id))
      setRight([...right, value])
    }
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
                <ListItem key={value.id} role='listitem' button>
                  <ListItemText
                    id={labelId}
                    primary={value.name}
                    onDoubleClick={() => handleDblClick(value)}
                    sx={{ paddingLeft: '15px' }}
                  />
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
