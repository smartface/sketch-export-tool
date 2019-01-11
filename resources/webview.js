import pluginCall from 'sketch-module-web-view/client'

// Disable the context menu to have a more native feel
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

document.getElementById('sf_type_list').addEventListener('change', function() {
    var e = document.getElementById("sf_type_list");
    var value = e.options[e.selectedIndex].value;
    setBackTheUI();
    pluginCall('set-type', value)
})

document.getElementById('layerName').addEventListener('dblclick', function() {
    document.getElementById('setName').style.visibility = "visible";
    document.getElementById('layerName').style.visibility = "hidden";
    document.getElementById('setName').value = document.getElementById('layerName').innerHTML;
});

document.getElementById('setName').addEventListener("keydown", function(e) {
    if (e.keyCode == 13) { // Enter pressed 
        setBackTheUI();
        var value = document.getElementById('setName').value;
        pluginCall('set-name', value);
    }
});

document.getElementById('className').addEventListener('dblclick', function() {
    document.getElementById('setClass').style.visibility = "visible";
    document.getElementById('className').style.visibility = "hidden";
    let oldClassName = document.getElementById('className').innerHTML;
    if (oldClassName != "Type Class Name")
        document.getElementById('setClass').value = oldClassName;
    else
        document.getElementById('setClass').value = '';
});

document.getElementById('setClass').addEventListener("keydown", function(e) {
    if (e.keyCode == 13) { // Enter pressed 
        setBackTheUI();
        var value = document.getElementById('setClass').value;
        pluginCall('set-class', value);
    }
});


document.getElementById('checkBox').addEventListener('click', function() {
    setBackTheUI();
    if (document.getElementById("checkBox").checked == true) {
        pluginCall('set-library', true)
    } else {
        pluginCall('set-library', false)
    }
});


document.getElementById('exportbtn').addEventListener("click", function() {
    setBackTheUI();
    pluginCall('exportbtn', "export");
});

document.getElementById('topBtn').addEventListener("click", function() {
    setBackTheUI();
    pluginCall('set-resize', "top");
});

document.getElementById('rightBtn').addEventListener("click", function() {
    setBackTheUI();
    pluginCall('set-resize', "right");
});

document.getElementById('bottomBtn').addEventListener("click", function() {
    setBackTheUI();
    pluginCall('set-resize', "bottom");
});
document.getElementById('leftBtn').addEventListener("click", function() {
    setBackTheUI();
    pluginCall('set-resize', "left");
});


// called from the plugin
window.setShow = function(data) {

    var name = data.name;
    var type = data.type;
    //var nameCheck = data.nameCheck;
    var className = data.className;
    var library = data.library;


    if (data.changed == "true")
        setBackTheUI();

    resizeBoxSet(data);

    if (type === "shape" || type === "page") {
        exportButtonVisibility("visible");
    } else {
        exportButtonVisibility("hidden");
    }

    if (library != null && library != "null" && library != "false") {
        exportButtonVisibility("visible");
        document.getElementById('checkBox').checked = true;
    } else
        document.getElementById('checkBox').checked = false;

    /*
    if (nameCheck != null) {
        if (nameCheck == "1")
            document.getElementById('name_rectangle').className = "sk-asset name_rectangle success";
        if (nameCheck == "2")
            document.getElementById('name_rectangle').className = "sk-asset name_rectangle error";
        if (nameCheck == "3")
            document.getElementById('name_rectangle').className = "sk-asset name_rectangle warning";
    }
    */
    if (name == null)
        name = " "
    document.getElementById('layerName').innerHTML = name;
    classNameShow(className);
    if (type == "null" || type == null) {
        //document.getElementById('sf_rectangle').className = "sk-asset sf_rectangle warning";
        let item = document.getElementById("sf_type_list");
        item.selectedIndex = 0; // 0 index => NAN
        exportButtonVisibility("hidden");

    } else {
        //document.getElementById('sf_rectangle').className = "sk-asset sf_rectangle success";
        let item = document.getElementById("sf_type_list");
        for (let i = 0; i < item.options.length; i++) {
            if (item.options[i].value == type) {
                item.selectedIndex = i;
                break;
            }
        }
    }
}


function resizeBoxSet(data) {
    let allresize = data.allresize;
    let warn = data.resizeWarn;
    /*
    if (warn == 'true') {
        document.getElementById('layoutImage').className = "classFrame layoutImage warn";
        document.getElementById("test").innerHTML = "BURADA";
    } else {
        //document.getElementById('layoutImage').className = "classFrame layoutImage";
        document.getElementById("test").innerHTML = warn;
        document.getElementById('layoutImage').className = "classFrame layoutImage warn";
    }
    */
    coloredResizeButtons(allresize);

}

function exportButtonVisibility(visibility) {

    if (visibility == "visible") {
        document.getElementById("exportbtn").style.visibility = "visible";
        document.getElementById("exportbtnDisable").style.visibility = "hidden";
    } else {
        document.getElementById("exportbtn").style.visibility = "hidden";
        document.getElementById("exportbtnDisable").style.visibility = "visible";
    }
}

function setBackTheUI() {

    document.getElementById('setName').style.visibility = "hidden";
    document.getElementById('layerName').style.visibility = "visible";

    document.getElementById('setClass').style.visibility = "hidden";
    document.getElementById('className').style.visibility = "visible";

}

function coloredResizeButtons(allresize) {

    document.getElementById("top").style.background = "#D1D1D1";
    document.getElementById("bottom").style.background = "#D1D1D1";
    document.getElementById("left").style.background = "#D1D1D1";
    document.getElementById("right").style.background = "#D1D1D1";
    if (allresize != null) {
        Object.keys(allresize).forEach(key => {
            if (allresize[key])
                document.getElementById(key).style.background = "#00A1F1";
        });
    }
}

function classNameShow(className) {
    if (className == "null" || className == null) {
        document.getElementById('className').innerHTML = 'Type Class Name';
    } else
        document.getElementById('className').innerHTML = className;
}