import useUserInfo from '@/hooks/useUserInfo';
import Link from 'next/link';
import React from 'react'
import EditableImage from './EditableImage'

const Avatar = ({src,big,onChange,editable=false}) => {
  const { userInfo, setUserInfo } = useUserInfo();
  const widthClass = big ? "w-20 h-20 md:w-14 md:h-14 " : "w-12 h-12"
  return (
    <div className='rounded-full overflow-hidden'>
   <Link href={`/${userInfo?.username}`}><EditableImage
      type={'image'}
      src={src}
      onChange={onChange}
      editable={editable}
      className={'rounded-full overflow-hidden ' + widthClass} /></Link> 
  </div>
  )
}

export default Avatar