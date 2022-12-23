import { useState } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material'

const ImageUpload = () => {
  const [image, setImage] = useState({ preview: '', data: '' })

  const LogoImg = styled('img')(({ theme }) => ({
    position: 'absolute',
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    maxWidth: '100%',
    visibility: 'visible',
    [theme.breakpoints.down('xl')]: {
      maxWidth: '2rem'
    },
    [theme.breakpoints.down('lg')]: {
      maxWidth: '1rem'
    }
  }))

  const handleFileChange = (e: any) => {
    e.preventDefault()

    if (!e.target.files?.length) {
      return
    }

    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    }

    setImage(img)
  }

  return (
    <Box sx={{ display: 'flex', position: 'relative', overflow: 'hidden', justifyContent: 'center' }}>
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '15rem',
          height: '15rem',
          backgroundColor: 'black',
          position: 'relative',
          opacity: '0.6'
        }}
      >
        <LogoImg src={image.preview} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          color: 'white',
          top: '40%',
          paddingLeft: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          opacity: '0.3'
        }}
      >
        <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125'
            stroke='currentColor'
            strokeWidth={1.5}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <span className='mt-1 text-xs'>Change Image</span>
      </Box>
      <Box sx={{ position: 'absolute', opacity: 0 }}>
        <input
          type='file'
          accept='image/*'
          name='fileupload'
          onChange={handleFileChange}
          style={{ cursor: 'pointer', height: '8rem' }}
        />
      </Box>
    </Box>
  )
}

export default ImageUpload
