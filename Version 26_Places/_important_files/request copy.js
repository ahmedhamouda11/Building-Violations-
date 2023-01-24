let name_form         = document.getElementById('name_form');
let id_form           = document.getElementById('id_form');
let mail_form         = document.getElementById('mail_form');
let gender_form       = document.getElementById('gender_form')
let pass_form         = document.getElementById('pass_form');
let governorate_form  = document.getElementById('governorate_form');
let section_form      = document.getElementById('section_form');
let area_form         = document.getElementById('area_form');

let borders_north     = document.getElementById('borders_north');
let borders_west      = document.getElementById('borders_west');
let borders_east      = document.getElementById('borders_east');
let borders_south     = document.getElementById('borders_south');

var requestContainer = []
var updateIndex      = 0;
var updateFlag       = 0;

var add_id           = document.getElementById('add_id');
var update_id        = document.getElementById('update_id');

if ( localStorage.getItem('requests') != null )
{
    requestContainer = JSON.parse(localStorage.getItem('requests')); //convert string to object
    displayRequest();
}

function addRequest()
{   
    var request =
    {
        name_form: name_form.value,
        id_form: id_form.value,
        mail_form: mail_form.value,
        gender_form: gender_form.value,
        pass_form: pass_form.value,
        governorate_form: governorate_form.value,
        section_form: section_form.value,
        area_form: area_form.value,

    }
        
    requestContainer.push(request);

    localStorage.setItem('requests', JSON.stringify(requestContainer) ); //convert object to string
    displayRequest();
    clearRequest();

}

function displayRequest()
{
    cartona=``;
    for (var i=0; i < requestContainer.length; i++)
    {
        cartona+=`<tr>
                    <td>${i+1}</td>
                    <td>${requestContainer[i].name_form}</td>
                    <td>${requestContainer[i].id_form}</td>
                    <td>${requestContainer[i].mail_form}</td>
                    <td>${requestContainer[i].gender_form}</td>                    
                    <td>${requestContainer[i].pass_form}</td>                    
                    <td>${requestContainer[i].governorate_form}</td>
                    <td>${requestContainer[i].section_form}</td>
                    <td>${requestContainer[i].area_form}</td>
                    <td><button class="btn" onclick="deleteRequest(${i})">الغاء الطلب</button></td>
                    <td><button class="btn" onclick="updateForm(${i})">تعديل الطلب</button></td> 
                    
                  </tr>`;
    }

    document.getElementById('tbody').innerHTML = cartona;
}
    

function clearRequest()
{
   name_form.value         = '';
   id_form.value           = '';
   mail_form.value         = '';
   gender_form.value       = '';                    
   pass_form.value         = '';
   governorate_form.value  = '';
   section_form.value      = '';
   area_form.value         = '';
}

function deleteRequest(i)
{
    requestContainer.splice(i,1);
    localStorage.setItem('requests', requestContainer); //convert object to string
    displayRequest();
}

function searchRequest(term)
{
    cartona=``;

    for (var i= 0; i < requestContainer.length; i++)
    {
        if (requestContainer[i].name.toLowerCase().includes(term.toLowerCase()))
        {
            cartona+=`<tr>
                    <td>${i}</td>
                    <td>${requestContainer[i].name}</td>
                    <td>${requestContainer[i].mail}</td>
                    <td>${requestContainer[i].sid}</td>
                    <td>${requestContainer[i].year}</td>
                    <td><button class="btn" onclick="deleteRequest(${i})">الغاء الطلب</button></td>
                    <td><button class="btn" onclick="updateForm(${i})">تعديل الطلب</button></td>                    
                  </tr>`;
        }        
    }

    document.getElementById('tbody').innerHTML = cartona;
}


