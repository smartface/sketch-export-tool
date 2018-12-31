const smartfaceUtil = require('../utils/smartfaceUtil');
/**
 * MULTICOMPONENT :
 * flexLayout 
 * scrollView 
 */
function createMultiComponent(sketchComponent) {
    var multiComponent = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(multiComponent, sketchComponent);
    smartfaceUtil.addChild(multiComponent, sketchComponent);
    //----------------------------------//
    if (sketchComponent.type == "flexlayout") {
        multiComponent.className = ".flexLayout";
        multiComponent.type = "FlexLayout";
    }
    if (sketchComponent.type == "scrollview") {
        multiComponent.className = ".scrollView";
        multiComponent.type = "ScrollView";

        //multiComponent.userProps.flexProps.flexDirection = "ROW";
        multiComponent.userProps.autoSizeEnabled = true;
        multiComponent.props.autoSizeEnabled = true;
    }
    var color = smartfaceUtil.colorMap(sketchComponent.property.color);
    multiComponent.userProps.backgroundColor = color;
    smartfaceUtil.frameSetter(multiComponent, sketchComponent);
    smartfaceUtil.borderSetter(multiComponent, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(multiComponent, sketchComponent);
    //--------------------------------//
    multiComponent.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(multiComponent, sketchComponent);

    return multiComponent;
}
/*
 * GridView and ListView map function
 */
function createGridListView(sketchComponent) {
    var grid_list_view = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(grid_list_view, sketchComponent);
    smartfaceUtil.addChild(grid_list_view, sketchComponent);

    var color = smartfaceUtil.colorMap(sketchComponent.property.color);
    grid_list_view.userProps.backgroundColor = color;

    grid_list_view.userProps.flexProps.positionType = "ABSOLUTE";


    if (sketchComponent.type == "gridview") { // GridView settings
        grid_list_view.className = ".gridView";
        grid_list_view.type = "GridView";
    }

    if (sketchComponent.type == "gridviewitem") { // GridViewItem settings 
        grid_list_view.className = ".gridViewItem";
        grid_list_view.type = "GridViewItem";
        grid_list_view.userProps.flexProps.positionType = "RELATIVE";
    }

    if (sketchComponent.type == "listview") { // ListView settings
        grid_list_view.className = ".listView";
        grid_list_view.type = "ListView";
    }

    if (sketchComponent.type == "listviewitem") { // ListViewItem settings
        grid_list_view.className = ".listViewItem";
        grid_list_view.type = "ListViewItem";
        grid_list_view.userProps.flexProps.positionType = "RELATIVE";
    }

    //-------------------------------//

    smartfaceUtil.frameSetter(grid_list_view, sketchComponent);
    smartfaceUtil.borderSetter(grid_list_view, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(grid_list_view, sketchComponent);
    //--------------------------------//

    smartfaceUtil.setSomeProprties(grid_list_view, sketchComponent);


    return grid_list_view;
}


function createSwitch(sketchComponent) {
    var switchComp = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(switchComp, sketchComponent);
    //--------------------------------//
    switchComp.className = ".switch";
    switchComp.type = "Switch";

    switchComp.userProps.thumbOnColor = smartfaceUtil.colorMap(sketchComponent.thumbColor);
    switchComp.userProps.toggleOnColor = smartfaceUtil.colorMap(sketchComponent.toggleOnColor);

    smartfaceUtil.frameSetter(switchComp, sketchComponent);

    //--------------------------------//
    switchComp.userProps.toggle = false;
    switchComp.props.toggle = false;
    switchComp.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(switchComp, sketchComponent);

    return switchComp;
}

/**
 *  MapView , VideoView , WebView 
 *  use that function 
 */
function createMapVideoWebView(sketchComponent) {
    var mvw_view = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(mvw_view, sketchComponent);
    //----------------------------------//

    if (sketchComponent.type == "mapview") { // For MapView
        mvw_view.className = ".mapView";
        mvw_view.type = "MapView";
    }

    if (sketchComponent.type == "videoview") { // For VideoView
        mvw_view.className = ".videoView";
        mvw_view.type = "VideoView";
    }

    if (sketchComponent.type == "webview") { // For WebView
        mvw_view.className = ".webView";
        mvw_view.type = "WebView";
    }

    smartfaceUtil.frameSetter(mvw_view, sketchComponent);
    smartfaceUtil.borderSetter(mvw_view, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(mvw_view, sketchComponent);
    //--------------------------------//
    mvw_view.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(mvw_view, sketchComponent);

    return mvw_view;
}

function createTextView(sketchComponent) {
    var text_view = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(text_view, sketchComponent);

    text_view.className = ".textView";
    text_view.type = "TextView";

    var color = smartfaceUtil.colorMap(sketchComponent.property.color);
    text_view.userProps.backgroundColor = color;
    var textArr = String(sketchComponent.text.text).split(" ");
    var text = "";
    for (var i = 0; i < textArr.length; i++) {
        text += textArr[i];
        if ((i + 1) != textArr.length)
            text += ' ';
    }

    text_view.props.text = text;
    text_view.userProps.text = text;
    text_view.userProps.html = smartfaceUtil.sketchHTMLConverter(sketchComponent.html);
    //---------------------------------//
    smartfaceUtil.frameSetter(text_view, sketchComponent);
    smartfaceUtil.borderSetter(text_view, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(text_view, sketchComponent);
    //---------------------------------//
    text_view.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(text_view, sketchComponent);

    return text_view;
}


function createSlider(sketchComponent) {
    var slider = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(slider, sketchComponent);
    slider.className = ".slider";
    slider.type = "Slider";

    slider.userProps.backgroundColor = smartfaceUtil.colorMap(sketchComponent.property.color);
    slider.userProps.maxTrackColor = smartfaceUtil.colorMap(sketchComponent.maxTrackColor);
    slider.userProps.minTrackColor = smartfaceUtil.colorMap(sketchComponent.minTrackColor);
    slider.userProps.thumbColor = smartfaceUtil.colorMap(sketchComponent.thumbColor);

    //---------------------------------//
    smartfaceUtil.frameSetter(slider, sketchComponent);
    smartfaceUtil.borderSetter(slider, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(slider, sketchComponent);
    //---------------------------------//
    slider.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(slider, sketchComponent);

    return slider;
}


function createSearchView(sketchComponent) {
    var searchView = smartfaceUtil.createComponent();

    smartfaceUtil.defaultPgxSetter(searchView, sketchComponent);

    //---------------------------------//
    searchView.className = ".searchView";
    searchView.type = "SearchView";

    searchView.userProps.hint = sketchComponent.text.text;
    searchView.userProps.hintTextColor = smartfaceUtil.colorMap(sketchComponent.text.color);

    smartfaceUtil.frameSetter(searchView, sketchComponent);
    smartfaceUtil.borderSetter(searchView, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(searchView, sketchComponent);
    //----------------------------------//
    searchView.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(searchView, sketchComponent);

    return searchView;
}

function createImageView(sketchComponent) {
    var imageView = smartfaceUtil.createComponent();

    smartfaceUtil.defaultPgxSetter(imageView, sketchComponent);

    //------------------------------//
    imageView.className = ".imageView";
    imageView.type = "ImageView";

    imageView.userProps.image = sketchComponent.image;
    smartfaceUtil.frameSetter(imageView, sketchComponent);
    smartfaceUtil.borderSetter(imageView, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(imageView, sketchComponent);
    //------------------------------//
    imageView.userProps.flexProps.positionType = "ABSOLUTE";
    imageView.userProps.imageFillType = "ASPECTFIT";
    smartfaceUtil.setSomeProprties(imageView, sketchComponent);

    return imageView;
}

function createTextBoxArea(sketchComponent) {
    var textBox_Area = smartfaceUtil.createComponent();

    smartfaceUtil.defaultPgxSetter(textBox_Area, sketchComponent);

    //-------------------------------//
    textBox_Area.props.text = sketchComponent.text.text;
    var color = smartfaceUtil.colorMap(sketchComponent.property.color);
    textBox_Area.userProps.backgroundColor = color;

    smartfaceUtil.textSetter(textBox_Area, sketchComponent);
    smartfaceUtil.frameSetter(textBox_Area, sketchComponent);
    smartfaceUtil.borderSetter(textBox_Area, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(textBox_Area, sketchComponent);

    //-------------------------------//
    textBox_Area.userProps.flexProps.positionType = "ABSOLUTE";

    if (sketchComponent.type == "textbox") {
        textBox_Area.className = ".textBox";
        textBox_Area.type = "TextBox";
    }

    if (sketchComponent.type == "textarea") {
        textBox_Area.className = ".textArea";
        textBox_Area.type = "TextArea";
    }
    smartfaceUtil.setSomeProprties(textBox_Area, sketchComponent);

    return textBox_Area;
}

function createLabel(sketchComponent) {

    var label = smartfaceUtil.createComponent();

    smartfaceUtil.defaultPgxSetter(label, sketchComponent);

    //-------------------------//
    label.className = ".label";
    label.type = "Label";

    label.props.text = sketchComponent.text.text;

    var color = smartfaceUtil.colorMap(sketchComponent.property.color);
    label.userProps.backgroundColor = color;

    smartfaceUtil.textSetter(label, sketchComponent);
    smartfaceUtil.frameSetter(label, sketchComponent);
    smartfaceUtil.borderSetter(label, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(label, sketchComponent);
    //-------------------------//
    label.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(label, sketchComponent);
    return label;
}

function createButton(sketchComponent) {
    var button = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(button, sketchComponent);
    button.className = ".button";
    button.type = "Button";

    button.props.name = sketchComponent.name;
    button.props.text = sketchComponent.text.text;
    var color = smartfaceUtil.colorMap(sketchComponent.property.color);
    button.userProps.backgroundColor = color;

    smartfaceUtil.textSetter(button, sketchComponent);
    smartfaceUtil.frameSetter(button, sketchComponent);
    smartfaceUtil.borderSetter(button, sketchComponent); // Border set 
    smartfaceUtil.shadowSetter(button, sketchComponent);
    //----- The Default Button Settigs --------//
    button.props.usePageVariable = false;
    button.userProps.usePageVariable = false;
    button.userProps.flexProps.positionType = "ABSOLUTE";
    //----------------------------------------//

    smartfaceUtil.setSomeProprties(button, sketchComponent);

    return button;
}


function createPage(sketchComponent) {
    var page = smartfaceUtil.createComponent();
    // Create default pgx structure
    var pgxContainer = {
        components: []
    }
    page.className = ".page";
    page.type = "Page";
    smartfaceUtil.defaultPgxSetter(page, sketchComponent);

    //---- Crete & Add ( StatusBar & HeaderBar ) ----//
    var statusBar = createStatusBar(page);
    var headerBar = createHeaderBar(page);
    page.props.children.push(statusBar.id);
    page.props.children.push(headerBar.id);
    //-----------------------------------------------//

    smartfaceUtil.addChild(page, sketchComponent);
    var color = smartfaceUtil.colorMap(sketchComponent.property.color);

    page.userProps.backgroundColor = color;

    //-------- The default page settings ------------//
    page.initialized = false;
    page.version = "6.9.0";
    page.props.parent = null;
    page.props.isRemovable = true;
    page.userProps.orientation = "AUTO";
    page.props.orientation = "AUTO";
    //----------------------------------------------//
    if (sketchComponent.headerBar > 0) { // if header bar exist recalculate the objects location
        // sketch => header 0+y , smartface => header = 0		
        smartfaceUtil.recalculateLocation(sketchComponent, sketchComponent.headerBar);
    } else {
        statusBar.userProps.visible = false;
        headerBar.userProps.visible = false;
    }

    pgxContainer.components.push(page);
    pgxContainer.components.push(statusBar);
    pgxContainer.components.push(headerBar);

    return pgxContainer;
}

function createHeaderBar(page) {
    var headerBar = smartfaceUtil.createComponent();

    headerBar.className = ".headerBar";
    headerBar.id = smartfaceUtil.guid();
    headerBar.type = "HeaderBar";
    headerBar.props.isRemovable = false;
    headerBar.props.name = "headerBar";
    headerBar.props.parent = page.id;
    var title = page.props.name;
    headerBar.props.title = title;
    headerBar.userProps.title = title;
    return headerBar;
}


function createStatusBar(page) {
    var statusBar = smartfaceUtil.createComponent();

    statusBar.className = ".statusBar";
    statusBar.id = smartfaceUtil.guid();
    statusBar.type = "StatusBar";
    statusBar.props.isRemovable = false;
    statusBar.props.name = "statusBar";
    statusBar.props.parent = page.id;

    return statusBar;
}

module.exports = {
    createPage,
    createLabel,
    createSlider,
    createSwitch,
    createButton,
    createTextView,
    createImageView,
    createSearchView,
    createTextBoxArea,
    createGridListView,
    createMultiComponent,
    createMapVideoWebView,
}