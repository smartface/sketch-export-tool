var documents = require('sketch/dom').getDocuments();

var _color = {
    alpha: null,
    blue: null,
    green: null,
    red: null
};
var _text = {
    text: "",
    color: _color,
    font: "",
    size: 0
};
var _frame = {
    height: 0,
    width: 0,
    x: 0,
    y: 0
};
var _lib = {
    libID: "",
    x: 0, // library x - page x 
    y: 0,
    height: 0,
    width: 0,
    isLib: false
}

var _shadow = {
    isEnabled: false,
    x: 0,
    y: 0,
    radius: 0,
    color: null
};
var _border = {
    color: null,
    radius: 0,
    width: 0
};
/* Component definiation*/
var _component = {
    type: "",
    name: "",
    objectName: "",
    id: "",
    class: "",
    parentID: "",
    frame: _frame,
    children: [],
    property: {
        isVisible: false,
        isClickable: false,
        hasBacgroundColor: false,
        color: _color
    },
    text: _text,
    image: ""
};

var libraryMap = new Map();
var horizontalAlignment = new Map();
horizontalAlignment.set(0, "LEFT") // left
horizontalAlignment.set(1, "RIGHT") // right
horizontalAlignment.set(2, "CENTER") // center
horizontalAlignment.set(3, "CENTER") // justify 
var HORIZONTAL_ALIGNMENT_DEFAULT = horizontalAlignment.get(0);

/* component id create */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + "-" + s4() + "-" + s4() + "-" + s4();
}
/*
 * type[0] : class name ,
 * type[1] : name 
 */
function setComponent(component, type, sketch_component, color) {

    component.name = sketch_component.name;
    component.type = type[0];
    component.objectName = type[1];
    setFrame(component, sketch_component);
    colorRGBA(component, color);
}

function colorRGBA(component, color) {
    component.property.color.alpha = color.alpha;
    component.property.color.blue = color.blue;
    component.property.color.green = color.green;
    component.property.color.red = color.red;
}

function setFrame(component, sketch_component) {
    if (component.frame.height === 0 && component.frame.width === 0) {
        component.frame.height = sketch_component.frame.height;
        component.frame.width = sketch_component.frame.width;
        component.frame.x = sketch_component.frame.x;
        component.frame.y = sketch_component.frame.y;

    } else {
        component.lib.height = sketch_component.frame.height;
        component.lib.width = sketch_component.frame.width;
        component.lib.x = sketch_component.frame.x;
        component.lib.y = sketch_component.frame.y;
    }
}

// The library item frame new calculate 
function calculateNewFrame(component, parent) {
    //component.frame.height -= (parent.lib.height - parent.frame.height);
    //component.frame.width -= (parent.lib.width - parent.frame.width);
    //component.frame.x += (parent.frame.x);
    //component.frame.y += (parent.frame.y);
}

/**
	sketch text to component text 
*/
function fill_text_object(sketch_component) {
    var textObj = createTextObject();
    var txJson = sketchToJson(sketch_component);
    var attributes = txJson.attributedString.value.attributes[0];
    var alignment = attributes.NSParagraphStyle.style.alignment; // horizontal alignment

    textObj.font = attributes.NSFont.attributes.NSFontNameAttribute;
    textObj.text = txJson.attributedString.value.text;
    textObj.size = attributes.NSFont.attributes.NSFontSizeAttribute;
    textObj.color = colorHex_Rgba(attributes.MSAttributedStringColorAttribute.value);

    if (attributes.MSAttributedStringTextTransformAttribute != null) {
        if (attributes.MSAttributedStringTextTransformAttribute == 1) // uppercase
            textObj.text = String(textObj.text).toLocaleUpperCase('TR');
        else if (attributes.MSAttributedStringTextTransformAttribute == 2) // lowercase  
            textObj.text = String(textObj.text).toLocaleLowerCase('tr');
    }
    textObj.horizontalAlignment = horizontalAlignment.get(alignment) || HORIZONTAL_ALIGNMENT_DEFAULT;
    textObj.verticalAlignment = "MID";
    return textObj
}

/*
 * sketch_data : sketch_component.layers[iter]
 * Each component layers data 
 */
