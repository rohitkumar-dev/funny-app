let payload = ""
async function collectUserData() {
    //const response = await fetch('https://ipapi.co/json');
    //const response = await fetch('https://cors-anywhere.herokuapp.com/https://ipapi.co/json/');
    //const data = await response.json();
    const data = ""
    payload = {
        IP: data.ip || null,
        City: data.city || null,
        Region: data.region || null,
        Latitude: data.latitude || null,
        Longitude: data.longitude || null,
        BrowserLanguage: navigator.language || null,
        Platform: navigator.platform || null,
        ScreenResolution: screen.width && screen.height ? `${screen.width}x${screen.height}` : null,
        DeviceMemory: navigator.deviceMemory || null,
        TouchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
        PrefersDarkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
        ConnectionType: (navigator.connection && navigator.connection.effectiveType) || null,
    };
    createTable(payload)
}

function createTable(dataObj) {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.textContent = 'Data';
    const th2 = document.createElement('th');
    th2.textContent = 'Collected';
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    table.appendChild(headerRow);

    for (const key in dataObj) {
        const row = document.createElement('tr');
        const keyCell = document.createElement('td');
        const valueCell = document.createElement('td');
        keyCell.textContent = key;
        valueCell.textContent = dataObj[key];
        row.appendChild(keyCell);
        row.appendChild(valueCell);
        table.appendChild(row);
    }
    document.getElementById('tableContainer').innerHTML = "";
    document.getElementById('tableContainer').append(table);
}

let userName

function register(){
    if (document.getElementById("warning")) {document.getElementById("warning").innerText = "" }
    userName = document.getElementById("username")
    if (userName.value == ""){
        const warning = document.createElement("p")
        warning.innerText = "Name is required..."
        warning.id = "warning"
        warning.style.margin = 0
        warning.style.fontSize = "10px"
        warning.style.textAlign = "center"
        warning.style.color = "red"
        userName.insertAdjacentElement("afterend",warning)
    }else{
        registerUser(userName.value)
    }
}

let userID = "";

async function registerUser(userName) {
  try {
    const response = await fetch("http://localhost:3000/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: userName })
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.user && data.user._id) {
      console.log("Success:", data.user._id);
      userID = data.user._id
      qna(); 
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    console.error("Error:", error.message);
    alert("Network error");
  }
}

btnNo = document.getElementById("btnNo")
function qna(){
    document.getElementById("username").style.display = "none"
    const mainHead = document.getElementById("mainHead")
    mainHead.innerText = "You know you are Earth's unpaid intern—contributing nothing, but still there"
    const subHead = document.getElementById("subHead")
    subHead.innerText = "😂🤣😹🫨😹🤣😂"
    const yesBtn = document.getElementById("btnYes")
    yesBtn.innerText = "Yes"
    btnNo.innerText = "No"

    btnNo.onclick = null;
    btnNo.addEventListener("click", moveButton);
    btnNo.addEventListener("touchstart", moveButton);

    yesBtn.onclick = null
    yesBtn.addEventListener("click", function() {
        console.log("Next button clicked!")
        mainHead.innerText = "Pagal ensaan, 'NO' pr click krna tha! You are hacked now"
        subHead.innerText = "👨‍💻👨‍💻😱🥺😱👨‍💻👨‍💻"
        collectUserData()
        updateData()
        const warning = document.createElement("p")
        warning.innerText = "All your personal details are sent to my creator, kuch sample k lye dek lo..."
        warning.id = "warning"
        warning.style.margin = 0
        warning.style.fontSize = "10px"
        warning.style.textAlign = "center"
        warning.style.color = "red"
        warning.style.padding = "3px"
        if(!document.getElementById("warning")){
            subHead.insertAdjacentElement("afterend",warning)
        }
    })

}

async function updateData(){
    const response = await fetch("http://localhost:3000/api/v1/user/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: userID, data: payload })
    });
}

function moveButton() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const btnWidth = btnNo.offsetWidth;
  const btnHeight = btnNo.offsetHeight;
  const randomX = Math.floor(Math.random() * (viewportWidth - btnWidth));
  const randomY = Math.floor(Math.random() * (viewportHeight - btnHeight));

  btnNo.style.position = "absolute";
  btnNo.style.left = `${randomX}px`;
  btnNo.style.top = `${randomY}px`;
}