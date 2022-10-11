export function initChooseBooking(){
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