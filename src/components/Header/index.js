import {Link} from 'react-router-dom'
import styles from './index.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__navigation}>
        <div className={styles.header__logo}>
          <Link to="/" className={styles.header__heading}>
            <h1>
              COVID19
              <span className={styles[`header__logo--country`]}>INDIA</span>
            </h1>
          </Link>
        </div>
        <ul className={styles.header__menu}>
          <li>
            <Link to="/" className={styles.header__item}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.header__item}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
