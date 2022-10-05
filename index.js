import "https://unpkg.com/navigo"  //Will create the global Navigo object used below


import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"

/* import { initNavigate } from "./pages/navigate/navigate.js"
import { showMatchObject } from "./pages/show-match/match.js" */
/* import { initUsers } from "./pages/users/users.js"
import { initFindUser } from "./pages/findUser/findUser.js" */

window.addEventListener("load", async () => {

  const templateAbout = await loadHtml("./about.html")
  const templateReservation = await loadHtml("./reservation/reservation.html")
  const templateGoCarting = await loadHtml("./activities/goCarting.html")
  const templateMiniGolf = await loadHtml("./activities/miniGolf.html")
  const templatePaintBall = await loadHtml("./activities/paintBall.html")
  const templateSumoWrestling = await loadHtml("./activities/sumoWrestling.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")

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
      "/": () => document.getElementById("content").innerHTML =
        `<h2>Home</h2>
      <p style='margin-top:2em'>
      This is the content of the Home Route
      </p>
     `,
      "/about": () => renderTemplate(templateAbout, "content"),

      "/reservation": () => {
        renderTemplate(templateReservation, "content")
        //initUsers()
      },
      "/goCarting": () => {
        renderTemplate(templateGoCarting, "content")
        //initFindUser(match)
      },

      "/miniGolf": () => {
        renderTemplate(templateMiniGolf, "content")
        //initNavigate()
      },

      "/sumoWrestling": () => {
        renderTemplate(templateSumoWrestling, "content")
        //showMatchObject(match)
      }
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