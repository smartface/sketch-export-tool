/*
 * The Sketchapp file design map to Smartface file design(pgx,cpx)
 * 
 */

import {
    exportImage,
    sketchParseAll,
    sketchParseOnePage,
    sketchParseLibrary
} from '../sketch/sketchParser';

import {
    smartfaceMapper
} from '../smartface/smartfaceMapper';

const outputUtil = require('../utils/outputUtil');
const UI = require('sketch/ui')
const sketch = require('sketch');

function mapAllPages(context) {
    let currentPath = openDialog();
    if (currentPath != null) {
        context.document.showMessage("🙌 MAPPING SMARTFACE 🙌")
        let folders = outputUtil.creat_output_folders(currentPath, context.document.fileURL().path());
        let pagesTree = sketchParseAll(context, folders);
        if (pagesTree.length !== 0) {
            context.document.showMessage("🙌 MAPPING SMARTFACE 🙌")
            let smartfaceData = smartfaceMapper(pagesTree);
            if (smartfaceData.pgx.length !== 0) // Array of pages
                outputUtil.write_datas(folders, smartfaceData);
            else
                exit(2);
        } else
            exit(1);
    }
}

function openDialog() {

    var chooseFile = NSOpenPanel.openPanel();
    chooseFile.setMessage("Choose Export Directory");
    chooseFile.setCanChooseDirectories(true);
    chooseFile.setCanChooseFiles(false); // file choser
    if (chooseFile.runModal() == NSOKButton)
        return chooseFile.URL().path();
}

function mapOnePage(context, page, folders, type) {
    context.document.showMessage("🙌 MAPPING SMARTFACE 🙌")
    var pagesTree = sketchParseOnePage(context, folders, page, type);
    if (pagesTree.length !== 0) {
        var smartfaceData = smartfaceMapper(pagesTree);
        context.document.showMessage("🙌 MAPPING SMARTFACE 🙌")
        if (smartfaceData.pgx.length !== 0) // Array of pages
            if (type[0] == "page")
                outputUtil.write_datas(folders, smartfaceData);
            else
                outputUtil.writeLibrary(folders, smartfaceData);
        else
            exit(2);
    } else
        exit(1);
}


function exportButton(context, objectID, exptype) {
    //var currentPath = context.document.fileURL().path();
    let currentPath = openDialog();
    if (currentPath != null) {
        let folders = outputUtil.creat_output_folders(currentPath, context.document.fileURL().path());
        let layer = sketch.fromNative(context.document.selectedLayers().firstLayer());
        let type = [];
        if (exptype == "shape")
            exportImage(layer, folders);
        else if (exptype == "page") {
            type.push("page");
            mapOnePage(context, layer, folders, type);
        } else {
            type.push("library")
            mapOnePage(context, layer, folders, type);
        }
    }
}

function exit(type) {

    if (type == 1) { // Null Pages Error
        UI.message("Error " + ": The Sketch Parser Tree is Null");
    }
    if (type == 2) {
        UI.message("Error " + " The Mapper cannot map properly ! \nCheck your design please");
    }
}

module.exports = {
    mapAllPages,
    exportButton,
}