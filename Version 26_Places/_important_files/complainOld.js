function validateComplain()
{        
    let id_form            = document.getElementById('id_form');
    let message_form       = document.getElementById('message_form');

    let message_regex  = /[a-zA-z]/    //has only arabic letters+spaces: Numbers are not allowed
    let id_regex       = /^[0-9]*$/                    //has only english numbers //28809201404007
    
    let id_valid       = false;
    let message_valid  = false;

    console.log(message_form.value);

    if (message_regex.test(message_form.value) == true && message_form.value.length>0) //Not Empty
    {
        document.getElementById('ifvalid_message').innerHTML  = "";
        document.getElementById('ifvalid_message').style.color= "white";
        message_valid = true;
    }else
    {
        document.getElementById('ifvalid_message').innerHTML  = "يسمح بادخال حروف انجليزية فقط لا يقل طولها عن 1 حرف";
        document.getElementById('ifvalid_message').style.color= "red";
        message_valid = false;
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

    //Prevent sign in button from submitting data if not valid
    document.forms[0].onsubmit = function (e)
    {
        if (id_valid === false || message_valid === false)
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
