# Sketch Export Tool

A Sketch plugin that exports **Sketch** artboards into **Smartface** project

## Installation
- <a href="https://github.com/smartface/sketch-export-tool/raw/master/smartface.sketchplugin.zip" target="blank">Download</a> the latest release of the plugin
-   Unzip the **smartface.sketchplugin.zip** file 
-   Double-click on **smartface.sketchplugin** for setup

## Usage

- Double click your Sketch design file
- Go to the top menu
- Click *Plugins*
- Select *Smartface*

![  ](https://github.com/smartface/sketch-export-tool/blob/master/gifs/setObject.gif)

![  ](https://github.com/smartface/sketch-export-tool/blob/master/gifs/export.gif)

### After export operations
- Go to your [Smartface](https://cloud.smartface.io/) project 
- Upload exported contents to your workspace
- Select "Overwrite All" option 
- All componens will have **ABSOLUTE** positioning. Which means developer should
manually change all positionings to **RELATIVE** and should set flex properties
accordingly

![  ](https://github.com/smartface/sketch-export-tool/blob/master/gifs/afterExport.gif)

### NOTES
- Don't forget to change your folder visibility settings of your computer. 
sketch-export-tool will generate folders that are hidden such as **.ui**
