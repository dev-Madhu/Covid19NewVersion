import {useNavigate} from 'react-router-dom'
import styles from './NotFound.module.scss'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.notFound}>
      <img
        src="https://res.cloudinary.com/ccbp-nxt-wave/image/upload/v1656767339/Group_7484_r1fczn.svg"
        alt="not found"
      />
      <h3>PAGE NOT FOUND</h3>
      <p>
        we’re sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage
      </p>
      <button
        type="button"
        className={styles.btn}
        onClick={() => navigate('/')}
      >
        Home
      </button>
    </div>
  )
}

export default NotFound
