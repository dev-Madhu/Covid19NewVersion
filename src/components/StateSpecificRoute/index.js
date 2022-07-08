import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import GraphData from '../GraphData'
import ActiveItem from '../ActiveItem'

import './index.css'

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

const CategoryDetails = [
  {
    id: 1,
    categoryName: 'Confirmed',
    imageUrl:
      'https://res.cloudinary.com/amst/image/upload/v1639929248/conf_cof3e9.jpg',
    color: 'red',
  },
  {
    id: 2,
    categoryName: 'Active',
    imageUrl:
      'https://res.cloudinary.com/amst/image/upload/v1639929248/act_kq7nfx.jpg',
    color: 'blue',
  },
  {
    id: 3,
    categoryName: 'Recovered',
    imageUrl:
      'https://res.cloudinary.com/amst/image/upload/v1639929248/uyf_ndpqov.jpg',
    color: 'green',
  },
  {
    id: 4,
    categoryName: 'Deceased',
    imageUrl:
      'https://res.cloudinary.com/amst/image/upload/v1639929248/dese_tgak4e.jpg',
    color: 'gray',
  },
]

class StateSpecificRoute extends Component {
  state = {
    isLoading: true,
    stateCode: '',
    category: CategoryDetails[0].categoryName,
    stateSpecificData: [],
  }

  componentDidMount() {
    this.getStateSpecificDetails()
  }

  getStateSpecificDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const stateName = statesList.find(each => each.state_code === stateCode)
      .state_name
    const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const stateData = fetchedData[stateCode]
    const updatedData = {
      state: stateName,
      date: new Date(stateData.meta.last_updated),
      confirmed: stateData.total.confirmed,
      deceased: stateData.total.deceased,
      recovered: stateData.total.recovered,
      tested: stateData.total.tested,
      active:
        stateData.total.confirmed -
        (stateData.total.deceased + stateData.total.recovered),
    }
    this.setState({
      stateSpecificData: updatedData,
      stateCode,
      isLoading: false,
    })
  }

  onChangeCategoryName = id => {
    const updatedCat = CategoryDetails.find(each => each.id === id).categoryName
    this.setState({category: updatedCat})
  }

  renderStateLoader = () => (
    <div className="loader" testid="stateDetailsLoader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderState = () => {
    const {stateSpecificData, stateCode, category} = this.state
    const {state, tested, date} = stateSpecificData

    return (
      <>
        <div className="state-name-row">
          <h1 className="state-title">{state}</h1>
          <div className="testNo-container">
            <p className="test-title">Tested</p>
            <p className="testNo">{tested}</p>
          </div>
        </div>
        <div>
          <p className="last-date">{`last update on ${date}`}</p>
        </div>
        <ul className="category-list">
          {CategoryDetails.map(each => (
            <ActiveItem
              covidDetails={stateSpecificData}
              catDetails={each}
              key={each.id}
              isActive={each.categoryName === category}
              onChangeCategoryName={this.onChangeCategoryName}
            />
          ))}
        </ul>
        <div className="graphs-data" testid="lineChartsContainer">
          <GraphData stateCode={stateCode} category={category} />
        </div>
      </>
    )
  }

  render() {
    const {isLoading, stateSpecificData} = this.state
    console.log(stateSpecificData)

    return (
      <div className="state-app-container">
        <Header />
        {isLoading ? this.renderStateLoader() : this.renderState()}
        <Footer className="footerContainer" />
      </div>
    )
  }
}
export default StateSpecificRoute
