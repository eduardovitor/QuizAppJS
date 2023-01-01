const finish_btn = document.querySelector("finish_button");
finish_btn.addEventListener("click", finishQuiz);

function checkAnswer(question_options,index) {
    var question_right_answer = localStorage.getItem("question_"+ (index + 1) + "_answer");
    for(i = 0; i < question_options.length; i++){
        if (question_options[i].checked==true) {
            if(question_options[i].value==question_right_answer){
                return true;
            }
        }
    }
}

function finishQuiz() {
    var now = new Date();
    var quiz_finish_time = now.getTime();
    var quiz_start_time = localStorage.getItem("quiz_start_time");
    const seconds = Math.abs((quiz_finish_time - quiz_start_time)/1000);
    var count_right_answers = 0;
    var max_questions = parseInt(localStorage.getItem("max_questions"));
    var i = 0;
    for(i = 0; i < max_questions; i++) {
        var question_options = document.getElementsByName("question"+(i+1));
        var check = checkAnswer(question_options,i);
        if (check==true){
            count_right_answers++;
        }
    }
    alert("O número de respostas certas foi "+count_right_answers+" e o número de segundos gasto foi "+seconds+"!");
}