var curr_telemetry;

function get_telemetry() {
    let request = new XMLHttpRequest();
    request.open('GET', '/get', false);
    request.send();
    if (request.status === 200) {
        return JSON.parse(request.responseText)["drones"];
    } else {
        return null;
    }
}

function update() {
    let data = get_telemetry();
    let list = document.getElementById("drones-list");
    if (data !== null) {
        curr_telemetry = data;
        while (list.childElementCount / 2 > data.length) {
            removeLabel((list.childElementCount / 2 - 1).toString());
        }

        while (list.childElementCount / 2 < data.length) {
            addLabel((list.childElementCount / 2).toString());
        }

        for (let i = 0; i < data.length; i++) {
            render_drone(data[i], (i).toString());
        }
    }
}

function render_drone(el, id) {
    if (el.status === "landed") {
        document.getElementById(id + "img").src = "/static/svg/drone.svg";
    } else {
        document.getElementById(id + "img").src = "/static/svg/flying-drone.svg";
    }
}

async function updateCycle() {
    setTimeout(function () {
        update();
        updateCycle();
    }, 2000);
}

function addLabel(id) {
    document.getElementById("drones-list").innerHTML += "<div id='" + id + "' class='drone-el'><img id='" + id + "img' class='drone-img' alt='' src=''/></div><hr id='" + id + "hr' />"
}

function removeLabel(id) {
    let element = document.getElementById(id);
    element.parentNode.removeChild(element);
    let element2 = document.getElementById(id + "hr");
    element2.parentNode.removeChild(element2);
}

update();
updateCycle();