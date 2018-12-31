const pageComponent = require('./smartfaceComponentFactory');
const smartfaceUtil = require('../utils/smartfaceUtil');
const UI = require('sketch/ui');
var pgxPages = [];
var cpxPages = [];
var mappedLibrary = new Map();

function smartfaceMapper(pages) {
    mappedLibrary.clear();
    pgxPages = [];
    cpxPages = [];
    for (let iter in pages) {
        let pgxPage = createPgxPage(pages[iter]);
        if (pgxPage != null) {
            pgxPages.push(pgxPage);
        }
    }
    return {
        pgx: pgxPages,
        cpx: cpxPages
    }
}


function mapPageComponent(smartfacePage, sketchComponent) {

    if (sketchComponent == null)
        return;

    for (var iter in sketchComponent) {
        var smartfaceComponent = selectComponentType(sketchComponent[iter]);
        if (smartfaceComponent != null) {
            smartfacePage.components.push(smartfaceComponent);
            if (smartfaceComponent.type != "GridViewItem" && smartfaceComponent.type != "ListViewItem" &&
                sketchComponent[iter].lib.isLib == false)
                mapPageComponent(smartfacePage, sketchComponent[iter].children);

            if (sketchComponent[iter].lib.isLib == true) {
                for (var iter in smartfacePage.components)
                    for (var iter2 in smartfacePage.components[iter].props.children)
                        if (smartfacePage.components[iter].props.children[iter2] == smartfaceComponent.id) {
                            var id = smartfaceUtil.guid();
                            smartfacePage.components[iter].props.children[iter2] = id;
                            smartfaceComponent.id = id;
                        }
            }
        }
    }
}

function selectComponentType(sketchComponent) {
    if (sketchComponent == null)
        return;

    var smartfaceComponent;
    var type = sketchComponent.type;
    if (type == "listview" || type == "gridview")
        smartfaceComponent = pageComponent.createGridListView(sketchComponent);
    else if (type == "mapview" || type == "videoview" || type == "webview")
        smartfaceComponent = pageComponent.createMapVideoWebView(sketchComponent);
    else if (type == "flexlayout" || type == "scrollview")
        smartfaceComponent = pageComponent.createMultiComponent(sketchComponent);
    else if (type == "textbox" || type == "textarea")
        smartfaceComponent = pageComponent.createTextBoxArea(sketchComponent);
    else if (type == "button")
        smartfaceComponent = pageComponent.createButton(sketchComponent);
    else if (type == "imageview")
        smartfaceComponent = pageComponent.createImageView(sketchComponent);
    else if (type == "label")
        smartfaceComponent = pageComponent.createLabel(sketchComponent);
    else if (type == "slider")
        smartfaceComponent = pageComponent.createSlider(sketchComponent);
    else if (type == "switch")
        smartfaceComponent = pageComponent.createSwitch(sketchComponent);
    else if (type == "textview")
        smartfaceComponent = pageComponent.createTextView(sketchComponent);
    else if (type == "searchview")
        smartfaceComponent = pageComponent.createSearchView(sketchComponent);
    else if (type == "listviewitem" || type == "gridviewitem") {
        smartfaceComponent = pageComponent.createGridListView(sketchComponent);
        createCpx(smartfaceComponent, sketchComponent);
    }

    if (sketchComponent.lib.isLib == true) {
        createCpx(smartfaceComponent, sketchComponent);
    } else {
        if (sketchComponent.objectName != null)
            smartfaceComponent.props.name = sketchComponent.objectName;
    }

    return smartfaceComponent;
}


function createPgxPage(sketchPage) {
    var pgxPage;
    if (sketchPage == null)
        return pgxPage;

    if (sketchPage.type == "page" || sketchPage.type == "library") {
        pgxPage = pageComponent.createPage(sketchPage);
        mapPageComponent(pgxPage, sketchPage.children);
    }
    return pgxPage;
}

/**
 * cpxComponent : ListViewItem or GridViewItem object
 * sketchComponent : cpxPages all contets
 */
function createCpx(cpxComponent, sketchComponent) {
    if (cpxComponent == null || sketchComponent == null)
        return;
    var name = mappedLibrary.get(sketchComponent.lib.libID)
    if (name != null) {
        cpxComponent.props.children = [];
        cpxComponent.source = {
            page: "__library__",
            type: name,
            id: sketchComponent.lib.libID
        };
        cpxComponent.props.name = sketchComponent.objectName;
        return
    }

    var cpxPage = {
        components: []
    };
    var smartfaceComponent;
    var type = sketchComponent.type;
    var savedID = sketchComponent.id;
    sketchComponent.id = sketchComponent.lib.libID;

    if (type == "listview" || type == "gridview" || type == "listviewitem" || type == "gridviewitem")
        smartfaceComponent = pageComponent.createGridListView(sketchComponent);
    else if (type == "mapview" || type == "videoview" || type == "webview")
        smartfaceComponent = pageComponent.createMapVideoWebView(sketchComponent);
    else if (type == "flexlayout" || type == "scrollview")
        smartfaceComponent = pageComponent.createMultiComponent(sketchComponent);
    else if (type == "textbox" || type == "textarea")
        smartfaceComponent = pageComponent.createTextBoxArea(sketchComponent);
    else if (type == "button")
        smartfaceComponent = pageComponent.createButton(sketchComponent);
    else if (type == "imageview")
        smartfaceComponent = pageComponent.createImageView(sketchComponent);
    else if (type == "label")
        smartfaceComponent = pageComponent.createLabel(sketchComponent);
    else if (type == "slider")
        smartfaceComponent = pageComponent.createSlider(sketchComponent);
    else if (type == "switch")
        smartfaceComponent = pageComponent.createSwitch(sketchComponent);
    else if (type == "textview")
        smartfaceComponent = pageComponent.createTextView(sketchComponent);
    else if (type == "searchview")
        smartfaceComponent = pageComponent.createSearchView(sketchComponent);

    mappedLibrary.set(sketchComponent.lib.libID, smartfaceComponent.props.name)

    sketchComponent.id = savedID;
    cpxComponent.props.children = [];
    cpxComponent.source = {
        page: "__library__",
        type: smartfaceComponent.props.name,
        id: smartfaceComponent.id
    };
    cpxComponent.props.name = sketchComponent.objectName;
    smartfaceComponent.props.parent = smartfaceUtil.guid();
    smartfaceComponent.hiddenComponent = true; // 
    cpxPage.components.push(smartfaceComponent); // Add GridViewItem or ListViewItem on cpx 
    // map for cpx componets
    mapPageComponent(cpxPage, sketchComponent.children);

    for (var iter in cpxPage.components) { // add libray item 

        if (cpxPage.components[iter].source == null) {
            cpxPage.components[iter].source = {
                page: "__library__"
            };
        }

    }

    cpxPages.push(cpxPage);
}

module.exports = {
    smartfaceMapper,
}