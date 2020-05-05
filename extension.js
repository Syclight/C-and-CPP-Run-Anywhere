// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const finishedStr = "C/C++ RunAnywhere: processing finished";
	function paramStr(param){
		const headStr = "gcc ";

		const srcName = vscode.window.activeTextEditor.document.fileName;
		let terminal = vscode.window.activeTerminal;
		if (terminal == undefined){
			terminal = vscode.window.createTerminal();
		}
		terminal.sendText('\n');

		let tragName = (srcName.split("."))[0];

		let index = srcName.lastIndexOf("\\");
		let path = srcName.substr(0, index + 1);
		terminal.sendText("cd " + path);

		let commandStr = "";
		

		switch(param){
			case 0:
				commandStr = headStr + "-o " + tragName + " " + srcName;
				break;
			case 1:
				commandStr = headStr + "-s " + srcName;
				break;
			case 2:
				commandStr = headStr + "-S " + srcName;
				break;
		}
		terminal.sendText(commandStr);

		switch(param){
			case 0:
				terminal.sendText(tragName + '.exe');
				break;
			case 1:
				break;
			case 2:
				break;
		}

		vscode.window.showInformationMessage(finishedStr);

	}

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "c-cpp-run-anywhere" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('c-cpp-run-anywhere.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const helloWorldStr = "Welcome use c/c++ run anywhere!"
		vscode.window.showInformationMessage(helloWorldStr);

	});

	let runAnyWhere0 = vscode.commands.registerCommand('c-cpp-run-anywhere.Run', function () {
		paramStr(0);
	});

	let runAnyWhere1 = vscode.commands.registerCommand('c-cpp-run-anywhere.Run_s', function () {
		paramStr(1);
	});

	let runAnyWhere2 = vscode.commands.registerCommand('c-cpp-run-anywhere.Run_CS', function () {
		paramStr(2);
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(runAnyWhere0);
	context.subscriptions.push(runAnyWhere1);
	context.subscriptions.push(runAnyWhere2);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
