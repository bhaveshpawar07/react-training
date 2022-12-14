import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useLocation: jest.fn().mockReturnValue({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpbdafa'
    }),
    useHistory: jest.fn().mockReturnValue({
      length: 2,
      action: 'POP',
      push: jest.fn(),
      location: {
        pathname: '/',
        search: '',
        hash: ''
      }
    }),
    useParams: jest.fn().mockReturnValue({
      id: '7'
    })
  };
});
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => {
    return {
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  })
});
