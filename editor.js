
function createEditor(editorId) {
	var editor = ace.edit(editorId);
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setMode("ace/mode/scala");
    //editor.getValue(); // or session.getValue

    //var aceRange = ace.require('ace/range').Range;
    //editor.getSession().addMarker(new aceRange(1,0,3,3), "ace_selection", "text", "true")

    return editor
}

function highlightLines(editor, lines) {
	var aceRange = ace.require('ace/range').Range;
	for (i in lines) {
		editor.getSession().addMarker(new aceRange(lines[i],0,lines[i],10), "ace_selection", "text", "true")
	}
}