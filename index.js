import "https://unpkg.com/navigo"  //Will create the global Navigo object used below


import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"

import { initReservations } from "./ProjectPages/reservation/reservationData.js"
import { initFindReservation } from "./ProjectPages/reservation/findReservation.js"
import { initChooseBooking, initShowInfo, initMakeReservation} from "./ProjectPages/reservation/booking.js"

window.addEventListener("load", async () => {

  const templatehome = await loadHtml("./ProjectPages/home.html")
  const templateAbout = await loadHtml("./ProjectPages/about/about.html")
  const templateReservation = await loadHtml("./ProjectPages/reservation/reservationData.html")
  const templateBooking = await loadHtml("./ProjectPages/reservation/booking.html")
  const templateActivities = await loadHtml("./ProjectPages/activities/activityOverview.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")
  const templateFindReservation = await loadHtml("./ProjectPages/reservation/findReservation.html")

  adjustForMissingHash()

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
  
      "/": () => renderTemplate(templatehome, "content"),

      "/about": () => renderTemplate(templateAbout, "content"),

      "/reservations": () => {
        renderTemplate(templateReservation, "content")
        initReservations()
      },
      "/booking": () => {
        renderTemplate(templateBooking, "content")
        initChooseBooking()
        initShowInfo()
        initMakeReservation()
      
      },
      "/activities": () => {
        renderTemplate(templateActivities, "content")
      },
      "/find-reservation": (match) => {
        renderTemplate(templateFindReservation, "content")
        initFindReservation(match)
      },
   
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content")
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}