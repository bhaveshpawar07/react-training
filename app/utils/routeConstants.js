export default {
  repos: {
    route: '/repos',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  albumDetails: {
    route: '/details/:id',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  iTunes: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  }
};
