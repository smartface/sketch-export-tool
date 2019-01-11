const sketchUtil = require('../utils/sketchUtil');
const outputUtil = require('../utils/outputUtil');

/** 
    name : the name of the sketch page
    page : the sketch page data
    pageTree : the page tree
*/

function is_Page(type, page, pageTree) {

    var pageJson = sketchUtil.sketchToJson(page);
    var color = sketchUtil.colorHex_Rgba(pageJson.backgroundColor.value);
    sketchUtil.setComponent(pageTree, type, page, color);
    pageTree.frame.x = 0;
    pageTree.frame.y = 0;
}


/**
 *  type[0] = name
 *  type[1] = class name
 *  type[2] = isLibrary "true" || "false"
 */
function is_Button(type, sketch_component, pageTree) {
    var button = sketchUtil.createPageObject();
    var buttonColor = sketchUtil.createColorObject();
    button.shadow = sketchUtil.createShadowObject();
    var buttonText = sketchUtil.createTextObject();
    sketchUtil.setFirstPropery(button, sketch_component, pageTree);
    if (type[2] == "true")
        sketchUtil.setLibProperty(button, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(button, sketch_component);
        // log(JSON.stringify(sketch_component.overrides))
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }

    if (sketch_component.type == "SymbolMaster")
        sketch_component = sketch_component.layers[0];

    if (sketch_component.type == "Group") { //Shadow
        button.shadow = sketchUtil.shadowSet(sketch_component.style);
    }

    for (var iter in sketch_component.layers) { // button = rectangle + text 
        var component = sketch_component.layers[iter];
        var flag = false;
        do {
            flag = false
            if (component.type == "SymbolInstance") {
                component = sketchUtil.symbolInstanceFinder(component);
                component = component.layers[0]; // Should be change
                if (component.type == "SymbolInstance")
                    flag = true;
            }
        } while (flag)

        if (component.type == "Text") {
            buttonText = sketchUtil.fill_text_object(component);
        }

        if (component.type == "Shape") {

            buttonColor = sketchUtil.colorSet(component.style);
            button.border = sketchUtil.borderSet(component);
            button.border.circle = sketchUtil.circleObject(component);
            if (!button.shadow.isEnabled)
                button.shadow = sketchUtil.shadowSet(component.style);
        }
    }
    sketchUtil.setComponent(button, type, sketch_component, buttonColor);
    button.text = buttonText;

    sketchUtil.setParentId(button, pageTree);

    if (pageTree.lib.isLib == true) { // if parent is lib item 
        sketchUtil.calculateNewFrame(button, pageTree);
    }
    pageTree.children.push(button);
}

function is_Shape_Image(type, sketch_component, pageTree, imageFolder) {

    var newObj = sketchUtil.shapeFinder(sketch_component);
    if (newObj != null)
        outputUtil.imageExport(newObj, imageFolder);
    else
        outputUtil.imageExport(sketch_component, imageFolder);

}

