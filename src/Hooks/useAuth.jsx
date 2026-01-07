import React, { use } from 'react'
import { AuthContext } from '../Components/Contexts/AuthContext'

export default function useAuth() {
    const authInfo = use(AuthContext)
  return authInfo;
}
