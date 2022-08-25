import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import ITunes from '@app/containers/ITunesProvider/ITunes/Loadable';
import AlbumDetails from '@app/containers/ITunesProvider/AlbumDetails/Loadable';
export const routeConfig = {
  iTunes: {
    component: ITunes,
    ...routeConstants.iTunes
  },
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  albumDetails: {
    component: AlbumDetails,
    ...routeConstants.albumDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
