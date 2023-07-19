import { Navigate } from "react-router-dom";

export default function ProtectedRouteloggedIn ({isLoggedIn, element: Component, ...props}) {
    return (
        isLoggedIn ? <Component {...props}/> : <Navigate to="/login" replace/>
    )
}