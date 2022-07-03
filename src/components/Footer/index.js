import styles from './index.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h1 className={styles.footer__logo}>
          COVID19<span className={styles[`footer__logo--country`]}>INDIA</span>
        </h1>
        <p className={styles.footer__text}>
          we stand with everyone fighting on the front lines
        </p>
        <ul className={styles.footer__iconsList}>
          <li>
            <img
              src="https://res.cloudinary.com/ccbp-nxt-wave/image/upload/v1656771327/Vector_yab7fr.png"
              alt="github"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/ccbp-nxt-wave/image/upload/v1656771314/instagram_s7dw2q.png"
              alt="instagram"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/ccbp-nxt-wave/image/upload/v1656771100/path3611_pumhs3.png"
              alt="twitter"
            />
          </li>
        </ul>
      </div>
    </footer>
  )
}
