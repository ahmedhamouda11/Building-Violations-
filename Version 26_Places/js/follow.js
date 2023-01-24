

let id_form           = document.getElementById('id_form');
let code_form         = document.getElementById('code_form');

var followContainer = []
var updateIndex      = 0;
var updateFlag       = 0;

var add_id           = document.getElementById('add_id');
var update_id        = document.getElementById('update_id');

if ( localStorage.getItem('follows') != null )
{
    followContainer = JSON.parse(localStorage.getItem('follows')); //convert string to object
    displayFollow();
}

function addFollow()
{   
    var follow =
    {
        id_form  : id_form.value,        
        code_form: code_form.value,
    }
        
    followContainer.push(follow);

    localStorage.setItem('follows', JSON.stringify(followContainer) ); //convert object to string
    displayFollow();
    clearFollow();

}

function displayFollow()
{
    cartona=``;
    for (var i=0; i < followContainer.length; i++)
    {
        cartona+=`<tr>
                    <td>${i+1}</td>
                    <td>${followContainer[i].id_form}</td>
                    <td>${followContainer[i].code_form}</td>
                    <td>لقد تم رفض طلبك</td>                    
                    <td><button class="btn myButton" onclick="deleteFollow(${i})">Delete</button></td>
                    <td><button class="btn myButton" onclick="updateForm(${i})">Update</button></td>
                    
                  </tr>`;
    }

    document.getElementById('tbody').innerHTML = cartona;
}
/*
<td>لقد تم رفض طلبك</td>                    
<td>  تمت الموافقه علي طلبك</td>
<td>جاري اجراءات الطلب في الجهات المسؤولة</td>
*/    

function clearFollow()
{
   name_form.value         = '';
   id_form.value           = '';
   mail_form.value         = '';
   pass_form.value         = '';
   governorate_form.value  = '';
   section_form.value      = '';
   area_form.value         = '';
}

function deleteFollow(i)
{
    followContainer.splice(i,1);
    localStorage.setItem('follows', followContainer); //convert object to string
    displayFollow();
}

function searchFollow(term)
{
    cartona=``;

    for (var i= 0; i < followContainer.length; i++)
    {
        if (followContainer[i].name.toLowerCase().includes(term.toLowerCase()))
        {
            cartona+=`<tr>
                    <td>${i}</td>
                    <td>${followContainer[i].id_form}</td>
                    <td>${followContainer[i].code_form}</td>
                    <td><button class="btn myButton" onclick="deleteFollow(${i})">الغاء الطلب</button></td>
                    <td><button class="btn myButton" onclick="updateForm(${i})">تعديل الطلب</button></td>                    
                  </tr>`;
        }        
    }

    document.getElementById('tbody').innerHTML = cartona;
}


function updateForm(id)
{
    updateIndex = id;
    updateFlag  = 1; //Flag that we press "update" button not "update follow" button

    //in order to make the input
    document.getElementById('id_form').value         = followContainer[id].id_form;
    document.getElementById('code_form').value       = followContainer[id].code_form;

    document.getElementById("add_id").style.display   ="none";
    document.getElementById("update_id").style.display="flex";

    document.getElementById('id_form').focus();
    
}

function updateFollow()
{
    followContainer[updateIndex].id_form    = document.getElementById('id_form').value ;
    followContainer[updateIndex].code_form  = document.getElementById('code_form').value;
    localStorage.setItem('follows' , JSON.stringify(followContainer));
    displayFollow();
    clearFollow();

    document.getElementById("add_id").style.display   ="flex";
    document.getElementById("update_id").style.display="none";
 
}

function validateFollow()
{      
    let code_regex  = /\s/                     //has no space: check by != true
    let id_regex    = /^[0-9]*$/               //has only english numbers //28809201404007
   
    let id_valid    = false;
    let code_valid  = false;

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

    if (code_form.value.length>0 && code_regex.test(code_form.value) != true)
    {
        document.getElementById('ifvalid_code').innerHTML  = "";
        document.getElementById('ifvalid_code').style.color= "white";
        code_valid = true;
    }else
    {
        document.getElementById('ifvalid_pass').innerHTML  = "برجاء ادخال كود صحيح";
        document.getElementById('ifvalid_pass').style.color= "red";
        code_valid = false;
    }

    //Prevent sign in button from submitting data if not valid
    document.forms[0].onsubmit = function (e)
    {
        if (code_valid == false || id_valid == false)
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
            
            //Add follow to local storage
            addFollow();
            
        } 
    }

}
