/* ------------ Working with variables */
// Since the documentation sucks there's a lot of trial and error when trying
// to figure out how stuff works. This one is about handling variables in scripts.
//
log("Managing variables ")
const varName = "TestVar3"

// -----------------------------------------------------
async function updateVar(id) {
  try {
    var result = await Homey.logic.updateVariable({id: id, variable:{value:"Hej då"}})
    log(result);
  }
  catch(error) {log('Failed: Updating variable ' + varName);log(error)};
}
// -----------------------------------------------------

let vid = null
try {
  var result = await Homey.logic.getVariables();
  Object.keys(result).forEach(function(key) {
    log(result[key].name + '(' + result[key].id + ') = ' + result[key].value + " : " + result[key].type)
    if (result[key].name == varName) vid = result[key].id
  })
  if (vid == null) {
    try {
      var newVar = await Homey.logic.createVariable({variable: {name:varName, type : "string", value: "hej"}})
      log("Created variable: "); log(newVar);
      vid = newVar.id
      log("1. vid = " + vid)
    }
    catch(error) { log('Failed: Creating variable ' + varName)};
  }
  log("2. vid = " + vid)
  updateVar(vid)
  var res = await Homey.logic.getVariable({id:vid})
  log("Variable "+ varName + " has value "+ res.value + " and is of type "+ res.type)
}
catch(error){ log('Failed: Getting variables: '); log(error)};

// What is global? These do not end up among the variables.
// Are these accessible between scripts?
//
global.set("AGlobal", 12)
log(global.keys())
log(global[0])

