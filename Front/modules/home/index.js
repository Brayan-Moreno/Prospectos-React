import React, { useEffect } from 'react'

import { useAuth } from '@hooks/useAuth'
import { useModule } from '@hooks/useModule'
import { useRouter } from 'next/router'

const HomeView = props => {
  const { isLogged } = useAuth()
  const { clean } = useModule()
  const { push } = useRouter()

  // useEffect(() => {
  //   if (!isLogged) {
  //     push('/')
  //     clean()
  //   }
  // }, [isLogged])
  
  return (
    <div style={{ width: '100%', textAlign: 'center', marginTop: 150 }}>
      <img src={`${window.location.origin}/icons/calzzapato.svg`} style={{ opacity: 0.3 }} />
    </div>
  )
}

export default HomeView