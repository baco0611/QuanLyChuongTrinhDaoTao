import { createBrowserRouter } from 'react-router-dom'
import EditorLayout from './components/EditorLayout/EditorLayout'
import WebDefaultLayout from './components/WebDefaultLayout/WebDefaultLayout'
import ListSection from './views/ListSection/ListSection'
import Error from './components/Error/Error'
import SectionA from './views/EditorSection/SectionA/SectionA'

const router = createBrowserRouter([
    {
        path: '/',
        element: <WebDefaultLayout/>,
        children: [
            {
                path: '/list',
                element: <ListSection/>
            },
            {
                path: '/edit',
                element: <EditorLayout/>,
                children: [
                    {
                        path: '/edit/sectionA/:id',
                        element: <SectionA/>
                    },
                    {
                        path: '/edit/sectionB/:id',
                        element: ''
                    },
                    {
                        path: '/edit/sectionC/:id',
                        element: ''
                    },
                    {
                        path: '/edit/sectionD/:id',
                        element: ''
                    },
                    {
                        path: '/edit/sectionE/:id',
                        element: ''
                    },
                    {
                        path: '/edit/sectionF/:id',
                        element: ''
                    },
                    {
                        path: '/edit/sectionG/:id',
                        element: ''
                    },
                    {
                        path: '/edit/sectionH/:id',
                        element: ''
                    },
                ]
            }
        ]
    },
    {
        path: '/error',
        element: <Error/>
    },
    {
        path: '*',
        element: <Error/>
    }
])

export default router