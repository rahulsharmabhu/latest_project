import React from 'react'
import PdLogo from '../../assets/images/pd_logo.png'


const Logo = (props) => {
  
  const {height, width} = props

  return (
      <div className='image_wrapper'>
        <img className='mt-3' src={PdLogo} alt='Point Duty' height={height ? height : 210} width={width ? width : 500} />
      </div>
  )
}

export default Logo