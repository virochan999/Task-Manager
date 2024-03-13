import React, { MouseEventHandler } from 'react'
import './Button.scss'

interface ButtonPropTypes<T extends React.SyntheticEvent> {
  buttonType: string,
  buttonText: string,
  addIcon?: boolean,
  handleBtnClick: (e?: T) => void;
  children?: React.ReactNode,
  btnType?: "button" | "submit" | "reset"
}

const Button = <T extends React.SyntheticEvent>(
  { 
    buttonType, 
    buttonText, 
    handleBtnClick, 
    addIcon=false, 
    btnType="button", 
    children 
  }:ButtonPropTypes<T>
) => {

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    handleBtnClick(e as unknown as T)
  }

  return (
    <button 
      className={`btn ${buttonType}`} 
      onClick={onClickHandler}
      type={btnType}
    >
      { children }
      { buttonType === 'primary' && addIcon && <span>+</span> }
      { buttonText }
    </button>
  )
}

export default Button