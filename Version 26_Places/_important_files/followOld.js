
if ( localStorage.getItem('requests') != null )
{
    requestContainer = JSON.parse(localStorage.getItem('requests')); //convert string to object
    console.log("requestContainer: ", requestContainer);
    //console.log(governorate_form.value)
    //console.log(area_form.value)
    //console.log(pass2_form.value)
    //console.log(mail_form.value)/
}

function validateFollow()
{
    let id_form     = document.getElementById('id_form');
    let code_form   = document.getElementById('code_form');

    let code_regex  = /\s/          //has any combinations of small/capital letters, numbers. (No Spaces)
    let id_regex    = /^[0-9]*$/    //has only english numbers //28809201404007
    
    let id_valid    = false;
    let code_valid  = false;

    console.log(code_form.value);

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

    if (code_regex.test(code_form.value) != true && code_form.value.length>5) //Not Empty
    {
        document.getElementById('ifvalid_code').innerHTML  = "";
        document.getElementById('ifvalid_code').style.color= "white";
        code_valid = true;
    }else
    {
        document.getElementById('ifvalid_code').innerHTML  = "يسمح بادخال حروف انجليزية فقط لا يقل طولها عن 10 احرف";
        document.getElementById('ifvalid_code').style.color= "red";
        code_valid = false;
    }
    //Prevent sign in button from submitting data if not valid
    document.forms[0].onsubmit = function (e)
    {
        if (id_valid === false || code_valid === false)
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
        } 
    }

}
