import EditableImage from "./EditableImage";

import React from 'react'

const HeroUser = ({src,onChange,editable}) => {
  return (
    <EditableImage type={'cover'} src={src} onChange={onChange} editable={editable} className={'h-[25vh] lg:h-[20vh] md:h-[15vh]'} />
  )
}

export default HeroUser

