import propTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

export default function IsUserLoggedIn({ user, loggedInPath, children, ...rest }) {
   
    //use a reference to medium about this
    //child contains everything inside that 
    //ie wrapped like isuserloggedin and protectedroute and this contains props that like props.children here it is destrctured
    //rest contains other items that is not contained in the rest ites ie children,user,loggedinpath

    return (
        <Route

            {...rest}
            // i think location is included in the rest
            render={({ location }) => {
                if (!user) {
                    return children
                }

                if (user) {
                    return (
                        //take a reference from reactrouter redirect
                        <Redirect to={{
                            pathname: loggedInPath,
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

IsUserLoggedIn.propTypes = {
    user: propTypes.object,
    loggedInPath: propTypes.string.isRequired,
    children: propTypes.object.isRequired
}
