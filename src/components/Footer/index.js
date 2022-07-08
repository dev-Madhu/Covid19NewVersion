import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h1 className="footer__logo">
          COVID19<span className="footer__logo--country">INDIA</span>
        </h1>
        <p className="footer__text">
          we stand with everyone fighting on the front lines
        </p>
        <ul className="footer__iconsList">
          <li>
            <VscGithubAlt color="#cbd5e1" size="50" />
          </li>
          <li>
            <FiInstagram color="#cbd5e1" size="50" />
          </li>
          <li>
            <FaTwitter color="#cbd5e1" size="50" />
          </li>
        </ul>
      </div>
    </footer>
  )
}
