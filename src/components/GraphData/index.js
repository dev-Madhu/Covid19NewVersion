import {Component} from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

class GraphData extends Component {
  state = {
    allData: [],
    forOtherChart: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getChartData()
  }

  getChartData = async () => {
    const {stateCode} = this.props
    const requestUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(requestUrl, options)
    const fetchedData = await response.json()
    const keyNames = Object.keys(fetchedData[stateCode].dates)
    const dateWiseList = []
    keyNames.forEach(date =>
      dateWiseList.push({
        date,
        confirmed: fetchedData[stateCode].dates[date].total.confirmed,
        deceased: fetchedData[stateCode].dates[date].total.deceased,
        recovered: fetchedData[stateCode].dates[date].total.recovered,
        tested: fetchedData[stateCode].dates[date].total.tested,
        active:
          fetchedData[stateCode].dates[date].total.confirmed -
          (fetchedData[stateCode].dates[date].total.deceased +
            fetchedData[stateCode].dates[date].total.recovered),
      }),
    )

    this.setState({
      allData: dateWiseList,
      forOtherChart: dateWiseList,
      isLoading: false,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="timelinesDataLoader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  barChart = () => {
    const {allData} = this.state
    const {category} = this.props
    const barStroke = category.toLowerCase()

    const toptendata = allData.slice(Math.max(allData.length - 10, 0))

    let colortype = '#9A0E31'

    const renderBarStroke = () => {
      switch (barStroke) {
        case 'confirmed':
          return '#9A0E31'

        case 'active':
          return '#0A4FA0'

        case 'recovered':
          return '#216837'

        case 'deceased':
          return '#474c57'
        default:
          return null
      }
    }
    colortype = renderBarStroke()

    return (
      <div className="chart-wrapper">
        <BarChart width={1000} height={450} data={toptendata} barSize={45}>
          <XAxis
            dataKey="date"
            stroke={`${colortype}`}
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={`${barStroke}`}
            fill={`${colortype}`}
            label={{position: 'top', fill: '#fff'}}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </div>
    )
  }

  graph = (type, color) => {
    const {forOtherChart} = this.state
    return (
      <div>
        <LineChart
          width={1000}
          height={250}
          data={forOtherChart}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="top"
            align="right"
            wrapperStyle={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              fontSize: 20,
            }}
          />
          <Line type="monotone" dataKey={type} stroke={color} />
        </LineChart>
      </div>
    )
  }

  allChartsView = () => (
    <>
      <div className="barcharts-container">{this.barChart()}</div>
      <div testid="lineChartsContainer" className="barcharts-container">
        <h1 className="charts-title"> Daily Spread Trends</h1>
        <div className="charts confirmed-background">
          {this.graph('confirmed', '#FF073A')}
        </div>
        <div className="charts active-background">
          {this.graph('active', '#007BFF')}
        </div>
        <div className="charts recovered-background">
          {this.graph('recovered', '#27A243')}
        </div>
        <div className="charts deceased-background">
          {this.graph('deceased', '#6C757D')}
        </div>
        <div className="charts tested-background">
          {this.graph('tested', '#9673B9')}
        </div>
      </div>
    </>
  )

  render() {
    const {isLoading} = this.state
    const showAllData = isLoading
      ? this.renderLoadingView()
      : this.allChartsView()
    return <div className="charts-container">{showAllData}</div>
  }
}

export default GraphData