function borderSet(sketch_data) {
    var borderObject = createBorderObject();
    if (sketch_data == null)
        return borderObject;
    if (sketch_data.style.borders == null)
        return borderObject;
    if (sketch_data.style.borders[0] == null)
        return borderObject;
    var brJson = sketchToJson(sketch_data);
    if (String(brJson.style.borders[0].isEnabled) == "1") { // Border 
        borderObject.width = brJson.style.borders[0].thickness;
        borderObject.color = colorHex_Rgba(brJson.style.borders[0].color.value);
        /*if (borderObject.width == 0.5)
            log(JSON.stringify(brJson.style.borders[0]))*/
    }
    borderObject.radius = brJson.layers[0].points[0].cornerRadius;
    return borderObject;
}

function shadowSet(sketch_data) {
    var shadow = createShadowObject();
    if (sketch_data == null)
        return shadow;
    if (sketch_data.shadows == null)
        return shadow;
    if (sketch_data.shadows[0] == null)
        return shadow;
    if (sketch_data.shadows[0].type != "Shadow")
        return shadow;
    var shJson = sketchToJson(sketch_data);
    if (sketch_data.shadows[0].enabled) {

        shadow.isEnabled = true;
        shadow.x = shJson.shadows[0].offsetX;
        shadow.y = shJson.shadows[0].offsetY;
        shadow.radius = shJson.shadows[0].blurRadius;
        shadow.color = colorHex_Rgba(shJson.shadows[0].color.value);
    }
    return shadow;
}

function setResize(containerComponent, sketchComponent) {
    var resize = context.command.valueForKey_onLayer_forPluginIdentifier("sf-resize", sketchComponent.sketchObject, 'smartface.io');
    resize = JSON.parse(resize)
    containerComponent.resize = resize;
}

// sketch_data : sketch_component.layers[iter].style
function colorSet(sketch_data) {
    var color = createColorObject();
    if (sketch_data == null)
        return color;
    if (sketch_data.fills == null)
        return color;
    if (sketch_data.fills[0] == null)
        return color;
    if (sketch_data.fills[0].color == null)
        return color;
    var clJson = sketchToJson(sketch_data);
    color = colorHex_Rgba(clJson.fills[0].color.value);
    return color;
}

function colorHex_Rgba(sketch_data) {
    var color = createColorObject();
    var rgba;
    if (String(sketch_data.substring(0, 1)) == "r") {
        rgba = sketch_data;
    } else if (String(sketch_data.substring(0, 1)) == "#") {
        rgba = hexToRgbA(sketch_data);
    }

    if (rgba != null)
        color = rgbToColor(rgba);
    return color;
}

function symbolInstanceFinder(sketch_component) {

    if (sketch_component.type == "SymbolInstance") {
        for (var i = 0; i < documents.length; i++) {
            var val = documents[i].getSymbolMasterWithID(sketch_component.symbolId)
            if (val != null)
                return val
        }
    }
}

function shapeFinder(sketch_component) {
    for (var i = 0; i < documents.length; i++) {
        var val = documents[i].getLayerWithID(sketch_component.id)
        if (val != null)
            return val
    }

}

function rgbToColor(rgba) {
    var color = createColorObject();
    if (String(rgba.substring(0, 4)) == "rgba") {
        var firstIndex = rgba.indexOf('(') + 1;
        var lastIdex = rgba.indexOf(')');
        var colorArr = rgba.substring(firstIndex, lastIdex).split(',');
        color.red = parseInt(colorArr[0]);
        color.green = parseInt(colorArr[1]);
        color.blue = parseInt(colorArr[2]);
        color.alpha = parseFloat(colorArr[3]);
    }
    return color;
}

function isShape(component) {
    var _component = sketchToJson(component);
    if (_component.userInfo != null)
        if (_component.userInfo["smartface.io"] != null)
            if (_component.userInfo["smartface.io"]["sf-tag"] == "shape")
                return true;
    return false
}

function isSfType(component) {
    var _component = sketchToJson(component);
    if (_component.userInfo != null)
        if (_component.userInfo["smartface.io"] != null)
            if (_component.userInfo["smartface.io"]["sf-tag"] != "" &&
                _component.userInfo["smartface.io"]["sf-tag"] != null &&
                _component.userInfo["smartface.io"]["sf-tag"] != "null")
                return true;
    return false
}

