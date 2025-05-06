import React from 'react'

const Heading = ({name}) => {
  return (
    <>
        <div className="w-full h-full flex justify-center items-center">
                        <h1 className="text-start ml-8 text-2xl md:text-3xl font-bold">{name}</h1>
        </div>
    </>
  )
}

export default Heading
