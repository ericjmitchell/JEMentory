import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, fetchUser, clearState } from './UserSlice'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  const { isFetching, isError } = useSelector(userSelector)
  useEffect(() => {
    dispatch(fetchUser({ token: localStorage.getItem('token') }))
  }, [])

  const { firstName, lastName } = useSelector(userSelector)

  useEffect(() => {
    if (isError) {
      dispatch(clearState())
      history.push('/login')
    }
  }, [isError])

  const onLogOut = () => {
    localStorage.removeItem('token')

    history.push('/login')
  }

  return (
    <header>
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <nav className="container p-6 mx-auto">
          <div className="container mx-auto">
            JEMentory <h3>{firstName} {lastName}</h3>
          </div>
          <button
            onClick={onLogOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
        </nav>
      )}
    </header>
  )
}

export default Header
