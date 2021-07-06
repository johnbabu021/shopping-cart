import propTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

export default function ProtectedRoute({ user, children, ...rest }) {

    return (
        <Route

            {...rest}
            render={({ location }) => {
                if (user) {
                    return children
                    //dashboard
                }

                if (!user) {
                    return (
                        <Redirect to={{
                            pathname: ROUTES.LOGIN,
                            state: { from: location }
                        }}></Redirect>
                    )
                }
                return null;
            }
            }
        >



        </Route>


    )

}

ProtectedRoute.propTypes = {
    user: propTypes.object,
    children: propTypes.object.isRequired
}
