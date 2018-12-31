import BrowserWindow from 'sketch-module-web-view'

const mapper = require('./main/sketchToSmartface');
const UI = require('sketch/ui')
const sketch = require('sketch');
var documents = require('sketch/dom').getDocuments();


//var nameCheck = require('./isValidName');

var context_;
export default function(context) {
    context_ = context;
    const options = {
        identifier: 'smartface',
        alwaysOnTop: true,
        height: 505,
        width: 300,
        onlyShowCloseButton: true,
    }
    var notify;
    var browserWindow = new BrowserWindow(options)
    const webContents = browserWindow.webContents


    // add a handler for a call from web content's javascript
    webContents.on('set-type', (data) => {

        var selectedLayer = context.document.selectedLayers().firstLayer();
        var name = selectedLayer.name();

        var sf_type = String(data);

        if (isValidName(name, sf_type)) {
            log("❌Component name is invalid❌")
            UI.message("❌ Component name is invalid ❌")
        }
        context.command.setValue_forKey_onLayer_forPluginIdentifier(sf_type, "sf-tag", selectedLayer, 'smartface.io');
        if (sf_type == "listviewitem" || sf_type == "gridviewitem")
            context.command.setValue_forKey_onLayer_forPluginIdentifier("true", "sf-library", selectedLayer, 'smartface.io');
        setLibraryItem(selectedLayer, sf_type);
        if (getResize(selectedLayer) == null)
            creteResize(selectedLayer);
        context.document.saveDocument(nil);
    });

    webContents.on('set-class', (data) => {
        var selectedLayer = context.document.selectedLayers().firstLayer();
        var sfClass = String(data);
        if (sfClass != null) {
            context.command.setValue_forKey_onLayer_forPluginIdentifier(sfClass, "sf-class", selectedLayer, 'smartface.io');
            addClassNames(allClassNames, sfClass)
            context.document.saveDocument(nil);
            UI.message("Class Perfect Set ✅")
        } else
            UI.message("❌ Something Wrong Class Not Assigned")
    });

    webContents.on('exportbtn', (data) => {
        var selectedLayer = context.document.selectedLayers().firstLayer();
        let type = context.command.valueForKey_onLayer_forPluginIdentifier("sf-tag", selectedLayer, 'smartface.io');
        mapper.exportButton(context, selectedLayer.objectID(), type);

    });

    webContents.on('set-library', (data) => {
        var selectedLayer = context.document.selectedLayers().firstLayer();
        var sfLib = String(data);
        if (sfLib != null && selectedLayer != null) {
            context.command.setValue_forKey_onLayer_forPluginIdentifier(sfLib, "sf-library", selectedLayer, 'smartface.io');
            context.document.saveDocument(nil);
            if (sfLib == "false")
                UI.message("Library Disabled ✅")
            else
                UI.message("Library Perfect Set ✅")
        } else
            UI.message("❌ Something Wrong Library Not Assigned")
    });

    webContents.on('set-resize', data => {
        var selectedLayer = context.document.selectedLayers().firstLayer();
        var resize = String(data);
        setResize(selectedLayer, resize);
        context.document.saveDocument(nil);
    });

    webContents.on('set-name', data => {
        var selectedLayer = context.document.selectedLayers().firstLayer();
        var name = String(data);
        selectedLayer.name = name;
        context.document.saveDocument(nil);
    });

    browserWindow.loadURL(require('../resources/webview.html'))

    var myInterval = setInterval(() => {
        var selectedLayer = context.document.selectedLayers().firstLayer();
        if (selectedLayer != null) {
            var name = selectedLayer.name();
            setPageItemFromLibrary(selectedLayer);
            var type = context.command.valueForKey_onLayer_forPluginIdentifier("sf-tag", selectedLayer, 'smartface.io');
            var className = context.command.valueForKey_onLayer_forPluginIdentifier("sf-class", selectedLayer, 'smartface.io');
            var library = context.command.valueForKey_onLayer_forPluginIdentifier("sf-library", selectedLayer, 'smartface.io');
            var allresize = context.command.valueForKey_onLayer_forPluginIdentifier("sf-resize", selectedLayer, 'smartface.io');
            var item = sketch.fromNative(selectedLayer);
            var nameCheck = "1";
            let changed = "false";
            if (notify == null) {
                notify = selectedLayer.objectID();
                changed = "true";
            } else if (notify != selectedLayer.objectID()) {
                notify = selectedLayer.objectID();
                changed = "true";
            }
            if (isValidName(name, type) == false)
                nameCheck = "2";
            if (String(type) == "listviewitem" || String(type) == "gridviewitem")
                if (library != "true") {
                    context.command.setValue_forKey_onLayer_forPluginIdentifier("true", "sf-library", selectedLayer, 'smartface.io');
                    library = "true";
                }

            if (item.type == "SymbolInstance") {
                if (isValidName(name, type) == false)
                    nameCheck = "3";
                else if (nameCheckLibrary(item, type) == false)
                    nameCheck = "3";
            }
            if (type == null)
                type = "null";
            if (className == null)
                className = "null";


            var data = JSON.stringify({
                    name: "" + name,
                    type: "" + type,
                    nameCheck: nameCheck,
                    className: String(className),
                    library: String(library),
                    allresize: JSON.parse(allresize),
                    changed: changed
                })
                // UI.message(String(data.className))
            webContents.executeJavaScript(`setLayerName(${data})`);
        } else
            webContents.executeJavaScript(`setLayerName({})`)

        if (browserWindow.isDestroyed()) {
            UI.message("😱");
            clearInterval(myInterval, context);
        }
    }, 450);

}


