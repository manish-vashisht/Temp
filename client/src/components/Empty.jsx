import Image from 'next/image'
import React from 'react'

const Empty = () => {
  return (
    <div className='hidden sm:flex border-conversation-border border-l w-full bg-panel-header-background flex flex-col h-[100vh] border-b-4 border-b-icon-green items-center justify-center'>
      <Image src='/whatsapp.gif' alt='Whatsapp' height={300} width={300} priority />
    </div>
  )
}

export default Empty
