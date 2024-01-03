import { useState } from 'react'

export function useRequestData() {

  const [data, setData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorData, setErrorData] = useState(false)

  async function fetchData(fetchFunction,payload) {
    
    setIsLoading(true)

    try {
        const apiData = await fetchFunction(payload)
        setData(apiData)
        return apiData
    } catch (err) {
        setIsError(true)
        setErrorData(err?.response?.data)
    } finally {
      setIsLoading(false)
    }
  }

  return { data, isLoading, isError, errorData, fetchData }

}
