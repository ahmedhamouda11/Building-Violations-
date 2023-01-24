        //$('.container').animate({width:'100%'}, 2000)
        $(document).ready(function()
        {
            $('.loading .spinner').fadeOut(2000,function()
            {
                $('.loading').slideUp(2000,function()
                {
                    $('body').css('overflow','auto')
                    $('.loading').remove()
                })
            })
        })

        /*
        $('.navbar').slideUp(1000,function()
        {
                    //$('body').css('overflow','auto')
        })
        */



        var image1  = document.getElementById('image1')
        var image2  = document.getElementById('image2')
        var image3  = document.getElementById('image3')
        var image4  = document.getElementById('image4')
        var image5  = document.getElementById('image5')
        var image6  = document.getElementById('image6')

        //تقديم الطلب
        image1.addEventListener('click',function() 
        {
            window.location.href="tasks/task1.html";
        })

        //متابعة الطلب
        image2.addEventListener('click',function() 
        {
            window.location.href="tasks/task2.html";
        })

        //تقديم الشكاوي
        image3.addEventListener('click',function()
        {
            window.location.href="tasks/task3.html";
        })

        //شروط البناء
        image4.addEventListener('click',function() 
        {
            window.location.href="tasks/task4.html";
        })

        //دليل المناطق
        image5.addEventListener('click',function()
        {
            window.location.href="tasks/task5.html";
        })

        //الجهات المسؤول
        image6.addEventListener('click',function()  
        {
            window.location.href="tasks/task6.html";
        })

