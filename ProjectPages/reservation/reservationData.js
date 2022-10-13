//const URL = "http://localhost:8080/api/reservations"
import { API_URL } from "../../setting.js"
import { sanitizeStringWithTableRows } from "../../utils.js"
const URL = API_URL + "reservations"

export function initReservations() {
  document.getElementById("btn-get-all").onclick = getAllReservations
  document.getElementById("tbl-body").onclick = showReservationsDetails
  getAllReservations()
}

export async function getAllReservations() {
  try {
    const reservationsFromServer = await fetch(URL).then(res => res.json())
    showAllData(reservationsFromServer)
  }
  catch (err) {
    console.error("UPPPPPS: " + err) //This can be done better
  }
}

function showAllData(data) {
  const tableRowsArray = data.map(reservation => `
  <tr>                                
    <td>${reservation.id} </td>              
    <td>${reservation.contactName} </td>                     
    <td>${reservation.date} </td>  
    <td>
    <!--See https://getbootstrap.com/docs/5.0/components/modal/ for an explanation of the classes used below -->
    <button id="${reservation.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button> 
   
    <button id="${reservation.id}-column-id" type="button"  class="other-page btn btn-sm btn-secondary">Details-2</button> </td>      
  </tr>`)

  const tableRowsString = tableRowsArray.join("\n")
  document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}

async function showReservationsDetails(evt) {
  const target = evt.target
  if (!target.id.includes("-column-id")) {
    return
  }
  const id = target.id.replace("-column-id", "")
  if (target.classList.contains("other-page")) {
    window.router.navigate("find-user?id=" + id)
  }
  else {
    document.getElementById("exampleModalLabel").innerText = "Details for userId: " + id
    const user = await fetch(URL + id).then(res => res.json())
    document.getElementById("user-content").innerText = JSON.stringify(user, null, 2)
  }
}