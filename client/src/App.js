import './App.css'
import Workspace from './components/Landing/Workspace';
import Landing from './components/Landing/Landing'
import CreateWorkspace from './components/Landing/CreateWorkspace';

import { createBrowserRouter, RouterProvider } from'react-router-dom';
const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing/>,
    },
    {
        path: '/workspace',
        element: <Workspace />,
        children: [
          {
            path: 'create',
            element: <CreateWorkspace />,
          },
        ],
      },
    // {
    //   path: '/about',
    //   element: <About />,
    // },
])


function App() {
  return (
    <RouterProvider router={router}>
        <div className="App"></div>
    </RouterProvider>
  )
}

export default App
