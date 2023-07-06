import Layout from 'Components/Layout';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import SignUpForm from 'Components/Signs/SignUp/index';
import SignInForm from 'Components/Signs/SignIn/index';

const routes = [
  {
    name: 'Sign In',
    path: '/auth/sign-in'
  },
  {
    name: 'Sign Up',
    path: '/auth/sign-up'
  }
];

const AuthRoute = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/sign-in`} component={SignInForm} />
        <Route exact path={`${url}/sign-up`} component={SignUpForm} />
      </Switch>
    </Layout>
  );
};

export default AuthRoute;
