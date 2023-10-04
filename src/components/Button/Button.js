import React from 'react'
import './Button.css'

const Button = (props) => {
  return (
    <button className='custom-button' onClick={props.onClick} type='submit'>
        {props.label}
    </button>
  )
}

export default Button