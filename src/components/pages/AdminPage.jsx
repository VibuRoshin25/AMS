import React from 'react'
import Header from '../Header'
import StyledDatePicker from '../StyledDatePicker'
import SearchBar from '../SearchBar'
import Recordstable from '../Recordstable'

export default function AdminPage() {
  return (
    <>
     <div className="bg-imgbg backdrop-blur-xl">
     <Header />
     <div className='flex w-screen justify-center gap-20'>
     <StyledDatePicker />
     <SearchBar />
     </div>
     <Recordstable />
     </div>
    </>
  )
}
