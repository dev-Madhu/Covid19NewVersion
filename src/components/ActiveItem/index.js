import './index.css'

const ActiveItem = props => {
  const {covidDetails, catDetails, onChangeCategoryName, isActive} = props
  const {id, categoryName, imageUrl, color} = catDetails
  const converted = categoryName.toLowerCase()
  const count = covidDetails[converted]
  const changeTheCategory = () => {
    onChangeCategoryName(id)
  }

  const bgBlock = isActive ? `active-block${id}` : null
  return (
    <div className="category-box">
      <li
        className={`category-block ${bgBlock} ${color}`}
        onClick={changeTheCategory}
      >
        <div
          testid={`stateSpecific${categoryName}CasesContainer`}
          className="stats-block"
        >
          <p className="stats-title">{categoryName}</p>
          <img
            src={imageUrl}
            className="stats-icon"
            alt={`state specific ${converted} cases pic`}
          />
          <p className="stats-number">{count}</p>
        </div>
      </li>
    </div>
  )
}

export default ActiveItem
