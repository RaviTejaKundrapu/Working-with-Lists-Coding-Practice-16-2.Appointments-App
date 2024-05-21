// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {Appointments, addAppointmentToFav} = props
  const {id, title, date, isAddedToFav} = Appointments

  const unfilledStarImg =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const filledStarImg =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const toogleStar = () => {
    addAppointmentToFav(id)
  }

  const starToView = isAddedToFav ? filledStarImg : unfilledStarImg

  return (
    <li className="eachAppointmentContainer">
      <div>
        <p className="titleText">{title}</p>
        <p className="dateText">{date}</p>
      </div>
      <button
        type="button"
        onClick={toogleStar}
        className="starBtn"
        data-testid="star"
      >
        <img src={starToView} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
