const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let finishedStr = "processing finished";
	const helloWorldStr = "Welcome use C/C++ RunAnywhere!"

	function paramStr(param) {
		let headStr = "gcc ";

		const srcName = vscode.window.activeTextEditor.document.fileName;
		let terminal = vscode.window.activeTerminal;
		if (terminal == undefined) {
			terminal = vscode.window.createTerminal();
		}

		terminal.sendText('\nclear');

		let strs = srcName.split(".");
		let tragName = strs[0];
		let baseName = path.basename(tragName);

		let exeFileName = tragName + '.exe';
		let SFileName = tragName + '.s';

		let type = strs[1];
		let sourceExt = '.c';

		if (type === "cpp") {
			headStr = "g++ ";
			sourceExt = '.cpp';
		}

		let index = srcName.lastIndexOf(path.sep);
		let fPath = srcName.substr(0, index + 1);
		terminal.sendText("cd " + fPath);

		let commandStr = "";


		switch (param) {
			case 0:
				try {
					if (fs.existsSync(exeFileName)) { fs.unlinkSync(exeFileName) }
				} catch (error) {
					vscode.window.showErrorMessage('错误：文件已经打开，无法覆盖编译，请关闭文件后再试。');
					return;
				}
				commandStr = headStr + "-o " + baseName + " " + baseName + sourceExt;
				break;
			case 1:
				commandStr = headStr + "-s " + srcName;
				break;
			case 2:
				try {
					if (fs.existsSync(SFileName)) { fs.unlinkSync(SFileName) }
				} catch (error) {
					vscode.window.showErrorMessage('错误：文件已经打开，无法覆盖编译，请关闭文件后再试。');
					return;
				}
				commandStr = headStr + "-S " + srcName;
				break;
		}
		terminal.sendText(commandStr);

		
		switch (param) {
			case 0:
				terminal.sendText('start ' + exeFileName);
				break;
			case 1:
				break;
			case 2:
				break;
		}

		vscode.window.showInformationMessage(finishedStr);

	}


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ccpprunanywhere.hello', function () {
		vscode.window.showInformationMessage(helloWorldStr);

	});

	let runAnyWhere0 = vscode.commands.registerCommand('ccpprunanywhere.run', function () {
		paramStr(0);
	});

	let runAnyWhere1 = vscode.commands.registerCommand('ccpprunanywhere.run_s', function () {
		paramStr(1);
	});

	let runAnyWhere2 = vscode.commands.registerCommand('ccpprunanywhere.comp_s', function () {
		paramStr(2);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(runAnyWhere0);
	context.subscriptions.push(runAnyWhere1);
	context.subscriptions.push(runAnyWhere2);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