function is_ImageView(type, sketch_component, pageTree, imageFolder) {
    var imageView = sketchUtil.createPageObject();
    imageView.shadow = sketchUtil.createShadowObject();
    var color = sketchUtil.createColorObject();
    sketchUtil.setFirstPropery(imageView, sketch_component, pageTree);
    if (type[2] == "true")
        sketchUtil.setLibProperty(imageView, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(imageView, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }
    if (sketch_component.type == "SymbolMaster")
        sketch_component = sketch_component.layers[0];

    if (sketch_component.type == "Image" || sketchUtil.isShape(sketch_component) == true) {
        let imJson = sketchUtil.sketchToJson(sketch_component);
        var imageType = [];
        imageType.push(imJson.name);
        imageType.push("image");
        imageView.image = imJson.name + ".png"; // assign image directory
        is_Shape_Image(imageType, sketch_component, "null", imageFolder);
    }

    if (sketch_component.type == "Group") {
        imageView.shadow = sketchUtil.shadowSet(sketch_component.style);
    }

    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];
        var flag = false;
        do {
            flag = false
            if (component.type == "SymbolInstance") {
                component = sketchUtil.symbolInstanceFinder(component);
                component = component.layers[0]; // Should be change
                if (component.type == "SymbolInstance")
                    flag = true;
            }
        } while (flag)
        let imJson = sketchUtil.sketchToJson(component);

        if (component.type == "Image" || sketchUtil.isShape(component) == true) {
            imageView.image = imJson.name + ".png";
            is_Shape_Image("null", component, "null", imageFolder);
        } else if (component.type == "Shape") {
            imageView.border = sketchUtil.borderSet(component);
            color = sketchUtil.colorSet(component.style);
            imageView.border.circle = sketchUtil.circleObject(component);
            if (!imageView.shadow.isEnabled) //Shadow   
                imageView.shadow = sketchUtil.shadowSet(component.style);
        }
    }

    sketchUtil.setComponent(imageView, type, sketch_component, color);

    sketchUtil.setParentId(imageView, pageTree);

    if (pageTree.lib.isLib == true) { // if parent lib item 
        sketchUtil.calculateNewFrame(imageView, pageTree);
    }
    pageTree.children.push(imageView);
}

/**
 *     LABEL 
 */
function is_Label(type, sketch_component, pageTree) {
    var label = sketchUtil.createPageObject();
    label.shadow = sketchUtil.createShadowObject();
    var label_bacground_color = sketchUtil.createColorObject();
    var label_text = sketchUtil.createTextObject();
    sketchUtil.setFirstPropery(label, sketch_component, pageTree);
    //log(JSON.stringify(sketchUtil.sketchToJson(sketch_component)))
    if (type[2] == "true")
        sketchUtil.setLibProperty(label, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(label, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }

    if (sketch_component.type == "SymbolMaster")
        sketch_component = sketch_component.layers[0];

    if (sketch_component.type == "Group" || sketch_component.type == "SymbolInstance") { // if label in group
        label.shadow = sketchUtil.shadowSet(sketch_component.style);
    } else if (sketch_component.type == "Text") { //
        label_text = sketchUtil.fill_text_object(sketch_component);
    }
    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];

        if (component.type == "SymbolInstance") {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }
        if (component.type == "Text") {
            label_text = sketchUtil.fill_text_object(component);
        }

        if (component.type == "Shape") {
            label_bacground_color = sketchUtil.colorSet(component.style);
            label.border = sketchUtil.borderSet(component);
            label.border.circle = sketchUtil.circleObject(component);
            if (!label.shadow.isEnabled) // Shadow
                label.shadow = sketchUtil.shadowSet(component.style);
        }
    }

    sketchUtil.setComponent(label, type, sketch_component, label_bacground_color);
    label.text = label_text;

    sketchUtil.setParentId(label, pageTree);

    if (pageTree.lib.isLib == true) { // if parent lib item 
        sketchUtil.calculateNewFrame(label, pageTree);
    }
    pageTree.children.push(label);
}

