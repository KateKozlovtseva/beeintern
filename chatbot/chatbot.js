input = document.getElementById("input");
button = document.getElementById("button");
chat_list = document.getElementById("chat");
indicator = document.getElementById("indicator");
start = false;
num = false;


function handle_submit(arg) {
    const text = input.value;
       
    add_message("user", text);
    if (start){
        if(text.startsWith("/name:")){
            const a = "Привет";
            const colPos = text.indexOf(":");
            const b = text.substring(colPos+1);
            const c = ", приятно познакомиться. Я умею считать, введи числа которые надо посчитать.";
            add_message("bot", a+b+c);
        }

       else if(text.startsWith("/number:")){
            add_message("bot", "Выберите необходимое действие: - , + , *, /");
            const commaPos = text.indexOf(",");
            const colPos = text.indexOf(":");
            a = Number(text.substring(colPos+1, commaPos));
            b = Number(text.substring(commaPos+1));
            num = true;
        }  
            
        else if(num == true){
            if(text.startsWith("-")){
                add_message("bot", a-b);
                num=false;
            }
            else if( text.startsWith("+")){
                add_message("bot", a+b);
                num=false;
            }
            else if(text.startsWith("*")){
                add_message("bot", a*b);
                num=false;
            }
            else if(text.startsWith("/")){
                add_message("bot", a/b);
                num=false;
            }
            
            else{
                add_message("bot", "Я не понимаю, введите другую команду!");
            }

        }
                
        else if(text == "/stop"){
            add_message("bot", "Всего доброго, если хочешь поговорить пиши /start");
            start = false;
        }

        else{
            add_message("bot", "Я не понимаю, введите другую команду!");
        }

    }

    else{
        if(text == "/start"){
            add_message("bot", "Привет, меня зовут Чат-бот, а как зовут тебя?");
            start = true;
        }
        else{
            add_message("bot", "Введите команду /start, для начала общения");   
        }
    } 
    

    
    input.value = "";
    button.disabled = true;
    indicator.className = ""; 
    
    arg.preventDefault();
}

function handle_text(arg){
    if (arg.target.value == ""){
        button.disabled = true;
        indicator.className = "";
    }
    else {
        button.disabled = false;
        indicator.className = "loading";
    }

   
}



function add_message(user, text) {
    var message = document.createElement("li");
    message.className = "chat_list_item";
    
    var text_area = document.createElement("div");

    if (user == "bot"){
        message.innerHTML = '<div class="avatar"><img class="avatar_image" src="assets/avatar_bot.png"></div>';
        text_area.className = "text_area text_bot";
    } 
    else{
        message.innerHTML = '<div class="avatar"><img class="avatar_image" src="assets/avatar.png"></div>';
        text_area.className = "text_area text_user";
    }
    
    var message_text = document.createElement("span");
    message_text.className = "chat_text";
    message_text.innerText = text;

    text_area.appendChild(message_text);
    message.appendChild(text_area);
    
    chat_list.appendChild(message);
}

input.onkeyup = handle_text;
document.getElementById("message_form").onsubmit = handle_submit;