function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');

        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ', 1 )';
    }
}

function sketchToJson(component) {
    var pageDict = component.sketchObject.treeAsDictionary();

    var jsonData = NSJSONSerialization.dataWithJSONObject_options_error_(pageDict, 0, nil);
    var jsonString = NSString.alloc().initWithData_encoding_(jsonData, NSUTF8StringEncoding);
    var sketch_container = JSON.parse(jsonString);
    return sketch_container;
}

/* Object create section */
function createPageObject() {
    var pageTreeComp = Object.assign({}, _component, {
        frame: createFrameObject(),
        children: Object.assign([], _component.children),
        text: Object.assign({}, _component.text),
        property: Object.assign({}, _component.property, {
            color: createColorObject()
        }),
        lib: createLibObject()
    });

    pageTreeComp.id = guid(); // Assign id for component 

    return pageTreeComp;
}

function createBorderObject() {
    return Object.assign({}, _border, {
        color: createColorObject()
    });
}

function createShadowObject() {
    return Object.assign({}, _shadow, {
        color: createColorObject()
    });
}

function createTextObject() {
    var text = Object.assign({}, _text, {
        color: createColorObject()
    });
    return text;
}

function createColorObject() {
    var color = Object.assign({}, _color);
    return color;
}

function createFrameObject() {
    var frame = Object.assign({}, _frame);
    return frame;
}

function createLibObject() {
    var lib = Object.assign({}, _lib);
    return lib;
}

function setLibProperty(containerComponent, sketchComponent) {
    containerComponent.lib.isLib = true;
    if (sketchComponent.type == "SymbolInstance") {
        var symbolId = sketchComponent.symbolId;
        var id = libraryMap.get(symbolId);
        if (id == null) {
            var newId = guid();
            libraryMap.set(symbolId, newId);
            containerComponent.lib.libID = newId;
        } else {
            containerComponent.lib.libID = id;
        }
    } else {
        containerComponent.lib.libID = guid();
    }
}
/*
 * if the objects circle this method help to detect . 
 */
function circleObject(sketchComponent) {
    var slJson = sketchToJson(sketchComponent);
    if (slJson.layers != null) {
        if (slJson.layers[0] != null) {
            if (slJson.layers[0]["<class>"] == "MSOvalShape") { // Thumb
                return true;
            }
        }
    }
    return false;
}

/**
 * Set the component parents Id
 */
function setParentId(sketchComponet, parent) {
    sketchComponet.parentID = parent.id;
}


function getClass(component) {
    var _component = sketchToJson(component);
    if (_component.userInfo != null)
        if (_component.userInfo["smartface.io"] != null)
            if (_component.userInfo["smartface.io"]["sf-class"] != "" &&
                _component.userInfo["smartface.io"]["sf-class"] != null &&
                _component.userInfo["smartface.io"]["sf-class"] != "null")
                return _component.userInfo["smartface.io"]["sf-class"];
    return null
}

/**
 *  -> Visibility Set
 *  -> Class Set
 */
function setFirstPropery(containerComponent, sketchComponent, parent) {
    var classN = getClass(sketchComponent); // Class set
    if (classN != null)
        containerComponent.class = classN;
    containerComponent.parentFrame = parent.frame;
    setResize(containerComponent, sketchComponent);
    if (sketchComponent.hidden != null) // Visiblity set 
        if (sketchComponent.hidden)
            containerComponent.property.isVisible = false;
        else
            containerComponent.property.isVisible = true;

}
module.exports = {
    symbolInstanceFinder,
    createBorderObject,
    createShadowObject,
    createColorObject,
    calculateNewFrame,
    createPageObject,
    createTextObject,
    fill_text_object,
    setFirstPropery,
    setLibProperty,
    colorHex_Rgba,
    setComponent,
    sketchToJson,
    circleObject,
    shapeFinder,
    setParentId,
    colorRGBA,
    borderSet,
    shadowSet,
    setFrame,
    colorSet,
    isSfType,
    isShape,
    guid,
}