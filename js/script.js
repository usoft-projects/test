
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
var all_clear_data = []

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
var branch_list_2 = document.getElementById("branch_list_2")
for(var i = 0;i<branch_last.length;i++){
  branch_list.innerHTML += '<a class="dropdown-item" href="#" onclick="Details_Branch(this)" id ="'+branch_last[i]+'">'+branch_last[i]+'</a>'
  branch_list_2.innerHTML += '<a class="dropdown-item" href="#" onclick="Details_Branch_2(this)" id ="'+branch_last[i]+'">'+branch_last[i]+'</a>'
}


var amount_1 = ""
function Details_Branch(d){
    var data_chart_failed = ""
    var data_chart_passed = ""
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
    document.getElementById("information_1_pass").innerHTML = "Passed: " +data_chart_passed
    document.getElementById("information_1_fail").innerHTML = "Failed: " +data_chart_failed
    if (data_chart_failed > data_chart_passed){
        document.getElementById("information_1_status").innerHTML = '<i class="fas fa-sad-tear" style="color: #e74a3b;"></i>'
    }else{
        document.getElementById("information_1_status").innerHTML = '<i class="fas fa-smile" style="color: #36b9cc;"></i>'
    }
    amount_1 = (100 * data_chart_passed) / (data_chart_passed + data_chart_failed)
    console.log(amount_1)
}

var amount_2 = ""

function Details_Branch_2(d){
    var data_chart_failed = ""
    var data_chart_passed = ""
    document.getElementById("bar_title_2").innerHTML = d.id
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
    update_chart_2(data_chart_passed,data_chart_failed,(data_chart_passed+data_chart_failed))
    document.getElementById("information_2_pass").innerHTML = "Passed: " +data_chart_passed
    document.getElementById("information_2_fail").innerHTML = "Failed: " +data_chart_failed
    if (data_chart_failed > data_chart_passed){
        document.getElementById("information_2_status").innerHTML = '<i class="fas fa-sad-tear" style="color: #e74a3b;"></i>'
    }else{
        document.getElementById("information_2_status").innerHTML = '<i class="fas fa-smile" style="color: #36b9cc;"></i>'
    }
    amount_2 = (100 * data_chart_passed) / (data_chart_passed + data_chart_failed)
    console.log(amount_2)
    last_status(amount_1, amount_2)
}
function last_status(amount_1, amount_2){
    var status = document.getElementById("last_status")
    if (amount_1 > amount_2){
        status.innerHTML = '<a class="btn btn-info btn-sm" href="#!" ><i class="fas fa-smile"></i>&emsp;Good</a>'
    }else{
        status.innerHTML = '<a class="btn btn-danger btn-sm" href="#!" ><i class="fas fa-sad-tear"></i>&emsp;Bad</a>'
    }
}