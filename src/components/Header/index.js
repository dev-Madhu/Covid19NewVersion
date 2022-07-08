import {Link} from 'react-router-dom'
import './index.css'

export default function Header() {
  return (
    <header className="header">
      <nav className="header__navigation">
        <div className="header__logo">
          <Link to="/" className="header__heading">
            <h1>
              COVID19
              <span className="header__logo--country">INDIA</span>
            </h1>
          </Link>
        </div>
        <ul className="header__menu">
          <li>
            <Link to="/" className="header__item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="header__item">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
