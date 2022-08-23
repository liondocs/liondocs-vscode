// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const lionDocsFunctions = require('./ldfunctions');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	console.log('LionDocs activated!');

	// Activated when Transfer samefile is called
	context.subscriptions.push(vscode.commands.registerCommand('liondocs.transfersame', async () => {
		const configuredShowAlerts = vscode.workspace.getConfiguration().get('liondocs.showAlerts');
		const task = await lionDocsFunctions.transferSame(vscode.window.activeTextEditor?.document.uri.fsPath);
		if (task.success) {
			if (configuredShowAlerts) {
				vscode.window.showInformationMessage(task.message);
			}
		} else {
			vscode.window.showErrorMessage(task.message);
		}
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
	context.subscriptions.push(vscode.commands.registerCommand('liondocs.getshatoclip', async () => {
		const configuredShowAlerts = vscode.workspace.getConfiguration().get('liondocs.showAlerts');
		const task = await lionDocsFunctions.getShaToClipboard(vscode.window.activeTextEditor?.document.uri.fsPath);
		if (task.success) {
			if (configuredShowAlerts) {
				vscode.window.showInformationMessage(task.message, "Copied to clipboard!");
			}
		} else {
			vscode.window.showErrorMessage(task.message);
		}
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
