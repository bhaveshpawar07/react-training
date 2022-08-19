import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
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
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
