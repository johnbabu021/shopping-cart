import propTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

export default function ProtectedDashboard({ user, children, ...rest }) {

    return (
        <Route

            {...rest}
            render={({ location }) => {
                if (user) {
                    return (
                        <Redirect to={{
                            pathname: ROUTES.HOME,
                            state: { from: location }
                        }}></Redirect>

                    )
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

ProtectedDashboard.propTypes = {
    user: propTypes.object,
    children: propTypes.object.isRequired
}