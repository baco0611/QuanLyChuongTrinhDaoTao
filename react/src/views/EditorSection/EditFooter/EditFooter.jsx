import { Link } from 'react-router-dom'
import './EditFooter.scss'

function EditFooter() {
    return (
        <footer id='edit-footer'>
            <div className='edit-footer wrapper'>
                <div>
                    <Link to={'/list'}>
                        <button>
                            <i className='ti-back-left'></i>
                            <span>Danh sách chính</span>
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to={'/list'}>
                        <button>
                            <i className='ti-arrow-circle-left'></i>
                            <span>Lùi lại</span>
                        </button>
                    </Link>
                    <Link to={'/list'}>
                        <button>
                            <span>Tiếp theo</span>
                            <i className='ti-arrow-circle-right'></i>
                        </button>
                    </Link>
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