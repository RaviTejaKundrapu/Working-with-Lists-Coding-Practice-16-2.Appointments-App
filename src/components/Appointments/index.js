// Write your code here
import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    AppointmentsList: [],
    starredAppointmentsList: [],
    isViewingStarredAppointments: false,
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const dateFormatting = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
    const addNewAppointment = {
      id: uuidV4(),
      title: titleInput,
      date: dateFormatting,
      isAddedToFav: false,
    }
    this.setState(prevState => ({
      AppointmentsList: [...prevState.AppointmentsList, addNewAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  addAppointmentToFav = id => {
    this.setState(prevState => ({
      AppointmentsList: prevState.AppointmentsList.map(Appointment => {
        if (Appointment.id === id) {
          return {...Appointment, isAddedToFav: !Appointment.isAddedToFav}
        }
        return Appointment
      }),
    }))
  }

  starredAppointmentsView = () => {
    this.setState(prevState => ({
      starredAppointmentsList: prevState.AppointmentsList.filter(
        filterStarredItems => filterStarredItems.isAddedToFav,
      ),
    }))

    this.setState(prevState => ({
      isViewingStarredAppointments: !prevState.isViewingStarredAppointments,
    }))
  }

  titleTaking = event => {
    this.setState({titleInput: event.target.value})
  }

  dateTaking = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {
      titleInput,
      dateInput,
      AppointmentsList,
      starredAppointmentsList,
      isViewingStarredAppointments,
    } = this.state
    return (
      <div className="appContainer">
        <div className="appointmentsContainer">
          <div className="allInputsContainer">
            <form>
              <h1 className="appName">Add Appointment</h1>
              <div className="titleContainer">
                <label htmlFor="title" className="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  className="titleInput"
                  onChange={this.titleTaking}
                  value={titleInput}
                />
              </div>
              <div className="dateContainer">
                <label htmlFor="date" className="date">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  className="dateInput"
                  onChange={this.dateTaking}
                  value={dateInput}
                />
              </div>
              <button
                className="addBtn"
                type="submit"
                onClick={this.addAppointment}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="app-image"
            />
          </div>
          <hr className="line" />
          <div className="appointmentsHaveContainer">
            <div className="tabDetailsDiv">
              <h1 className="motoName">Appointments</h1>
              {isViewingStarredAppointments ? (
                <button
                  className="starredBtn enableStarredBtn"
                  type="button"
                  onClick={this.starredAppointmentsView}
                >
                  Starred
                </button>
              ) : (
                <button
                  className="starredBtn"
                  type="button"
                  onClick={this.starredAppointmentsView}
                >
                  Starred
                </button>
              )}
            </div>

            {isViewingStarredAppointments ? (
              <ul className="AppointmentsListContainer">
                {starredAppointmentsList.map(eachAppointment => (
                  <AppointmentItem
                    key={eachAppointment.id}
                    Appointments={eachAppointment}
                    addAppointmentToFav={this.addAppointmentToFav}
                  />
                ))}
              </ul>
            ) : (
              <ul className="AppointmentsListContainer">
                {AppointmentsList.map(eachAppointment => (
                  <AppointmentItem
                    key={eachAppointment.id}
                    Appointments={eachAppointment}
                    addAppointmentToFav={this.addAppointmentToFav}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
