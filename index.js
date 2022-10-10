import "https://unpkg.com/navigo"  //Will create the global Navigo object used below


import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"

/* import { initNavigate } from "./pages/navigate/navigate.js"
import { showMatchObject } from "./pages/show-match/match.js" */
import { initReservations } from "./projectPages/reservation/reservationData.js"
import { initFindReservation } from "./ProjectPages/reservation/findReservation.js"

window.addEventListener("load", async () => {

  const templatehome = await loadHtml("./projectPages/home.html")
  const templateAbout = await loadHtml("./projectPages/about/about.html")
  const templateReservation = await loadHtml("./projectPages/reservation/reservationData.html")
  const templateBooking = await loadHtml("./projectPages/reservation/booking.html")
  const templateActivities = await loadHtml("./projectPages/activities/activityOverview.html")
 /*  const templatePaintBall = await loadHtml("./projectPages/activities/paintBall.html")
  const templateMiniGolf = await loadHtml("./projectPages/activities/miniGolf.html")
  const templateGoCarting = await loadHtml("./projectPages/activities/goCarting.html")
  const templateSumo = await loadHtml("./projectPages/activities/sumoWrestling.html")
  const templateNavigate = await loadHtml("./pages/navigate/navigate.html")
  const templateMatch = await loadHtml("./pages/show-match/match.html") */
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
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => renderTemplate(templatehome, "content"),

      "/about": () => renderTemplate(templateAbout, "content"),

      "/reservations": () => {
        renderTemplate(templateReservation, "content")
        initReservations()
      },
      "/booking": () => {
        renderTemplate(templateBooking, "content")
      },
      "/activities": () => {
        renderTemplate(templateActivities, "content")
      },
      /* "/paintBall": () => {
        renderTemplate(templatePaintBall, "content")
      },
      "/miniGolf": () => {
        renderTemplate(templateMiniGolf, "content")
      },
      "/goCarting": () => {
        renderTemplate(templateGoCarting, "content")
      },
      "/sumoWrestling": () => {
        renderTemplate(templateSumo, "content")
      }, */
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