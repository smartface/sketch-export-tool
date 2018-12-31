// Default pgx page component type
var _props = {
    children: [],
    name: "",
    parent: ""
}
var _component = {
    className: "",
    id: "",
    props: _props,
    type: "",
    userProps: {}
};
const sketchUtil = require('./sketchUtil');
const UI = require('sketch/ui')

function sketchHTMLConverter(sketch_html) {
    var pgx_html = "";
    var flag = false;
    if (sketch_html == null)
        return pgx_html;
    var text = sketch_html.text;
    for (var iter in sketch_html.attributes) {

        var start = sketch_html.attributes[iter].location;
        var substr = String(text).substring(start, start + sketch_html.attributes[iter].length);
        var addText = ""; // 
        var style = getStyle(sketch_html.attributes[iter]);

        for (var i = 0; i < substr.length; i++) {

            if (substr[i] == " ") {
                addText += ' '; //&nbsp;
            } else if (substr[i] == "\n") {
                pgx_html += createPgxHTML(style, addText);

                if (flag)
                    pgx_html += "</div><div>";
                else {
                    pgx_html += "<div>";
                    flag = true;
                }
                addText = "";
            } else {
                addText += substr[i];
            }
        }
        pgx_html += createPgxHTML(style, addText);
    }

    if (flag)
        pgx_html += "</div>";

    return pgx_html;
}

function createPgxHTML(style, text) {
    return style + text + "</span>";
}
/* html style creator */
function getStyle(sketch_html_component) {
    var style = "<span style=\"font-size: ";
    var color = sketchUtil.colorHex_Rgba(sketch_html_component.MSAttributedStringColorAttribute.value);

    style += sketch_html_component.NSFont.attributes.NSFontSizeAttribute;
    style += "px ;";
    var font = fontMap(sketch_html_component.NSFont.attributes.NSFontNameAttribute);

    if (font != "Default")
        style += "font-family: " + font[0] + "-" + font[1] + "; ";
    else
        style += "font-family: " + "ios-Default-Regular; ";
    style += "background-color: transparent; "; // there is no higligter sketch 

    style += "color: rgb(" + color.red + ", " + color.green + ", " + color.blue + "); ";
    if (sketch_html_component.NSUnderline != null)
        if (sketch_html_component.NSUnderline > 0) {
            style += " text-decoration-color: ";
            style += colorMap(color) + ";";
            style += "text-decoration-line: underline; ";
        } else {
            style += "text-decoration-color: rgb(0, 0, 0); ";
        }

    style += "\">";
    return style;
}
/*
 * This function calculate again components location 
 * The sketch headerBar y = 0+y but smartface headerBar y = 0 
 */
function recalculateLocation(sketch_component, headerY) {
    for (var iter in sketch_component.children) {
        sketch_component.children[iter].frame.y -= headerY;
    }
}

function borderSetter(pgx_component, sketch_component) {
    if (sketch_component.border == null)
        return;
    if (sketch_component.border.width == 0)
        return;
    if (sketch_component.border.radius != 0)
        pgx_component.userProps.borderRadius = sketch_component.border.radius;

    pgx_component.userProps.borderColor = colorMap(sketch_component.border.color);
    pgx_component.userProps.borderWidth = sketch_component.border.width;
    if (sketch_component.border.circle && sketch_component.frame.width > 0)
        pgx_component.userProps.borderRadius = sketch_component.frame.width / 2;
}

function shadowSetter(pgx_component, sketch_component) {
    const shadow = sketch_component.shadow;
    if (shadow == null)
        return;
    if (!shadow.isEnabled)
        return;
    pgx_component.userProps.ios = {
        shadowColor: colorMap(sketch_component.shadow.color),
        shadowOpacity: sketch_component.shadow.color.alpha,
        shadowRadius: sketch_component.shadow.radius,
        shadowOffset: {
            x: shadow.x,
            y: shadow.y
        }
    };
}

