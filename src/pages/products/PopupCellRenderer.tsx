const PopupCellRenderer = (props: any) => {
  console.log(props)

  const { data } = props

  return (
    <div>
      {data.status === 'active' ? (
        <span
          style={{
            color: '#72E128',
            fontFamily: 'Inter',
            backgroundColor: 'rgba(114, 225, 40, 0.12)',
            textTransform: 'capitalize',
            padding: '4px 8px',
            borderRadius: '16px'
          }}
        >
          {' '}
          {data.status}
        </span>
      ) : (
        <span
          style={{
            color: '#6D788D',
            backgroundColor: 'rgba(109, 120, 141, 0.12)',
            fontFamily: 'Inter',
            textTransform: 'capitalize',
            padding: '4px 8px',
            borderRadius: '16px'
          }}
        >
          {' '}
          {data.status}
        </span>
      )}
    </div>
  )
}

export default PopupCellRenderer
