import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import Form from '@containers/Form';
import ITunes from '@containers/ITunes/Loadable';
export const routeConfig = {
  iTunes: {
    component: ITunes,
    ...routeConstants.iTunes
  },
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  form: {
    component: Form,
    ...routeConstants.form
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
