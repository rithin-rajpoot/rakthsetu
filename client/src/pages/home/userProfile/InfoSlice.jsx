import React from 'react'

const InfoSlice = ({name="hello",value="adarsh"}) => {
  return (
    <div className="mx-auto w-[95%] h-full bg-[#DBDBDB] rounded-md flex flex-col justify-center px-10 py-5 md:py-0">
        <i className="text-[#5E686D]">{name}</i>
        <p>{value}</p>
    </div>
  )
}

export default InfoSlice
