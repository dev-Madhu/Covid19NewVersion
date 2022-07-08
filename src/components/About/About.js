import {Component} from 'react'
import Loader from 'react-loader-spinner'
// import parse from 'html-react-parser'
import Header from '../Header'
import Footer from '../Footer'
import './About.css'

class About extends Component {
  state = {isLoading: true, faqsList: []}

  componentDidMount() {
    this.getFaqData()
  }

  getFaqData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const faqData = fetchedData.faq
    this.setState({isLoading: false, faqsList: faqData})
  }

  renderLoader = () => (
    <div className="loader" testid="aboutRouteLoader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAbout = () => {
    const {isLoading, faqsList} = this.state
    return (
      <>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="about">
            <h1 className="about-text-h1">About</h1>
            <p className="text about--text">Last updated on march 28 2021</p>
            <h1 className="about-text-h2">
              COVID-19 vaccines be ready for distribution
            </h1>
            <ul className="about-ul" testid="faqsUnorderedList">
              {faqsList.map(item => (
                <li key={item.qno}>
                  <h1 className="about--text">{item.question}</h1>
                  <p className="about--ansText">{item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="about-layout">
          <div className="about-mainContent">{this.renderAbout()}</div>
          <Footer className="about-footerContainer" />
        </div>
      </>
    )
  }
}

export default About
