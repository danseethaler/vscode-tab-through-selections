const vscode = require('vscode')
const controller = require('./controller')

function activate(context) {
  let commands = [
    'start',
    'next',
    'previous',
    'reset',
    'backOffSelection',
    'finalSelection',
  ]

  commands.forEach(command => {
    let disposable = vscode.commands.registerTextEditorCommand(
      'extension.' + command,
      editor => controller[command](editor)
    )
    context.subscriptions.push(disposable)
  })
}
exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate
