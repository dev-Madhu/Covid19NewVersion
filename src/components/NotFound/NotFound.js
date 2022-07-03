// import './NotFound.css'

// const NotFound = ()=> {

//   return (
//     <div className="notFound">
//       <img
//         src="https://res.cloudinary.com/ccbp-nxt-wave/image/upload/v1656767339/Group_7484_r1fczn.svg"
//         alt="not found"
//       />
//       <h1>PAGE NOT FOUND</h1>
//       <p>
//         we’re sorry, the page you requested could not be found.
//         <br />
//         Please go back to the homepage
//       </p>
//       <Link to="/" className="home"
//       <button type="button" className="btn" onClick={navigateToHome}>
//         Home
//       </button>
//     </div>
//   )
// }

// export default NotFound

import {Link} from 'react-router-dom'
import './NotFound.css'

const NotFound = () => (
  <div className="not-found-main-container">
    <div className="not-found-data">
      <img
        src="https://res.cloudinary.com/amst/image/upload/v1639762911/notfnd_e79uve.jpg"
        alt="not-found-pic"
        className="not-found-image"
      />

      <h1 className="not-found-title">PAGE NOT FOUND</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
      </p>

      <div className="button-container">
        <Link to="/">
          <button type="button" className="home-button">
            Home
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default NotFound