function is_TextBox_TextArea(type, sketch_component, pageTree) {
    var text_Box_Area = sketchUtil.createPageObject();
    var backgroundColor = sketchUtil.createColorObject();
    text_Box_Area.shadow = sketchUtil.createShadowObject();
    var textData = sketchUtil.createTextObject();
    sketchUtil.setFirstPropery(text_Box_Area, sketch_component, pageTree);

    if (type[2] == "true")
        sketchUtil.setLibProperty(text_Box_Area, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(text_Box_Area, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }
    if (sketch_component.type == "SymbolMaster")
        sketch_component = sketch_component.layers[0];

    if (sketch_component.type == "Group") {
        text_Box_Area.shadow = sketchUtil.shadowSet(sketch_component.style);
    } else if (sketch_component.type == "Text") { //
        textData = sketchUtil.fill_text_object(sketch_component);
    }

    for (var iter in sketch_component.layers) { // text = rectangle + text 
        var component = sketch_component.layers[iter];
        if (component.type == "SymbolInstance") {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }
        if (component.type == "Text") {
            textData = sketchUtil.fill_text_object(component);
        }
        if (component.type == "Shape") {

            backgroundColor = sketchUtil.colorSet(component.style);
            text_Box_Area.border = sketchUtil.borderSet(component);
            text_Box_Area.border.circle = sketchUtil.circleObject(component);;
            if (!text_Box_Area.shadow.isEnabled)
                text_Box_Area.shadow = sketchUtil.shadowSet(component.style);
        }
    }

    sketchUtil.setComponent(text_Box_Area, type, sketch_component, backgroundColor);
    text_Box_Area.text = textData;

    sketchUtil.setParentId(text_Box_Area, pageTree);

    if (pageTree.lib.isLib == true) { // if parent lib item 
        sketchUtil.calculateNewFrame(text_Box_Area, pageTree);
    }

    pageTree.children.push(text_Box_Area);
}


function is_SearchView(type, sketch_component, pageTree) {
    var searchView = sketchUtil.createPageObject();
    var searchColor = sketchUtil.createColorObject();
    searchView.shadow = sketchUtil.createShadowObject();
    var searchText = sketchUtil.createTextObject();
    sketchUtil.setFirstPropery(searchView, sketch_component, pageTree);

    if (type[2] == "true")
        sketchUtil.setLibProperty(searchView, sketch_component);
    if (sketch_component.type == "SymbolInstance") { // use default(sketch) search instance
        searchColor = sketchUtil.createColorObject();
    } else if (sketch_component.type == "Group") { // use grup rectangle and text 
        searchView.shadow = sketchUtil.shadowSet(sketch_component.style);

        for (var iter in sketch_component.layers) { // searchBar = rectangle + text 
            var component = sketch_component.layers[iter];
            if (component.type == "SymbolInstance") {
                searchColor = sketchUtil.createColorObject();
                component = sketchUtil.symbolInstanceFinder(component);
                component = component.layers[0]; // Should be change
            }
            if (component.type == "Text") {
                searchText = sketchUtil.fill_text_object(component);
            }
            if (component.type == "Shape") {
                searchColor = sketchUtil.colorSet(component.style);
                searchView.border = sketchUtil.borderSet(component);
                searchView.border.circle = sketchUtil.circleObject(component);
                if (!searchView.shadow.isEnabled) // Shadow
                    searchView.shadow = sketchUtil.shadowSet(component.style);
            }
        }
    }

    sketchUtil.setComponent(searchView, type, sketch_component, searchColor);
    searchView.text = searchText;

    sketchUtil.setParentId(searchView, pageTree);

    if (pageTree.lib.isLib == true) { // if parent lib item 
        sketchUtil.calculateNewFrame(searchView, pageTree);
    }

    pageTree.children.push(searchView);
}
/*
 * MULTI COMPONENT CONTAINER ###################################################################
 */
function is_Multi_Component(type, sketch_component, pageTree) {
    var multiComponent = sketchUtil.createPageObject();
    var color = sketchUtil.createPageObject();
    multiComponent.shadow = sketchUtil.createShadowObject();

    sketchUtil.setFirstPropery(multiComponent, sketch_component, pageTree);

    if (type[2] == "true")
        sketchUtil.setLibProperty(multiComponent, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(multiComponent, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }

    if (sketch_component.type == "Group") {
        multiComponent.shadow = sketchUtil.shadowSet(sketch_component.style);
    }

    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];

        if (component.type == "SymbolInstance" && !sketchUtil.isSfType(component)) {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }

        if (component.type == "Shape" && !sketchUtil.isSfType(component)) {
            multiComponent.border = sketchUtil.borderSet(component);
            color = sketchUtil.colorSet(component.style);
            multiComponent.border.circle = sketchUtil.circleObject(component);
            if (!multiComponent.shadow.isEnabled)
                multiComponent.shadow = sketchUtil.shadowSet(component.style);
        }
    }

    sketchUtil.setComponent(multiComponent, type, sketch_component, color);

    sketchUtil.setParentId(multiComponent, pageTree);

    if (pageTree.lib.isLib == true) { // if parent lib item 
        sketchUtil.calculateNewFrame(multiComponent, pageTree);
    }
    pageTree.children.push(multiComponent);
    return multiComponent;
}

