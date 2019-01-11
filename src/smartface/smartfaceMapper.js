const pageComponent = require('./smartfaceComponentFactory');
const smartfaceUtil = require('../utils/smartfaceUtil');
var pgxPages = [];
var cpxPages = [];
var mappedLibrary = new Map();

function smartfaceMapper(pages) {
    mappedLibrary.clear();
    pgxPages = [];
    cpxPages = [];
    for (let iter in pages) {
        let pgxPage = createPgx(pages[iter]);
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

    if (sketchComponent != null)
        for (var iter in sketchComponent) {
            let smartfaceComponent = selectComponentType(sketchComponent[iter]);
            if (smartfaceComponent != null) {
                smartfacePage.components.push(smartfaceComponent);
                if (sketchComponent[iter].lib.isLib) {
                    for (let iter1 in smartfacePage.components)
                        for (let iter2 in smartfacePage.components[iter1].props.children)
                            if (smartfacePage.components[iter1].props.children[iter2] == smartfaceComponent.id) {
                                let id = smartfaceUtil.guid();
                                smartfacePage.components[iter1].props.children[iter2] = id;
                                smartfaceComponent.id = id;
                            }
                } else
                    mapPageComponent(smartfacePage, sketchComponent[iter].children);
            }
        }
}

function selectComponentType(sketchComponent) {
    if (sketchComponent == null)
        return;
    let smartfaceComponent = createSmartfaceObject(sketchComponent);
    if (sketchComponent.lib.isLib == true) {
        createCpx(smartfaceComponent, sketchComponent);
    } else {
        if (sketchComponent.objectName != null)
            smartfaceComponent.props.name = sketchComponent.objectName;
    }

    return smartfaceComponent;
}


function createPgx(sketchPage) {
    var pgxPage = null;
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

    var savedID = sketchComponent.id;
    sketchComponent.id = sketchComponent.lib.libID;
    let smartfaceComponent = createSmartfaceObject(sketchComponent);

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

function createSmartfaceObject(sketchComponent) {
    let type = sketchComponent.type;
    if (type == "listview" || type == "gridview" || type == "listviewitem" || type == "gridviewitem")
        return pageComponent.createGridListView(sketchComponent);
    else if (type == "mapview" || type == "videoview" || type == "webview")
        return pageComponent.createMapVideoWebView(sketchComponent);
    else if (type == "flexlayout" || type == "scrollview")
        return pageComponent.createMultiComponent(sketchComponent);
    else if (type == "textbox" || type == "textarea")
        return pageComponent.createTextBoxArea(sketchComponent);
    else if (type == "button")
        return pageComponent.createButton(sketchComponent);
    else if (type == "imageview")
        return pageComponent.createImageView(sketchComponent);
    else if (type == "label")
        return pageComponent.createLabel(sketchComponent);
    else if (type == "slider")
        return pageComponent.createSlider(sketchComponent);
    else if (type == "switch")
        return pageComponent.createSwitch(sketchComponent);
    else if (type == "textview")
        return pageComponent.createTextView(sketchComponent);
    else if (type == "searchview")
        return pageComponent.createSearchView(sketchComponent);
}

module.exports = {
    smartfaceMapper,
}