import { Link, useParams } from 'react-router-dom'
import './EditFooter.scss'
import { useContext } from 'react'
import { UserContext } from '../../../context/ContextProvider'
import { handleUpdateDatabase } from '../Database/HandleAction'

function EditFooter({currentSection}) {

    const { sectionList, apiURL } = useContext(UserContext)
    const { id } = useParams()

    return (
        <footer id='edit-footer'>
            <div className='edit-footer wrapper'>
                <div>
                    <Link to={'/list'}>
                        <button
                            onClick={() => setCurrentSection(0)}
                        >
                            <i className='ti-back-left'></i>
                            <span>Danh sách chính</span>
                        </button>
                    </Link>
                </div>
                <div>
                    {
                        currentSection != 0 &&
                        <Link to={`/edit/section${sectionList[currentSection-1]}/${id}`}>
                            <button
                                onClick={() => handleUpdateDatabase({ currentSection: sectionList[currentSection], currentId: id, api: apiURL })}
                            >
                                <i className='ti-arrow-circle-left'></i>
                                <span>Lùi lại</span>
                            </button>
                        </Link>
                    }
                    {
                        currentSection < sectionList.length - 1 &&
                        <Link to={`/edit/section${sectionList[currentSection+1]}/${id}`}>
                            <button
                                onClick={() => handleUpdateDatabase({ currentSection: sectionList[currentSection], currentId: id, api: apiURL })}
                            >
                                <span>Tiếp theo</span>
                                <i className='ti-arrow-circle-right'></i>
                            </button>
                        </Link>
                    }
                    <Link to={'/list'}>
                        <button>
                            <i className='ti-eye'></i>
                            <span>Xem lại</span>
                        </button>
                    </Link>
                    <Link to={'/list'}>
                        <button>
                            <i className='ti-check'></i>
                            <span>Hoàn tất</span>
                        </button>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default EditFooter