const sketchUtil = require('../utils/sketchUtil');
const pageComponent = require('./sketchComponents');
const sketch = require('sketch');
const UI = require('sketch/ui');
var getValueFromPlugin;
var imageFolder;
var context_;
var documents = require('sketch/dom').getDocuments();

function sketchParseAll(context, folders) {
    let pages = [];
    imageFolder = folders.imageFolder;
    var sketch_pages = sketch.fromNative(context.document);
    context_ = context;
    getValueFromPlugin = context_.command.valueForKey_onLayer_forPluginIdentifier
    for (var key in sketch_pages.pages) {
        if (sketch_pages.pages[key].sketchObject.class() != MSSliceLayer) {
            for (var page in sketch_pages.pages[key].layers) {
                if (sketch_pages.pages[key].layers[page].sketchObject.class() != MSSliceLayer) {
                    var type = splitType(sketch_pages.pages[key].layers[page]);
                    if (type != null)
                        if (type[0] == "page") {
                            let pageTreeComp = sketchUtil.createPageObject();
                            pageCreate(type, sketch_pages.pages[key].layers[page], pageTreeComp);
                            pages.push(pageTreeComp);
                        }
                }
            }
        }
    }
    return pages;
}

function sketchParseOnePage(context, folders, page, type) {
    let pages = [];
    getValueFromPlugin = context.command.valueForKey_onLayer_forPluginIdentifier
    imageFolder = folders.imageFolder;
    context_ = context;
    //context.document.showMessage("🙌 MAPPING SMARTFACE 🙌")
    let pageTreeComp = sketchUtil.createPageObject();
    if (type[0] == "page")
        pageCreate(type, page, pageTreeComp);
    else
        libraryCreate(type, page, pageTreeComp);
    pages.push(pageTreeComp);
    return pages;
}



function pageComponentParse(page, pageTree) {

    for (var iter in page.layers) {
        selectComponentType(page.layers[iter], pageTree);
    }
}


/**
 * create a page Object 
 */
function pageCreate(type, page, pageTree) {
    pageComponent.is_Page(type, page, pageTree);
    pageComponentParse(page, pageTree);
}



function libraryCreate(type, page, pageTree) {
    pageTree.type = type[0];
    pageTree.name = "exported";
    //UI.message("Library" + page.name)
    selectComponentType(page, pageTree);
}

function selectComponentType(page, pageTree) {
    var type = splitType(page);
    if (type == null)
        return false;
    if (type[0] == null || type[0] == "null")
        return false

    if (type[0] == "listview" || type[0] == "gridview") {
        multi_component(type, page, pageTree);
    } else if (type[0] == "listviewitem" || type[0] == "gridviewitem")
        multi_component(type, page, pageTree);
    else if (type[0] == "flexlayout" || type[0] == "scrollview")
        multi_component(type, page, pageTree);
    else if (type[0] == "mapview" || type[0] == "videoview" || type[0] == "webview")
        pageComponent.is_MVW_View(type, page, pageTree);
    else if (type[0] == "textbox" || type[0] == "textarea")
        pageComponent.is_TextBox_TextArea(type, page, pageTree);
    else if (type[0] == "button")
        pageComponent.is_Button(type, page, pageTree);
    else if (type[0] == "imageview")
        pageComponent.is_ImageView(type, page, pageTree, imageFolder);
    else if (type[0] == "label")
        pageComponent.is_Label(type, page, pageTree);
    else if (type[0] == "slider")
        pageComponent.is_Slider(type, page, pageTree);
    else if (type[0] == "switch")
        pageComponent.is_Switch(type, page, pageTree);
    else if (type[0] == "textview")
        pageComponent.is_TextView(type, page, pageTree);
    else if (type[0] == "searchview")
        pageComponent.is_SearchView(type, page, pageTree);
    else if (type[0] == "shape")
        pageComponent.is_Shape_Image(type, page, pageTree, imageFolder);
    else if (type[0] == "headerbar")
        pageComponent.is_HeaderBar(type, page, pageTree, imageFolder);
}


/**
 *   The component consist contain (component|components)
 *   flexLayout , listview , gridview
 */
function multi_component(type, page, pageTree) {
    var tree = pageComponent.is_Multi_Component(type, page, pageTree);
    var _page = page;
    if (tree != null) {
        if (page.type == "SymbolInstance") {
            _page = sketchUtil.symbolInstanceFinder(page);
        }
        pageComponentParse(_page, tree);
    }
}

function exportImage(layer, folders) {
    let imageFolder = folders.imageFolder;
    pageComponent.is_Shape_Image(null, layer, null, imageFolder);
    UI.message("✅ Image Exported")
}

/* type : page#on_button , image#bakgrnd */
function splitType(page) {
    var type = getValueFromPlugin("sf-tag", page.sketchObject, 'smartface.io');
    var lib = getValueFromPlugin("sf-library", page.sketchObject, 'smartface.io');
    var name = page.name;
    var data = [];
    if (name == null || type == null)
        return;
    data.push(type);
    data.push(name);
    if (lib == "true") // Library check 
        data.push(lib);
    else
        data.push("false")

    return data;
}

module.exports = {
    exportImage,
    sketchParseAll,
    sketchParseOnePage,
}