function updateForm(id)
{
    updateIndex = id;
    updateFlag  = 1; //Flag that we press "update" button not "update request" button

    //in order to make the input
    document.getElementById('name_form').value       = requestContainer[id].name_form;
    document.getElementById('id_form').value         = requestContainer[id].id_form;
    document.getElementById('mail_form').value       = requestContainer[id].mail_form;
    document.getElementById('gender_form').value     = requestContainer[id].gender_form;    
    document.getElementById('pass_form').value       = requestContainer[id].pass_form;
    document.getElementById('governorate_form').value= requestContainer[id].governorate_form;
    document.getElementById('section_form').value    = requestContainer[id].section_form;

    document.getElementById("add_id").style.display   ="none";
    document.getElementById("update_id").style.display="flex";

    document.getElementById('name_form').focus();
    
}

function updateRequest()
{
    requestContainer[updateIndex].name_form  = document.getElementById('name_form').value;
    requestContainer[updateIndex].id_form    = document.getElementById('id_form').value ;
    requestContainer[updateIndex].mail_form  = document.getElementById('mail_form').value;
    requestContainer[updateIndex].gender_form= document.getElementById('gender_form').value;    
    requestContainer[updateIndex].pass_form  = document.getElementById('pass_form').value;
    requestContainer[updateIndex].governorate_form= document.getElementById('governorate_form').value ;
    requestContainer[updateIndex].section_form= document.getElementById('section_form').value;


    localStorage.setItem('requests' , JSON.stringify(requestContainer));
    displayRequest();
    clearRequest();

    document.getElementById("add_id").style.display   ="flex";
    document.getElementById("update_id").style.display="none";
 
}

