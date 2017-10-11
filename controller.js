const vscode = require('vscode')

module.exports = {
  selects: [],
  editor: null,
  index: -1,
  start: function(editor) {
    // Reset all selects
    this.reset()

    // Turn on tab-through activation
    this.changeContext(true)

    this.editor = editor
    this.selects = this.editor.selections

    if (this.selects.length > 1) {
      this.next()
    } else {
      this.reset()
    }
  },
  next: function() {
    this.index++
    return this.select()
  },
  previous: function() {
    this.index--
    return this.select()
  },
  select: function() {
    // If we're still in a valid range
    if (this.selects[this.index]) {
      this.editor.selection = this.selects[this.index]
      return
    }
    // Otherwise reset
    this.reset()
  },
  reset: function() {
    this.changeContext(false)
    this.index = -1
    this.selects = []
  },
  changeContext: function(active) {
    vscode.commands.executeCommand(
      'setContext',
      'tabbingThroughSelections',
      active
    )
  },
  backOffSelection: function(editor) {
    // Remove the last selection
    const newSelections = editor.selections.slice(
      0,
      editor.selections.length - 1
    )
    editor.selections = newSelections
  },
  finalSelection: function(editor) {
    // Select only the last selection
    editor.selection = editor.selections.pop()
  },
}
