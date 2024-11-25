import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "toggle-jest-skip" is now active!');

	const disposable = vscode.commands.registerCommand('toggle-jest-skip.toggleSkip', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;
		const selection = editor.selection;
		const line = document.lineAt(selection.active.line);
		const lineText = line.text;

		let newText: string;
		if (lineText.includes('.skip')) {
			newText = lineText.replace('.skip', '');
		} else {
			const regex = /(it|describe|test)(\s*\()/;
			newText = lineText.replace(regex, '$1.skip$2');
		}

		editor.edit(editBuilder => {
			editBuilder.replace(line.range, newText);
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
