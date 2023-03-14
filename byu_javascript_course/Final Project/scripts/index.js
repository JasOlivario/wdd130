getEmployeeData()
function searchEmployee(e){
let searchVal = document.getElementById('searchInput').value;
getEmployeeData(searchVal)
}

function getEmployeeData(search = ""){
let url = 'https://run.mocky.io/v3/55964f63-b7ad-4e52-93c0-10c769fec17a'

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      var jsondata = JSON.parse(xhr.responseText);
      var filterData = jsondata[Object.keys(jsondata)];

      filterData = filterData.filter((key)=>{
        return (key.firstname.toLowerCase() + " " + key.lastname.toLowerCase()).includes(search.toLowerCase()) 
        || key.email.toLowerCase().includes(search.toLowerCase()) 
        ||  key.phone.includes(search) 
        ||  key.address.toLowerCase().includes(search.toLowerCase())
      })

      let tablerow = "";
      filterData.forEach((value) => {
        tablerow += `<tr>
            <td>${value.id}</td>
            <td>${value.firstname}</td>
            <td>${value.lastname}</td>
            <td>${value.email}</td>
            <td>${value.phone}</td>
            <td>${value.address}</td>
          </tr>`
      });
      document.getElementById('result').innerHTML = tablerow;
      
    }
    else {
      error(xhr);
    }
  }
};
xhr.open('GET', url, true);
xhr.send();
}