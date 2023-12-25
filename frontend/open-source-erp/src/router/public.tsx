import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from '../context/useAuth'
import { pagesList } from './pages'

type Props = {
    children: ReactNode
}

function Public(props: Props) {
    const { children } = props

    const { authenticated, loading } = useAuth();

    if (loading) {
        return null
    }

    if (authenticated) {
        console.log("redirecting")
        return <Navigate to={pagesList.Home.path} />
    }

    return <div>{children}</div>
}

export default Public