function frameSetter(pgx_component, sketch_component) {
    const userProps = pgx_component.userProps;
    const sketchFrame = sketch_component.frame;
    const parentFrame = sketch_component.parentFrame;
    const {
        left,
        right,
        top,
        bottom
    } = sketch_component.resize || {};

    if (sketchFrame !== null) {

        userProps.left = left ? sketchFrame.x : null;
        userProps.top = top ? sketchFrame.y : null;
        userProps.width = left && right ? null : sketchFrame.width;
        userProps.height = top && bottom ? null : sketchFrame.height;
        right && (userProps.right = Math.abs(parentFrame.width - (sketchFrame.width + sketchFrame.x)))
        bottom && (userProps.bottom = Math.abs(parentFrame.height - (sketchFrame.height + sketchFrame.y)))
    }
}

function textSetter(pgx_component, sketch_component) {
    if (sketch_component.text == null)
        return;
    var alignment = sketch_component.text.verticalAlignment + sketch_component.text.horizontalAlignment;
    var font = fontMap(sketch_component.text.font);
    pgx_component.userProps.font = {
        size: sketch_component.text.size,
        family: font[0],
        style: font[1]
    };
    pgx_component.userProps.text = sketch_component.text.text;
    pgx_component.userProps.textColor = colorMap(sketch_component.text.color);
    pgx_component.userProps.textAlignment = alignment;

}

/**
 *   id , name , parentID  
 *  default page component setting
 */
function defaultPgxSetter(pgx_component, sketch_component) {

    pgx_component.id = sketch_component.id;
    pgx_component.props.name = sketch_component.name;
    pgx_component.props.parent = sketch_component.parentID;
    pgx_component.props.usePageVariable = false;
    pgx_component.userProps.usePageVariable = false;
    pgx_component.userProps.flexProps = {}; // empty flexProps object
    if (sketch_component.property.isVisible == false)
        pgx_component.userProps.visible = false;

}


function addChild(pgx_component, sketch_component) {

    for (var iter in sketch_component.children) {
        if (sketch_component.type == "gridview")
            if (sketch_component.children[iter].type != "gridviewitem")
                exit("The GridView \"" + sketch_component.name + "\" cannot contain \"" +
                    sketch_component.children[iter].type + "\" ->\"" + sketch_component.children[iter].name +
                    "\"\n   GridView only contains GridViewItem !");
        if (sketch_component.type == "listview")
            if (sketch_component.children[iter].type != "listviewitem")
                exit("The ListView \"" + sketch_component.name + "\" cannot contain \"" +
                    sketch_component.children[iter].type + "\" ->\"" + sketch_component.children[iter].name +
                    "\"\n   ListView only contains ListViewItem !");

        pgx_component.props.children.push(sketch_component.children[iter].id);
        sketch_component.children[iter].parentID = pgx_component.id;
    }
}
/**
 * -> Class Name Set
 */
function setSomeProprties(pgxComponent, sketchComponent) {
    if (sketchComponent.class != null)
        pgxComponent.className += " " + sketchComponent.class;

}

function exit(message) {
    UI.message("❌ Exit message : " + message + "\n");
    log(message)
    process.exit(-1);
}

function fontMap(font) {
    if (font == null)
        return "Default";
    else
        return String(font).split("-");
}


function colorMap(color) {
    if (color == null)
        return "rgba( 255, 255, 255, 0 )";
    if (color.alpha == null)
        return "rgba( 255, 255, 255, 0 )";
    return "rgba( " + color.red + ", " + color.green + ", " + color.blue + ", " + color.alpha + " )";
}

/* component id create */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + "-" + s4() + "-" + s4() + "-" + s4();
}

function createComponent() {
    return Object.assign({}, _component, {
        props: createProps()
    }, {
        userProps: {}
    });
}

function createProps() {
    return Object.assign({}, _props, {
        children: []
    })
}

module.exports = {
    guid,
    colorMap,
    addChild,
    textSetter,
    frameSetter,
    borderSetter,
    shadowSetter,
    createComponent,
    setSomeProprties,
    defaultPgxSetter,
    sketchHTMLConverter,
    recalculateLocation,
}