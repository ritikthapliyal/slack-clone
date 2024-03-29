import './App.css'
import Workspace from './components/Landing/Workspace'
import Landing from './components/Landing/Landing'
import CreateWorkspace from './components/Landing/CreateWorkspace'
import Dashboard from './components/Dashboard/Dashboard'
import { UserDataProvider } from './context/UserDataContext'
import WorkSpaceConfirmation from './components/Common/WorkSpaceConfirmation'

import { createBrowserRouter, RouterProvider } from'react-router-dom'
const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing/>,
    },
    {
        path: '/workspace',
        element: <UserDataProvider>
                    <Workspace/>
                 </UserDataProvider>,
        children: [
          {
            path: 'create',
            element: <CreateWorkspace/>,
          },
          {
            path: 'confirm',
            element: <WorkSpaceConfirmation/>,
          },
        ],
      },
    {
      path: '/dashboard',
      element: <Dashboard/>,
    },
])


function App() {
  return (
    <RouterProvider router={router}>
        <div className="App"></div>
    </RouterProvider>
  )
}

export default App
