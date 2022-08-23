const vscode = require('vscode');
const fs = require('fs');

// Transfer a file from mdn-content repo to translated-content repo
const transferSame = async (absoluteCurrentFilePath) => {
	// Path to the content root
	const configuredSourcePath = vscode.workspace.getConfiguration().get('liondocs.pathToContent');

	// If command is sent from another place (not the configured content in settings) return error
	if (!(absoluteCurrentFilePath.toLowerCase().startsWith(configuredSourcePath.toLowerCase()))) {
		return { 
			success: false,
			message: "File does not belong to original content repository (specified in extension configuration)"
		}
	}

	// Path to the translated-content root
	const configuredTranslatedPath = vscode.workspace.getConfiguration().get('liondocs.pathToTranslatedContent');
	// Configured language code ("de", "es", "fr", "ja", etc.)
	const configuredLanguageCode = vscode.workspace.getConfiguration().get('liondocs.languageCode');
	
	const relativePathToFile = absoluteCurrentFilePath.toLowerCase().replace(configuredSourcePath.toLowerCase(), '');
	const relativePathToTranslatedFile = relativePathToFile.replace('\\files\\en-us', `\\files\\${configuredLanguageCode}`);
	const absolutePathToTranslatedFile = configuredTranslatedPath + relativePathToTranslatedFile

	fs.copyFile(absoluteCurrentFilePath, absolutePathToTranslatedFile, (err) => {
		if (err) {
			return { 
				success: false,
				message: err
			}
		}
	});

	return { 
		success: true,
		message: `File successfully transferred to ${absolutePathToTranslatedFile}`
	}
}

module.exports = {
    transferSame
}