/* ########################################################################################## */
function is_Slider(type, sketch_component, pageTree) {
    var slider = sketchUtil.createPageObject();
    var color = sketchUtil.createColorObject();
    var thumbColor = sketchUtil.createColorObject();
    var maxColor = sketchUtil.createColorObject();
    var minColor = sketchUtil.createColorObject();

    sketchUtil.setFirstPropery(slider, sketch_component, pageTree);
    if (type[2] == "true")
        sketchUtil.setLibProperty(slider, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(slider, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }

    if (sketch_component.type == "SymbolMaster")
        sketch_component = sketch_component.layers[0];

    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];
        if (component.type == "SymbolInstance") {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }
        if (component.type == "Shape") {
            var slJson = sketchUtil.sketchToJson(component);
            if (slJson.layers != null) {
                if (slJson.layers[0] != null) {
                    if (slJson.layers[0]["<class>"] == "MSOvalShape") { // Thumb
                        thumbColor = sketchUtil.colorSet(component.style);
                    }
                    if (slJson.layers[0]["<class>"] == "MSShapePathLayer") { // Line
                        if (component.name == "min")
                            minColor = sketchUtil.colorHex_Rgba(slJson.style.borders[0].color.value);
                        else
                            maxColor = sketchUtil.colorHex_Rgba(slJson.style.borders[0].color.value);
                    }
                }
            }
        }
    }
    sketchUtil.setComponent(slider, type, sketch_component, color);

    slider.thumbColor = thumbColor;
    slider.minTrackColor = minColor;
    slider.maxTrackColor = maxColor;

    sketchUtil.setParentId(slider, pageTree);

    if (pageTree.lib.isLib == true) { // if parent lib item 
        sketchUtil.calculateNewFrame(slider, pageTree);
    }
    pageTree.children.push(slider);
}

function is_TextView(type, sketch_component, pageTree) {
    var text_view = sketchUtil.createPageObject();
    var backgroundColor = sketchUtil.createColorObject();
    text_view.shadow = sketchUtil.createShadowObject();
    sketchUtil.setFirstPropery(text_view, sketch_component, pageTree);

    if (type[2] == "true")
        sketchUtil.setLibProperty(text_view, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(text_view, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }

    if (sketch_component.type == "SymbolMaster")
        sketch_component = sketch_component.layers[0];

    if (sketch_component.type == "Group") {
        text_view.shadow = sketchUtil.shadowSet(sketch_component.style);
    }

    if (sketch_component.type == "Text") {

        let twJson = sketchUtil.sketchToJson(sketch_component);
        let color = twJson.attributedString.value.attributes[0].MSAttributedStringColorAttribute.value;
        text_view.text.text = sketchUtil.fill_text_object(sketch_component);
        text_view.html = twJson.attributedString.value;
    }
    // textView in Group
    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];
        if (component.type == "SymbolInstance") {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }
        if (component.type == "Text") {

            let twJson = sketchUtil.sketchToJson(component);
            let color = twJson.attributedString.value.attributes[0].MSAttributedStringColorAttribute.value;
            text_view.text.text = sketchUtil.fill_text_object(component);
            text_view.html = twJson.attributedString.value;
        }
        if (component.type == "Shape") {
            backgroundColor = sketchUtil.colorSet(component.style);
            text_view.border = sketchUtil.borderSet(component);
            text_view.border.circle = sketchUtil.circleObject(component);
            if (!text_view.shadow.isEnabled)
                text_view.shadow = sketchUtil.shadowSet(component.style);
        }
    }

    sketchUtil.setComponent(text_view, type, sketch_component, backgroundColor);
    sketchUtil.setParentId(text_view, pageTree);

    if (pageTree.lib.isLib == true) { // if parent lib item 
        sketchUtil.calculateNewFrame(text_view, pageTree);
    }
    pageTree.children.push(text_view);
}
/**
 *  MapView , VideoView , WebView
 */
