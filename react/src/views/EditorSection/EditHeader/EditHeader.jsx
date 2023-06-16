import './EditHeader.scss'
import clsx from 'clsx'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/ContextProvider'

function EditHeader() {

    const sectionName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const { currentSection, setCurrentSection, currentId } = useContext(UserContext)
    console.log(currentSection, currentId)

    return (
        <header id='edit-header'>
            <div className='edit-header-main'>
                {
                    sectionName.map((element, index) => {
                        return (
                            <Link 
                                to={`/edit/section${element}/${currentId}`} 
                                key={index}
                                onClick={() => setCurrentSection(element)}
                            >
                                <div className={clsx(
                                    'edit-header-element',
                                    {
                                        'active': element === currentSection
                                    }
                                )}>{element}</div>
                            </Link>
                        )
                    })
                }
                <div className='line'></div>
            </div>
        </header>
    )
}

export default EditHeader