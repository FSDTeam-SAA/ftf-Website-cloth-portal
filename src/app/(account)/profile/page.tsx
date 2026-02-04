import PersonalInformation from '@/components/account/pages/PersonalInformation'
import ProfileCard from '@/components/account/pages/ProfileCard'
import React from 'react'

const page = () => {
  return (
    <div>
        <ProfileCard />
        <PersonalInformation />
    </div>
  )
}

export default page