function is_MVW_View(type, sketch_component, pageTree) {
    var mvw_view = sketchUtil.createPageObject();
    var backgroundColor = sketchUtil.createColorObject();

    sketchUtil.setFirstPropery(mvw_view, sketch_component, pageTree);

    if (type[2] == "true")
        sketchUtil.setLibProperty(mvw_view, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(mvw_view, sketch_component, pageTree);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }

    if (sketch_component.type == "SymbolMaster")
        sketch_component = sketch_component.layers[0];

    if (sketch_component.type == "Group") {
        mvw_view.shadow = sketchUtil.shadowSet(sketch_component.style);
    }

    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];
        if (component.type == "SymbolInstance") {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }
        if (component.type == "Shape") {
            mvw_view.border = sketchUtil.borderSet(component);

            mvw_view.border.circle = sketchUtil.circleObject(component);
            if (!mvw_view.shadow.isEnabled)
                mvw_view.shadow = sketchUtil.shadowSet(component.style);
        }
    }
    sketchUtil.setComponent(mvw_view, type, sketch_component, backgroundColor);
    sketchUtil.setParentId(mvw_view, pageTree);

    if (pageTree.lib.isLib == true) { // if parent lib item 
        sketchUtil.calculateNewFrame(mvw_view, pageTree);
    }
    pageTree.children.push(mvw_view);
}

function is_Switch(type, sketch_component, pageTree) {
    var switchComp = sketchUtil.createPageObject();
    var thumbColor = sketchUtil.createColorObject();
    var toggleOnColor = sketchUtil.createColorObject();

    sketchUtil.setFirstPropery(switchComp, sketch_component, pageTree);

    if (type[2] == "true")
        sketchUtil.setLibProperty(switchComp, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(switchComp, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }
    if (sketch_component.type == "SymbolMaster")
        sketch_component = sketch_component.layers[0];

    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];
        if (component.type == "SymbolInstance") {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }
        if (component.type == "Shape") {
            var slJson = sketchUtil.sketchToJson(component);
            if (slJson.layers != null) {
                if (slJson.layers[0] != null) {
                    if (slJson.layers[0]["<class>"] == "MSOvalShape") { // Thumb
                        thumbColor = sketchUtil.colorSet(component.style);
                    }
                    if (slJson.layers[0]["<class>"] == "MSRectangleShape") { // Line
                        toggleOnColor = sketchUtil.colorSet(component.style);
                    }
                }
            }
        }
    }
    sketchUtil.setComponent(switchComp, type, sketch_component, sketchUtil.createColorObject());

    switchComp.thumbColor = thumbColor;
    switchComp.toggleOnColor = toggleOnColor;

    sketchUtil.setParentId(switchComp, pageTree);

    if (pageTree.lib.isLib == true) { // if parent lib item 
        sketchUtil.calculateNewFrame(switchComp, pageTree);
    }

    pageTree.children.push(switchComp);
}

function is_HeaderBar(type, sketch_component, pageTree, imageFolder) {
    var y = sketch_component.frame.height;
    y += sketch_component.frame.y;

    if (sketch_component.type == "SymbolInstance") {
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }
    if (sketch_component.type == "SymbolMaster")
        sketch_component = sketch_component.layers[0];

    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];
        if (component.type == "Image" || sketchUtil.isShape(component) == true) {
            is_Shape_Image("null", component, "null", imageFolder);
        }
    }
    if (pageTree.type == "page")
        pageTree.headerBar = y;
    else
        context.document.showMessage("The HeaderBar should be a page child !! ")


}
module.exports = {
    is_Page,
    is_Label,
    is_Switch,
    is_Slider,
    is_Button,
    is_MVW_View,
    is_TextView,
    is_HeaderBar,
    is_ImageView,
    is_SearchView,
    is_Shape_Image,
    is_Multi_Component,
    is_TextBox_TextArea,
}