import React, { useEffect } from 'react'

import { useModule } from '@hooks/useModule'
import { useRouter } from 'next/router'

const HomeView = props => {
  const { clean } = useModule()
  const { push } = useRouter()
  
  return (
    <div style={{ width: '100%', textAlign: 'center', marginTop: 150 }}>
      <img src={`${window.location.origin}/icons/vercel.svg`} style={{ opacity: 0.3 }} />
    </div>
  )
}

export default HomeView