function isValidName(name, type) {
    if (type == "shape")
        return isValidNameNoUpperCase(name);
    if (/\d/.test(name.charAt(0)) && name.charAt(0) !== '_') {
        return false
    } else if (!/^[a-z_][A-Za-z0-9_]*([A-Za-z0-9_]+)*$/.test(name)) {
        return false
    }
    return true;
}

function isValidNameNoUpperCase(name) {
    if (/\d/.test(name.charAt(0)) && name.charAt(0) !== '_') {
        return false
    } else if (!/^[a-z_][a-z0-9_]*([a-z0-9_]+)*$/.test(name)) {
        return false
    }
    return true;
}


function nameCheckLibrary(item, type) {
    var flag = true;
    for (var i = 0; i < documents.length; i++) {
        var val = documents[i].getSymbolMasterWithID(item.symbolId)
        if (val != null) {
            if (isValidName(val.name, type) == false)
                return false
        }
    }
    return flag;
}


function setPageItemFromLibrary(layer) {
    var item = sketch.fromNative(layer);
    if (item.type == "SymbolInstance") {
        for (var i = 0; i < documents.length; i++) {
            var val = documents[i].getSymbolMasterWithID(item.symbolId)
            if (val != null) {
                var type = context_.command.valueForKey_onLayer_forPluginIdentifier("sf-tag", val.sketchObject, 'smartface.io');
                if (type != null)
                    context_.command.setValue_forKey_onLayer_forPluginIdentifier(type, "sf-tag", layer, 'smartface.io');
            }
        }
    }
}

function setLibraryItem(layer, sf_type) {
    var item = sketch.fromNative(layer);
    if (item.type == "SymbolInstance") {
        for (var i = 0; i < documents.length; i++) {
            var val = documents[i].getSymbolMasterWithID(item.symbolId)
            if (val != null) {
                var d = context_.command.setValue_forKey_onLayer_forPluginIdentifier(sf_type, "sf-tag", val.sketchObject, 'smartface.io');
                UI.message("✅ Perfect Set Object & SymbolInstance")
                val = null;
            }
        }
    } else
        UI.message("✅ Perfect Set")
}

/**
 *  layer : SelectedLayer
 *  resize: pressed button resize string (resizeup,resizedown ..)
 */
function setResize(layer, resize) {
    var resizeObject = getResize(layer)
    if (resizeObject == null)
        resizeObject = creteResize(layer);
    else
        resizeObject = JSON.parse(resizeObject);
    if (resizeCheck(resizeObject, resize)) {
        resizeObject[resize] = !resizeObject[resize];
        context_.command.setValue_forKey_onLayer_forPluginIdentifier(JSON.stringify(resizeObject), "sf-resize", layer, 'smartface.io');
    }
}

function resizeCheck(resizeObject, resize) {
    if (resize == "top" && resizeObject.bottom == false)
        return false
    else if (resize == "bottom" && resizeObject.top == false)
        return false
    else if (resize == "left" && resizeObject.right == false)
        return false
    else if (resize == "right" && resizeObject.left == false)
        return false
    return true
}

function creteResize(layer) {
    var resizeObject = {
        top: true,
        bottom: false,
        left: true,
        right: false
    }
    context_.command.setValue_forKey_onLayer_forPluginIdentifier(JSON.stringify(resizeObject), "sf-resize", layer, 'smartface.io');
}

function getResize(layer) {
    return context_.command.valueForKey_onLayer_forPluginIdentifier("sf-resize", layer, 'smartface.io');
}