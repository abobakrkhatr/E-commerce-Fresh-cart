import React from 'react'
import error from '../../assets/notfound.svg'


export default function Notfound() {
  return (
    <>
     <div className="flex justify-center items-center mb-14 my-5" style={{ paddingTop: "74.49px" }}>
        <img src={error} alt="error" />
      </div>
    </>
  )
}
