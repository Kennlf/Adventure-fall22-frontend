export function initTest(){
    document.getElementById("btn-priv-res").onclick = () => { 
        document.getElementById("div-priv-res").style.display = "block"
        document.getElementById("div-corp-res").style.display = "none"
    }

    document.getElementById("btn-corp-res").onclick = () => { 
        document.getElementById("div-priv-res").style.display = "none"
        document.getElementById("div-corp-res").style.display = "block"
    }
}