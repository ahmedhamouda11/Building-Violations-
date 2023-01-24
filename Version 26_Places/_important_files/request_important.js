let name_form         = document.getElementById('name_form');
let id_form           = document.getElementById('id_form');
let mail_form         = document.getElementById('mail_form');
let pass_form         = document.getElementById('pass_form');
let pass2_form        = document.getElementById('pass2_form');

let governorate_form  = document.getElementById('governorate_form');
let section_form      = document.getElementById('section_form');
let area_form         = document.getElementById('area_form');

let borders_north     = document.getElementById('borders_north');
let borders_west      = document.getElementById('borders_west');
let borders_east      = document.getElementById('borders_east');
let borders_south     = document.getElementById('borders_south');


var requestContainer = []

function validateRequest()
{        
    let name_regex  = /^[\u0621-\u064A ]+$/    //has only arabic letters+spaces: Numbers are not allowed
    let mail_regex  = /\w@\w.(com|)/           //anything@anything.com  : check by == true  
    let pass_regex  = /\s/                     //has no space: check by != true
    
    //let id_regex  = /d/                         //has only numbers // ٢٣٤٠٢٣٤٠٢٣٤٠٢٣
    //let id_regex  = /^[\p{Arabic}\s\p{N}]+$/    //has only numbers: //٢٣٤٠٢٣٤٠٢٣٤٠٢٣
    //let id_regex  = /^[\u0621-\u064A\s\p{N}]+$/ //has only numbers: //٢٣٤٠٢٣٤٠٢٣٤٠٢٣
    let id_regex  = /^[0-9]*$/                    //has only english numbers //28809201404007
    
    let name_valid  = false;
    let id_valid    = false;
    let mail_valid  = false;
    let pass_valid  = false;
    let pass2_valid = false;
    let area_valid  = false;
    let border_valid= false;

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
        valid_pass = true;
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
        if (name_valid === false || id_valid === false|| mail_valid === false || 
            pass_valid === false || pass2_valid === false|| 
            area_valid === false || border_valid === false)
        {
            e.preventDefault(); //prevent submitting here

            //Update CSS to show alert message to all
            document.getElementById('div_error').style.display= "flex";        
            document.getElementById('div_error').style.width= "350px";        
            document.getElementById('div_error').style.backgroundColor= "yellow";        
            document.getElementById('p_error').innerHTML    = "برجاء تصحيح الاخطاء التالية المميزه باللون الاحمر";            
        
            console.log(governorate_form.value)
            console.log(area_form.value)
            console.log(pass2_form.value)
            console.log(mail_form.value)
            
            //Add requst to local storage if validation is done successfuly
            addRequest();

            if ( localStorage.getItem('requests') != null )
            {
                requestContainer = JSON.parse(localStorage.getItem('requests')); //convert string to object
                displayRequest();
            }
            
        }
        /*else
        {
            document.getElementById('div_error').style.display= "none";        
            document.getElementById('div_error').style.width= "350px";        
            document.getElementById('div_error').style.backgroundColor= "white";        
            document.getElementById('p_error').innerHTML    = ""; 
            
            //Add requst to local storage if validation is done successfuly
            addRequest();

            if ( localStorage.getItem('requests') != null )
            {
                requestContainer = JSON.parse(localStorage.getItem('requests')); //convert string to object
                displayRequest();
            }

        } */
    }

}

function addRequest()
{
    var request =
    {
        name: name_form.value,
        id  :id_form.value,
        mail: mail_form.value,
        pass: pass_form.value,
        
        governorate: governorate_form.value,
        section: section_form.value,
        area: area_form.value,
        //borders: [borders_north.value,borders_west.value,borders_east.value,borders_south.value]
    }
        
    requestContainer.push(request);

    localStorage.setItem('requests', JSON.stringify(requestContainer) ); //convert object to string
    displayRequest()
}

function displayRequest()
{
    cartona=``;
    
    console.log(requestContainer.length)

    for (var i=0; i < requestContainer.length; i++)
    {
        cartona+=`<tr>
                    <td>Hihihiihi</td>
                    <td>${requestContainer[i].id}</td>
                    <td>${requestContainer[i].mail}</td>
                    <td>${requestContainer[i].pass}</td>
                    <td>${requestContainer[i].governorate_form}</td>
                    <td>${requestContainer[i].section_form}</td>
                    <td>${requestContainer[i].area_form}</td>                    
                  </tr>`;
    }

    document.getElementById('tbody').innerHTML = cartona;

}
