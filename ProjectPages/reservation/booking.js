import { API_URL } from "../../setting.js"
const URL = API_URL + "reservation"

export function initMakeReservation(){
    document.getElementById("btn-submit-res").onclick = createNewReservation

    function createNewReservation(){
    const newReservation = { }
        newReservation.customer = document.getElementById("fname").value
        newReservation.date = document.getElementById("date").value
      /*   newReservation.email = document.getElementById("email").value
        newReservation.phoneNumber = document.getElementById("phone").value */
        newReservation.NumberOfParticipants = document.getElementById("participants").value
        newReservation.gameName = document.getElementById("activity1").value

    const option = {}
        option.method = 'POST'
        option.headers = {'Accept': 'application/json', 'Content-type': 'application/json'}
        option.body = JSON.stringify(newReservation)
    
    fetch(URL, option)
    .then(r => r.json())

    }
}

export function initChooseBooking() {

    document.getElementById("btn-priv-res").onclick = () => { 
        document.getElementById("div-priv-res").style.display = "block"
        document.getElementById("div-corp-res").style.display = "none"
    }

    document.getElementById("btn-corp-res").onclick = () => { 
        document.getElementById("div-priv-res").style.display = "none"
        document.getElementById("div-corp-res").style.display = "block"
    }
}

export function initShowInfo(){

    document.getElementById("participants").onfocus = () => {
        document.getElementById("info").style.display = "block"
    }
    
    document.getElementById("participants").onblur = () => {
        document.getElementById("info").style.display = "none"
    }

    document.getElementById("participants1").onfocus = () => {
        document.getElementById("info1").style.display = "block"
    }
    
    document.getElementById("participants1").onblur = () => {
        document.getElementById("info1").style.display = "none"
    }

}