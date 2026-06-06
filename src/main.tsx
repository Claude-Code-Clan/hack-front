import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AccountContainer from './pages/account/AccountContainer/AccountContainer.tsx';
import MainContainer from './pages/account/MainContainer/MainContainer.tsx';
import {Navigate} from 'react-router';
import AccountPage from './pages/account/AccountPage/AccountPage.tsx';
import MainPage from './pages/account/MainPage/MainPage.tsx';
import DetailsPage from './pages/account/DetailsPage/DetailsPage.tsx';
import LoginPage from './pages/login/LoginPage.tsx';
import {ConfigProvider, theme} from 'antd';
import {observer} from 'mobx-react';
import ConfigStore from './store/configStore.ts';
import {useEffect} from 'react';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export const router = createBrowserRouter([
  {
    element: <AccountContainer/>,
    path: 'account',
    children: [
      {
        element: <MainContainer/>,
        path: '',
        children: [
          {
            path: '',
            element: <MainPage/>,
          },
          {
            path: 'details',
            element: <DetailsPage/>,
          },
        ],
      },
      {
        element: <AccountPage/>,
        path: 'settings',
      },
    ],
  },
  {
    element: <LoginPage/>,
    path: 'login',
  },
  {
    element: <Navigate to={'/login'}/>,
    path: '*',
  },
]);

const App = observer(() => {
    useEffect(() => {
      ConfigStore.loadTheme();
    }, []);

    return (
      <main className='main'>
        <ConfigProvider
          theme={{algorithm: ConfigStore.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
          <RouterProvider router={router}/>
        </ConfigProvider>
      </main>
    );
  },
);

ReactDOM.createRoot(document.getElementById('root')!).render(<App/>);
