
var allText = ""
$.ajax({
  url : "../../test_automation_log.txt",
  type : "get",
  async: false,
  success : function(userStatus) {
    allText = userStatus
  },
  error: function() {
     connectionError();
  }
});

allText = allText.split("\n")
// console.log(allText[0])
// console.log(allText[0].split("(")[2].split(")")[0])
var PASSED = []
var FAILED = []
var branch = []
var all_clear_data =[]

for(var i = 0; i<allText.length;i++){
  if(allText[i].includes("_wo_license)")){
    var mySubString = allText[i].substring(
      allText[i].indexOf("NC_Centos") , 
      allText[i].lastIndexOf("_wo_license")
    );
    branch.push(mySubString)
  }

  if(allText[i].includes("PASSED")){
    PASSED.push(allText[i])
    all_clear_data.push(allText[i])
  }else if(allText[i].includes("FAILED")){
    FAILED.push(allText[i])
    all_clear_data.push(allText[i])
  }
}
// console.log(PASSED.length)
// console.log(FAILED.length)

branch_last = [... new Set(branch)]

document.getElementById("total_test").innerHTML = all_clear_data.length
document.getElementById("total_passed").innerHTML = PASSED.length
document.getElementById("total_failed").innerHTML = FAILED.length

var mySubString = all_clear_data[all_clear_data.length - 1].substring(
    all_clear_data[all_clear_data.length - 1].indexOf("<") + 1, 
    all_clear_data[all_clear_data.length - 1].lastIndexOf(">")
);

document.getElementById("last_date_test").innerHTML = mySubString


var branch_list = document.getElementById("branch_list")

for(var i = 0;i<branch_last.length;i++){
  branch_list.innerHTML += '<a class="dropdown-item" href="#" onclick="Details_Branch(this)" id ="'+branch_last[i]+'">'+branch_last[i]+'</a>'
}

var data_chart_failed = ""
var data_chart_passed = ""

function Details_Branch(d){
    document.getElementById("bar_title_1").innerHTML = d.id
    var tmp_fail = []
    var tmp_pass = []
    for (var i = 0;i<all_clear_data.length;i++){
        // console.log(all_clear_data[i])
        if(all_clear_data[i].includes(d.id) && all_clear_data[i].includes("PASSED")){
            tmp_pass.push(all_clear_data[i])
        }
        else if(all_clear_data[i].includes(d.id) && all_clear_data[i].includes("FAILED")){
            tmp_fail.push(all_clear_data[i])
        }
    }
    data_chart_failed = tmp_fail.length 
    data_chart_passed = tmp_pass.length
    console.log(data_chart_passed)
    console.log(data_chart_failed)
    update_chart(data_chart_passed,data_chart_failed,(data_chart_passed+data_chart_failed))
}
