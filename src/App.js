import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import userContext from "./context/user";
import useAuthListner from "./hooks/user-auth-user";
import IsUserLoggedIn from "./helpers/is-user-loggedin";
import ProtectedRoute from "./helpers/protected-route";
import ProtectedDashboard from "./helpers/protected-dashboard";
import { GlobalProvider } from "./context/GlobalState";
// import lottie from 'lottie-web'
const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const Home = lazy(() => import("./pages/home"));
const ProductDetails = lazy(() => import("./pages/productdetails"));
const Cart = lazy(() => import("./pages/cart"));
const Order = lazy(() => import("./pages/order"));

function App() {
  const { user } = useAuthListner();
  // const container = useRef(null)
  // useEffect(() => {

  //   lottie.loadAnimation({
  //     container: container.current, // the dom element that will contain the animation
  //     renderer: 'svg',
  //     loop: true,
  //     autoplay: true,
  //     path: require('./loading.json') // the path to the animation json
  //   })
  // }
  //   , [])

  //   ref={container} className="container"

  return (
    //here we are passing the user in an object when may items are in value we can take that by destrcturing that
    <userContext.Provider value={{ user }}>
      <GlobalProvider user={{ user }}>
        <Router>
          <Suspense fallback={<img src="./loading.gif" alt="" />}>
            <Switch>
              <IsUserLoggedIn
                user={user}
                loggedInPath={ROUTES.HOME}
                path={ROUTES.LOGIN}
                exact
              >
                <Login></Login>
              </IsUserLoggedIn>
              <Route path={ROUTES.SIGN_UP} component={Signup} />
              <ProtectedRoute user={user} path={ROUTES.HOME} exact>
                <Home />
              </ProtectedRoute>
              <ProtectedDashboard user={user} path={ROUTES.DASHBOARD} exact>
                <Home />
              </ProtectedDashboard>

              <Route path={ROUTES.PRODUCTDETAILS} component={ProductDetails} />
              <Route path={ROUTES.CART} component={Cart} />
              <Route path={ROUTES.ORDERS} component={Order} />
            </Switch>
          </Suspense>
        </Router>
      </GlobalProvider>
    </userContext.Provider>
  );
}

export default App;
