
// ==============================
//  Read app source code file(s)
// ==============================

var editor = null
var fileNameToFile = {}
var sourceFileReader = new FileReader()
sourceFileReader.onload = (function() {
  return function(e) {
      editor.setValue(e.target.result, -1)
  };
})();

function getFiles(evt) {
  var files = evt.target.files
  var numFiles = files.length
  for (var i = 0; i < numFiles; i++) {
    var file = files[i]
    fileNameToFile[file.name] = file
  }
}

function addAppSourceFileHandler(inputButtonId) {
  document.getElementById(inputButtonId).addEventListener('change', getFiles, false);
}

function readFile(sourceFile) {
  sourceFileReader.readAsText(fileNameToFile[sourceFile])
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