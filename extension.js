// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	console.log('LionDocs activated!');
	// vscode.workspace.getConfiguration().get('liondocs.pathToContent') // Get configurations

	// Activated when Transfer samefile is called
	context.subscriptions.push(vscode.commands.registerCommand('liondocs.transfersame', () => {
		vscode.window.showInformationMessage('Same file has been transferred')
	}));

	// Activated when Transfer file with SHA is called
	context.subscriptions.push(vscode.commands.registerCommand('liondocs.transfersha', () => {
		vscode.window.showInformationMessage('File with SHA transferred')
	}));

	// Activated when Get SHA and Insert is called
	context.subscriptions.push(vscode.commands.registerCommand('liondocs.getshainsert', () => {
		vscode.window.showInformationMessage('Insert SHA')
	}));

	// Activated when Get SHA and Copy to Clipboard is called
	context.subscriptions.push(vscode.commands.registerCommand('liondocs.getshatoclip', () => {
		vscode.window.showInformationMessage('To clipboard')
	}));
}

// this method is called when your extension is deactivated
function deactivate() {
	console.log('LionDocs deactivated!'); // just for debug
}

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
}
