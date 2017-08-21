$(document).ready(function(){
    var wasmade = [];
    // Блок обработки локального хранилища
    if(localStorage["tasks"])                               // проверяем наличие в локальном хранилище массива заданий
        {
            var tasks = JSON.parse(localStorage["tasks"]);  // распарсиваем JSON из Локального хранилища и записываем в массив заданий 
            
            tasks = tasks.filter(function(value){
               return  value != "/Del/";
            });
            
            for(i = 0; i <tasks.length; i++)            // генерирум страницу заданий в случае перезапуска страницы или браузера
            {
                $("#task").append("<li>" + "№ " + i + ": " + tasks[i] + " <input type='button' class='done' value='Выполнено'>  <input type='button' class='cancel' value='Отменить'>  <input type='button' class='edit' value='Редактировать'></li>")    
            }
    }
    else                                            // если нет создаем массив заданий
        {
            var tasks = [];
        }

    // обработка события клик по кнопке "Добавить заметку"
    $("#add").click(function(){
    var val = $("#what-to-do").val();                        // записываем в переменную то что прилетело в textbox 
    
        if(val == "")                                           // если ничего не было записано - alert
            {
                alert("Задача не создана!!! Повторите ввод");
            }
        else                                                    // если textbox не пустой
            {
                tasks.push(val);                                // добавляем заметку в массив
                localStorage["tasks"] = JSON.stringify(tasks);  // записываем массив заданий в локальное хранилище браузера, предварительно конвертируя в JSON
                window.location.reload();                       // перегружаем страницу
            }
        });

    // обработка события клик по кнопке "Выполнено"
    $(".done").click(function(){
        $(this).parent("li").addClass('wasdone');                        // нажав на кнопку родительскому эл li присваиваются стили класса .wasdone
        var temp = parseInt( ($(this).parent("li").text()).slice(2,) ); // 
   
        if(wasmade.length == 0)
            {
                wasmade.push(temp); 
            }   
        else
            {   
                var q = 0;
                for(i = 0; i < wasmade.length; i++)
                {
                    if((wasmade[i]) == temp)
                        {
                            q++;
                        }
                }
                if(q == 0)
                    {
                        wasmade.push(temp); 
                    }
            }
        
        tasks[temp] = "/Del/";
    
        localStorage["tasks"] = JSON.stringify(tasks);          // записываем массив заданий в локальное хранилище браузера, предварительно конвертируя в JSON
    });

    // обработка события клик по кнопке "Отмена"
    $(".cancel").click(function(){
        var temp = parseInt( ($(this).parent("li").text()).slice(2,) );
        tasks.splice(temp, 1);                                  // удаляем задание из массива заданий 
        localStorage["tasks"] = JSON.stringify(tasks);          // записываем массив заданий в локальное хранилище браузера, предварительно конвертируя в JSON
        window.location.reload();                               // перегружаем страницу
    });
    
    // обработка события клик по кнопке "Редактировать"
    $(".edit").click(function(){
        var t = prompt("Введите новую задачу");
        var temp = parseInt( ($(this).parent("li").text()).slice(2,) );
        tasks[temp] = t;
        localStorage["tasks"] = JSON.stringify(tasks);          // записываем массив заданий в локальное хранилище браузера, предварительно конвертируя в JSON
        window.location.reload();                               // перегружаем страницу
    });

});
