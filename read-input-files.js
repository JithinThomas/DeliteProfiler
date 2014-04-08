
var editor = null

function handleFileSelect(evt) {
    var appSourceFile = evt.target.files[0]; // FileList object
  	var reader = new FileReader();

  	reader.onload = (function() {
    	return function(e) {
      		editor.setValue(e.target.result)
    	};
  	})();

  	reader.readAsText(appSourceFile);
    viewState.appSourceFileName = appSourceFile.name
}

function addAppSourceFileHandler(inputButtonId, editorDiv) {
	editor = editorDiv
	document.getElementById(inputButtonId).addEventListener('change', handleFileSelect, false);
}