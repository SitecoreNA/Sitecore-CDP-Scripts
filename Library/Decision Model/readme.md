# How to develop Decision Model Programmables Locally

Explained here is how to develop and test Sitecore Personalize Decision Model (or real-time audience filter) Javascript code locally in an IDE.


# Prerequisites

* Node 
* Visual Studio Code 

## How to

Use the file local-dm-script as a template to get started.
![enter image description here](https://i.ibb.co/ch8yCFT/Screenshot-2022-11-23-at-09-50-21.png)

## The guest JSON file

Enable debug mode in your Sitecore CDP/P application. (Under Your name -> feature flags setting).

Copy any Guest JSON into the guest.json file or load multiple guest JSON files and update the local-dm-script.js file as required.

![enter image description here](https://i.ibb.co/ww8dG5Y/Untitled-design.png)

## Visual Studio Code  snippets

Snippets allow you to auto complete a function quickly in VSCode.

The dm-pro.code-snippets file at the project base folder inside .vscode folder is the configuration of all the snippets for VSCode.

The functions are maintained in Library/Decision Model/Programmable Library.

The dm-pro.code-snippets file needs to be manually updated to reflect changes in the Programmable Library.

Use the VSCode [Easy Snippet Maker](https://marketplace.visualstudio.com/items?itemName=tariky.easy-snippet-maker) extension to make this quick and easy.


## Using the snippets

All of the snippets are prepended with bx_ 

So just type bx_ to preview all the snippets in VSCode

![enter image description here](https://i.ibb.co/Zx47Tbf/Screenshot-2022-11-23-at-09-58-09.png)
