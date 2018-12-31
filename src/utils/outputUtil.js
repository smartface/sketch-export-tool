/**
 *  That file create a folders for outputs
 *  Write pgx,cpx
 *  create(use pgx information) scripts/ page1.js page2.js ...
 *  
 */
const fs = require('../services/fileservices/fileStream');
const UI = require('sketch/ui')
const sketch = require('sketch');
const fileManager = NSFileManager.defaultManager();
var names = [];

function creat_output_folders(currentPath, filePreName) {
    let projectName = String(filePreName).substring(String(filePreName).lastIndexOf("/") + 1, String(filePreName).lastIndexOf(".sketch"));
    //var output_directory = String(currentPath).substring(0, String(currentPath).lastIndexOf("/"));
    let outputDirectory = currentPath + "/" + projectName + "_Smarface";
    //if (fs.existsSync(outputDirectory)) // Remove directory
    //  fs.rmdirSync(outputDirectory)
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
        fs.mkdirSync(outputDirectory + "/.ui");
        fs.mkdirSync(outputDirectory + "/.ui/library");
        fs.mkdirSync(outputDirectory + "/images");
        //fs.mkdirSync(outputDirectory + "/fonts");
    }
    return {
        rootFolder: outputDirectory,
        pgxFolder: outputDirectory + "/.ui",
        cpxFolder: outputDirectory + "/.ui/library",
        imageFolder: outputDirectory + "/images",
        //fontsFolder: outputDirectory + "/fonts"
    };
}

function write_datas(folders, smartface_data) {

    for (var iter in smartface_data.pgx) {
        var filename = smartface_data.pgx[iter].components[0].props.name;
        write_file(folders.pgxFolder + "/" + filename + ".pgx", JSON.stringify(smartface_data.pgx[iter], null, '\t'));
    }
    writeLibrary(folders, smartface_data);
}

function writeLibrary(folders, smartface_data) {
    for (var iter in smartface_data.cpx) {
        var filename = folders.cpxFolder;
        filename += "/" + smartface_data.cpx[iter].components[0].props.name;
        write_file(filename + ".cpx", JSON.stringify(smartface_data.cpx[iter], null, '\t'));
    }
}


function write_file(output_file, data) {
    if (fs.existsSync(output_file))
        fs.rmdirSync(output_file)
    fs.appendFileSync(output_file, data);
}


function imageExport(sketch_component, imageFolder) {
    var imageName = sketch_component.name;
    if (!checkAlreadyExport(imageName, imageFolder)) {
        iosImageExport(sketch_component, imageFolder);
        andoidImageExport(sketch_component, imageFolder);
    }
}

function checkAlreadyExport(imageName, imageFolder) {
    var directory = imageFolder + "/Android" + "/drawable-mdpi/" + imageName + ".png";
    return fileManager.fileExistsAtPath(directory) || nameIsExist(imageName)
}

function nameIsExist(name) {
    for (var i = 0; i < names.length; i++) {
        if (names[i] == name)
            return true;
    }
    names.push(name);
    return false;
}

function andoidImageExport(sketch_component, imageFolder) {
    var imageName = sketch_component.name;
    var outdir = "/Android";
    var options = {
        scales: '1',
        formats: 'png',
        output: imageFolder + outdir + "/drawable-mdpi"
    };
    sketch.export(sketch_component, options);

    options = {
        scales: '1.5',
        output: imageFolder + outdir + "/drawable-hdpi"
    };
    sketch.export(sketch_component, options);


    fileManager.moveItemAtPath_toPath_error(options.output + "/" + imageName + "@1x.png",
        options.output + "/" + imageName + ".png", nil);

    options = {
        scales: '2',
        output: imageFolder + outdir + "/drawable-xhdpi"
    };
    sketch.export(sketch_component, options);
    fileManager.moveItemAtPath_toPath_error(options.output + "/" + imageName + "@2x.png",
        options.output + "/" + imageName + ".png", nil);

    options = {
        scales: '3',
        output: imageFolder + outdir + "/drawable-xxhdpi"
    };
    sketch.export(sketch_component, options);
    fileManager.moveItemAtPath_toPath_error(options.output + "/" + imageName + "@3x.png",
        options.output + "/" + imageName + ".png", nil);

    options = {
        scales: '4',
        output: imageFolder + outdir + "/drawable-xxxhdpi"
    };
    sketch.export(sketch_component, options);
    fileManager.moveItemAtPath_toPath_error(options.output + "/" + imageName + "@4x.png",
        options.output + "/" + imageName + ".png", nil);
}

function iosImageExport(sketch_component, imageFolder) {

    var imageName = sketch_component.name;
    var outdir = "/iOS/" + imageName + ".imageset";
    /// @x1 ///
    var options = {
        scales: '1',
        formats: 'png',
        output: imageFolder + outdir
    };
    sketch.export(sketch_component, options);
    /// @x2 ///
    options = {
        scales: '2',
        formats: 'png',
        output: imageFolder + outdir
    };
    sketch.export(sketch_component, options);

    /// @x3 ///
    options = {
        scales: '3',
        formats: 'png',
        output: imageFolder + outdir
    };
    sketch.export(sketch_component, options);
    var obj = {
        images: [],
        info: {
            version: 1,
            author: "smartface"
        }
    }
    var scales = ["", "@2x", "@3x"];
    scales.forEach((scale, i) => {
        obj.images.push({
            filename: `${imageName}${scale}.png`,
            scale: (i + 1) + "x",
            idiom: "universal"
        });
    })
    var data = JSON.stringify(obj, null, "\t");
    write_file(imageFolder + "/iOS/" + imageName + ".imageset" + "/Contents.json", data);
}

function exportAllFonts(fonts) {
    var fontLibs = [];
    var folderObject = NSFileManager.defaultManager();
    /*
    fontLibs.push(folderObject.contentsOfDirectoryAtPath("~/Library/Fonts/", nil));
    fontLibs.push(folderObject.contentsOfDirectoryAtPath("/Library/Fonts/", nil));
    fontLibs.push(folderObject.contentsOfDirectoryAtPath("/Network/Library/Fonts/", nil));
    fontLibs.push(folderObject.contentsOfDirectoryAtPath("/System/Library/Fonts/", nil));
    fontLibs.push(folderObject.contentsOfDirectoryAtPath("/System Folder/Fonts/", nil));

    /*
    var isDir = MOPointer.alloc().initWithValue_(false);
    var fileExists = NSFileManager.defaultManager().fileExistsAtPath_isDirectory('/Users/Musk/tesla.gif', isDir);
    log(fileExists);
    log(isDir.value());
    if (fileExists && isDir.value() > 0) {
        log('it\'s a directory');
    }

    folderObject.copyItemAtPath_toPath_error(fromPath, toPath, nil);
    */
    log(folderObject.fileExistsAtPath_isDirectory('/System/Library/Fonts/', MOPointer.alloc().initWithValue_(false)))
    log(folderObject.contentsOfDirectoryAtPath('/System/Library/Fonts/', nil))
}

function exit(message) {
    UI.message("Erorr " + " \"" + message + "\" is not a valid directory !!");
}

module.exports = {
    write_file,
    imageExport,
    write_datas,
    writeLibrary,
    exportAllFonts,
    creat_output_folders,
}