import React from 'react'
import '@/styles/globals.css'
type HeaderProps = {
  name: string
}

const Header = ({ name }: HeaderProps) => {
  return <h1 className='custom-heading'>{name}</h1>
}
export default Header