function validateRequest()
{      
    let name_regex  = /^[\u0621-\u064A ]+$/    //has only arabic letters+spaces: Numbers are not allowed
    let mail_regex  = /\w@\w.(com|)/           //anything@anything.com  : check by == true  
    let pass_regex  = /\s/                     //has no space: check by != true
    let id_regex    = /^[0-9]*$/                    //has only english numbers //28809201404007
    
    let name_valid  = false;
    let id_valid    = false;
    let mail_valid  = false;
    let pass_valid  = false;
    let pass2_valid = false;
    let area_valid  = false;
    let border_valid =false;

    if (name_regex.test(name_form.value) == true && name_form.value.length>=10)
    {
        document.getElementById('ifvalid_name').innerHTML  = "";
        document.getElementById('ifvalid_name').style.color= "white";
        name_valid = true;
    }else
    {
        document.getElementById('ifvalid_name').innerHTML  = " يسمح بادخال حروف عربيه فقط لا يقل طولها عن 10 احرف";
        document.getElementById('ifvalid_name').style.color= "red";
        name_valid = false;
    }

    if (id_form.value.length == 14 && id_regex.test(id_form.value) == true)
    {
        document.getElementById('ifvalid_id').innerHTML  = "";
        document.getElementById('ifvalid_id').style.color= "white";
        id_valid = true;
    }else
    {
        document.getElementById('ifvalid_id').innerHTML  = "يجب ادخال 14 رقم";
        document.getElementById('ifvalid_id').style.color= "red";
        id_valid = false;
    }

    if (mail_regex.test(mail_form.value) == true)
    {
        document.getElementById('ifvalid_mail').innerHTML  = "";
        document.getElementById('ifvalid_mail').style.color= "white";
        mail_valid = true;
    }else
    {
        document.getElementById('ifvalid_mail').innerHTML  =  " anything@anything.com يجب ادخال ايميل مناسب مثل";
        document.getElementById('ifvalid_mail').style.color= "red";
        mail_valid = false;
    }

    if (pass_form.value.length>=4 && pass_form.value.length<=10 && pass_regex.test(pass_form.value) != true)
    {
        document.getElementById('ifvalid_pass').innerHTML  = "";
        document.getElementById('ifvalid_pass').style.color= "white";
        pass_valid = true;
    }else
    {
        document.getElementById('ifvalid_pass').innerHTML  = "يمكن ادخال اي شئ طوله بين 4 و 10";
        document.getElementById('ifvalid_pass').style.color= "red";
        pass_valid = false;
    }

    if (pass2_form.value == pass_form.value && pass2_form.value.length != 0)
    {
        document.getElementById('ifvalid_pass2').innerHTML  = "";
        document.getElementById('ifvalid_pass2').style.color= "white";
        pass2_valid = true;
    }else
    {
        document.getElementById('ifvalid_pass2').innerHTML  = "كلمات المرور يجب ان تكون متطابقة";
        document.getElementById('ifvalid_pass2').style.color= "red";
        pass2_valid = false;
    }

    if (id_regex.test(area_form.value) == true && area_form.value.length != 0)
    {
        document.getElementById('ifvalid_area').innerHTML  = "";
        document.getElementById('ifvalid_area').style.color= "white";
        area_valid = true;
    }else
    {
        document.getElementById('ifvalid_area').innerHTML  = "يجب ادخال  ارقام فقط";
        document.getElementById('ifvalid_area').style.color= "red";
        area_valid = false;
    }

    if (name_regex.test(borders_north.value) == true && borders_north.value.length>=10 &&
        name_regex.test(borders_south.value) == true && borders_south.value.length>=10&&
        name_regex.test(borders_west.value) == true && borders_west.value.length>=10&&
        name_regex.test(borders_east.value) == true && borders_east.value.length>=10)
    {
        document.getElementById('ifvalid_border').innerHTML  = "";
        document.getElementById('ifvalid_border').style.color= "white";
        border_valid = true;
    }else
    {
        document.getElementById('ifvalid_border').innerHTML  = " يسمح بادخال حروف عربيه فقط لا يقل طولها عن 10 احرف";
        document.getElementById('ifvalid_border').style.color= "red";
        border_valid = false;
    }

    //Prevent sign in button from submitting data if not valid
    document.forms[0].onsubmit = function (e)
    {
        if (name_valid == false || id_valid == false|| mail_valid == false || 
            pass_valid == false || pass2_valid == false|| area_valid == false|| border_valid==false)
        {

            e.preventDefault(); //prevent submitting here

            //Update CSS to show alert message to all
            document.getElementById('div_error').style.display= "flex";        
            document.getElementById('div_error').style.width= "350px";        
            document.getElementById('div_error').style.backgroundColor= "yellow";        
            document.getElementById('p_error').innerHTML    = "برجاء تصحيح الاخطاء التالية المميزه باللون الاحمر";            
        }
        else
        {
            document.getElementById('div_error').style.display= "none";        
            document.getElementById('div_error').style.width= "350px";        
            document.getElementById('div_error').style.backgroundColor= "white";        
            document.getElementById('p_error').innerHTML    = ""; 
            
            //Add request to local storage
            addRequest();
        } 
    }

}

       
//Start time is set to current time of opening the form
var now  = new Date().getTime();

//End time is set to one minute for now
var next = new Date().getTime() + 1000*60; 

// This function will be called automatically every one second to show the timer of displaying a request
var x = setInterval(function() 
{

        //Set period to be the difference between now, and next
        var period = next - now;
        console.log("period: ", period);

        // Time calculations for days, hours, minutes and seconds
        //var days = Math.floor(period / (1000 * 60 * 60 * 24));
        //var hours = Math.floor((period % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((period % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((period % (1000 * 60)) / 1000);

        // Set the timer in the div with id="timer"
        document.getElementById("demo").innerHTML = minutes + " minutes "+seconds + " seconds ";

        //Remove the form, and the local storage, if the allowed time is ended.

        if (period < 0 ) 
        {
            clearInterval(x);

            document.getElementById("demo").innerHTML            = "انتهي الوقت المسموح لملئ الطلب";
            document.getElementById("form").style.display        = "none";
            document.getElementById("allRequests").style.display = "none";            
        }
}, 1000);
