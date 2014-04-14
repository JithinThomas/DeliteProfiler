
// ===========================
//  Read app source code file
// ===========================

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

// ===========================
//  Read DEG file
// ===========================

var degOps = {}

function readDegFile(evt) {
  var reader = new FileReader()
  reader.onload = (function() {
    return function(e) {
      console.log(e.target.result)
      degOps = JSON.parse(e.target.result).DEG.ops
    }
  })()

  reader.readAsText(evt.target.files[0])
}

function addDegFileHandler(inputButtonId) {
  document.getElementById(inputButtonId).addEventListener('change', readDegFile, false);
}

// =====================================================
// Read profilleData.js (the performance profile data)
// =====================================================

var profileData = {}
function readProfileDataFile(evt) {
  var reader = new FileReader()
  reader.onload = (function() {
    return function(e) {
      console.log(e.target.result)
      profileData = JSON.parse(e.target.result)
    }
  })()

  reader.readAsText(evt.target.files[0])
}

function addProfileDataFileHandler(inputButtonId) {
  document.getElementById(inputButtonId).addEventListener('change', readProfileDataFile, false);
}
