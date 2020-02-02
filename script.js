$(document).ready(onReady);

function onReady() {
    $('#submitEmployee').on('click', addEmployee);
    $('#employeeList').on('click', '.delete', removeEmployee);
}

// List of employees
let employeeList = [];

function addEmployee(event) {
    // this prevents the form from refreshing the page on submit
    event.preventDefault();
    let newEmployee = {
        firstName: $('#firstNameIn').val(),
        id: $('#idIn').val(),
        lastName: $('#lastNameIn').val(),
        title: $('#titleIn').val(),
        annualSalary: $('#annualSalaryIn').val(),
    }
    //put the employe in DOM
    employeeList.push(newEmployee);
    $('.employeeInput').val('');
    showEmployee();
}

//// Show all the employees on the DOM
function showEmployee() {
    let totalMonthyCost = 0; // Total monthly cost of employees
    let totalAnnualSalary = 0; // Total salary of employees
    let el = $('#employeeList');
    el.empty();
    for (let i = 0; i < employeeList.length; i++) {
        el.append(`
        <tr>
            <th>${employeeList[i].firstName}</th><th>${employeeList[i].lastName}</th><th>${employeeList[i].id}</th>
            <th>${employeeList[i].title}</th><th>$${employeeList[i].annualSalary}</th>
            <th><button class="btn btn-danger delete">Delete</button></th>
        </tr>`);

        // String.data('id', employeeList[i].employeeInfo);

        totalAnnualSalary += Number(employeeList[i].annualSalary);
    }
    totalMonthyCost = calcMonthlyCost(totalAnnualSalary, totalMonthyCost);
    $('#totalSalary').html('$' + totalMonthyCost.toFixed(2));
}
//remove employee from the DOM
function removeEmployee() {
    //button.parent().parent().remove();
    
    let employeeInfo = $(this).parent().siblings().text();
    let employeeInfoCheck = '';
    for (let i = 0; i < employeeList.length; i++) {
        employeeInfoCheck = employeeList[i].firstName +
        employeeList[i].lastName + employeeList[i].id +employeeList[i].title + employeeList[i].annualSalary;
        employeeInfo = employeeInfo.replace('$', '');
        if (employeeInfoCheck === employeeInfo) {
            employeeList.splice(i, 1);
            break;
        }
    }
    showEmployee();
}

function calcMonthlyCost(annualSalaryTotal, monthlyCostTotal) {
    monthlyCostTotal = annualSalaryTotal / 12;
    // monthlyCostTotal = monthlyCostTotal.toLocaleString(); 
    if (monthlyCostTotal > 20000) {
        $('#totalSalary').parent().addClass('red');
    }
    return monthlyCostTotal;
}

