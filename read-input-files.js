
var editor = null

function handleFileSelect(evt) {
    var appSourceFile = evt.target.files[0]; // FileList object
  	var reader = new FileReader();

  	reader.onload = (function() {
    	return function(e) {
    	    //var span = document.createElement('span');

      		//span.innerHTML = e.target.result
      		//document.getElementById('list').insertBefore(span, null);
      		editor.setValue(e.target.result)
    	};
  	})();

  	reader.readAsText(appSourceFile);
}

function addAppSourceFileHandler(inputButtonId, editorDiv) {
	editor = editorDiv
	document.getElementById(inputButtonId).addEventListener('change', handleFileSelect, false);
}