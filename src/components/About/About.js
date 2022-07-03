import {useQuery} from 'react-query'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import parse from 'html-react-parser'
import styles from './About.module.scss'

const About = () => {
  const {isLoading, data} = useQuery('faq', () =>
    axios.get('https://apis.ccbp.in/covid19-faqs'),
  )

  const renderLoader = () => (
    <div className={styles.loader} data-testid="loader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  return (
    <>
      {isLoading ? (
        renderLoader()
      ) : (
        <div className={styles.about}>
          <h1>About</h1>
          <p className={`${styles[`about--text`]} ${styles.text}`}>
            Last updated on march 28 2021
          </p>
          <h2>COVID-19 vaccines be ready for distribution</h2>
          <ul>
            {data?.data.faq.map(item => (
              <li key={item.id}>
                <h3 className={styles[`about--text`]}>
                  {parse(item.question)}
                </h3>
                <p className={styles[`about--ansText`]}>{parse(item.answer)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default About
