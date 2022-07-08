import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import './Home.css'
import TableItem from '../TableItem'
import SearchItems from '../SearchItems'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    isLoading: true,
    totalActive: 0,
    totalConfirmed: 0,
    totalDeceased: 0,
    totalRecovered: 0,
    covidList: [],
    searchInput: '',
    filteredList: [],
  }

  componentDidMount() {
    this.getCountryWiseCovidDetails()
  }

  getCountryWiseCovidDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)

    let confirmed = 0
    let deceased = 0
    let recovered = 0
    let active = 0
    const resultList = []

    statesList.forEach(state => {
      if (data[state.state_code]) {
        const {total, meta} = data[state.state_code]
        confirmed += total.confirmed ? total.confirmed : 0
        deceased += total.deceased ? total.deceased : 0
        recovered += total.recovered ? total.recovered : 0

        resultList.push({
          stateCode: state.state_code,
          stateName: state.state_name,
          confirmed: total.confirmed,
          deceased: total.deceased,
          recovered: total.recovered,
          population: meta.population,
          active: total.confirmed - (total.deceased + total.recovered),
        })
      }
    })
    console.log(resultList)
    active = confirmed - (recovered + deceased)

    this.setState({
      totalConfirmed: confirmed,
      totalDeceased: deceased,
      totalRecovered: recovered,
      totalActive: active,
      isLoading: false,
      covidList: resultList,
    })
  }

  renderCountryStatistics = () => {
    const {
      totalConfirmed,
      totalActive,
      totalRecovered,
      totalDeceased,
    } = this.state

    return (
      <div className="country-stats">
        <div testid="countryWideConfirmedCases" className="stats-block-column">
          <p className="stats-title red">Confirmed</p>
          <img
            src="https://res.cloudinary.com/amst/image/upload/v1639929248/conf_cof3e9.jpg"
            className="stats-icon"
            alt="country wide confirmed cases pic"
          />
          <p className="stats-number red">{totalConfirmed}</p>
        </div>

        <div testid="countryWideActiveCases" className="stats-block-column">
          <p className="stats-title blue">Active</p>
          <img
            src="https://res.cloudinary.com/amst/image/upload/v1639929248/act_kq7nfx.jpg"
            className="stats-icon"
            alt="country wide active cases pic"
          />
          <p className="stats-number blue">{totalActive}</p>
        </div>

        <div testid="countryWideRecoveredCases" className="stats-block-column">
          <p className="stats-title green">Recovered</p>
          <img
            src="https://res.cloudinary.com/amst/image/upload/v1639929248/uyf_ndpqov.jpg"
            className="stats-icon"
            alt="country wide recovered cases pic"
          />
          <p className="stats-number green">{totalRecovered}</p>
        </div>

        <div testid="countryWideDeceasedCases" className="stats-block-column ">
          <p className="stats-title gray">Deceased</p>
          <img
            src="https://res.cloudinary.com/amst/image/upload/v1639929248/dese_tgak4e.jpg"
            className="stats-icon"
            alt="country wide deceased cases pic"
          />
          <p className="stats-number gray">{totalDeceased}</p>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader" testid="homeRouteLoader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  whenAscendingSortButtonClicked = () => {
    const {covidList} = this.state
    const sortedList = covidList.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({covidList: sortedList})
  }

  whenDescendingSortButtonClicked = () => {
    const {covidList} = this.state
    const sortedList = covidList.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({covidList: sortedList})
  }

  renderCovidTable = () => {
    const {covidList} = this.state
    return (
      <div className="all-states-table" testid="stateWiseCovidDataTable">
        <div className="table-header">
          <div className="state-name-heading">
            <p className="table-header-title ">States/UT</p>
            <button
              className="order"
              type="button"
              testid="ascendingSort"
              onClick={this.whenAscendingSortButtonClicked}
            >
              <FcGenericSortingAsc color="#94A3B8" />
            </button>
            <button
              className="order"
              type="button"
              testid="descendingSort"
              onClick={this.whenDescendingSortButtonClicked}
            >
              <FcGenericSortingDesc color="#94A3B8" />
            </button>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Confirmed</p>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Active</p>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Recovered</p>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Deceased</p>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Population</p>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Others</p>
          </div>
        </div>
        <div className="state-wise-data-container">
          <ul className="table-data">
            {covidList.map(eachItem => (
              <TableItem covidDetails={eachItem} key={eachItem.stateCode} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  searchStarted = event => {
    const searchItem = event.target.value
    const searchedResults = statesList.filter(data =>
      data.state_name.toLowerCase().includes(searchItem.toLowerCase()),
    )

    this.setState({
      searchInput: searchItem,
      filteredList: searchedResults,
    })
  }

  showSearchList = () => {
    const {filteredList} = this.state

    return (
      <ul
        className="search-result-container"
        testid="searchResultsUnorderedList"
      >
        {filteredList.map(each => (
          <SearchItems
            key={each.state_code}
            stateName={each.state_name}
            stateCode={each.state_code}
            id={each.state_code}
          />
        ))}
      </ul>
    )
  }

  removeFilteredList = () => {
    this.setState({filteredList: []})
  }

  render() {
    const {isLoading, filteredList, searchInput} = this.state
    const showSearchList =
      filteredList.length === 0 ? null : this.showSearchList()
    return (
      <>
        <Header />
        <div className="layout">
          <div className="home-container">
            <div className="home-content-container">
              <div className="search-container">
                <BsSearch testid="searchIcon" className="search-icon" />
                <input
                  type="search"
                  placeholder="Enter the State"
                  className="search-bar"
                  onChange={this.searchStarted}
                  onAbort={this.removeFilteredList}
                />
              </div>
              {searchInput.length > 0 ? showSearchList : ''}
              {isLoading ? (
                this.renderLoader()
              ) : (
                <div className="app-container">
                  <div className="country-stats">
                    {this.renderCountryStatistics()}
                  </div>
                  <div className="state-table">{this.renderCovidTable()}</div>
                </div>
              )}
              <Footer className="footerContainer" />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
