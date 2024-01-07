import React, { createContext, useEffect } from 'react'
import { fetchUserData } from '../apis/userApis'
import { useRequestData } from '../hooks/useRequestData'

const UserDataContext = createContext()

export const UserDataProvider = ({ children }) => {
  
    const { data, isLoading, isError, errorData, fetchData } = useRequestData()

  useEffect(() => {
    fetchData(fetchUserData)
  }, [])

  return (
    <UserDataContext.Provider value={{ data, isLoading, isError, errorData, fetchData }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserDataContext