const URL = "http://localhost:8080/api/reservations/"

export async function initFindReservation(match) {
  document.getElementById("btn-fetch-reservation").onclick = fetchReservationData
  if (match?.params?.id) {
    const id = match.params.id
    try {
      renderReservation(id)
    } catch (err) {
      document.getElementById("error").innerText = "Could not find reservation: " + id
    }
  }
}

async function fetchReservationData() {
  document.getElementById("error").innerText = ""
  const id = document.getElementById("reservation-id-input").value
  if (!id) {
    document.getElementById("error").innerText = "Please provide an id"
    return
  }
  try {
    renderReservation(id)
  } catch (err) {
    console.log("UPS " + err.message)
  }
}

async function renderReservation(id) {
  try {
    const reservation = await fetch(URL + id).then(res => res.json())
    //jsonplaceholder returns an empty object for users not found, NOT an error
    if (Object.keys(reservation).length === 0) {  //checks for an empty object = {}
        /* document.getElementById("id").innerText = "";
        document.getElementById("contactName").innerText = "";
        document.getElementById("date").innerText = "" ;*/
      throw new Error("No reservation found for id:" + id)
    }

    document.getElementById("id").innerText = reservation.id;
    document.getElementById("contactName").innerText = reservation.contactName
    document.getElementById("date").innerText = reservation.date;

  } catch (err) {
    document.getElementById("error").innerText = err
  }
}