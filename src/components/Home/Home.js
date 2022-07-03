import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'
import './Home.scss'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="layout">
          <div className="mainContent">Home</div>
          <Footer className="footerContainer" />
        </div>
      </>
    )
  }
}

export default Home
