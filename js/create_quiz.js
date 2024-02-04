// Fetching remote resource
import { getData } from "./api.js";

const btn = document.querySelector("button");
btn.addEventListener("click", main);

async function createQuestions(){
    var questions_json = await getData();
    console.log(questions_json);
    const MAX_QUESTIONS = 5;
    localStorage.setItem("max_questions",5);
    var index=0;
    for(index=0;index<MAX_QUESTIONS;index++) {
        // Creating initial structure
        var question_div = document.createElement("div");
        var h1 = document.createElement("h1");
        h1.textContent = (index+1) + ")" + " " + questions_json.results[index].question;
        question_div.appendChild(h1);

        const br = document.createElement("br");
        question_div.appendChild(br);

        // Array of question options
        var array_options = [questions_json.results[index].correct_answer, 
        questions_json.results[index].incorrect_answers[0],
        questions_json.results[index].incorrect_answers[1],
        questions_json.results[index].incorrect_answers[2]
        ];
        var question_ref = "question_"+ (index + 1) + "_answer";
        localStorage.setItem(question_ref, questions_json.results[index].correct_answer);
        const shuffled_options = array_options.sort((a, b) => 0.5 - Math.random());
        const form = document.createElement("form");
        form.setAttribute("method","POST");
        var i = 0;
        for(i=0; i < shuffled_options.length; i++){
            var id_question_option="question" + (index+1);
            var option = document.createElement("input");
            option.setAttribute("type", "radio");
            option.setAttribute("name", id_question_option);
            option.setAttribute("id", id_question_option);
            option.setAttribute("value", shuffled_options[i]);
            var label = document.createElement("label");
            label.setAttribute("for","option"+(i+1));
            label.textContent = shuffled_options[i];
            const br = document.createElement("br");
            form.appendChild(option);
            form.appendChild(label);
            form.appendChild(br);
        }
        question_div.appendChild(form);
        question_div.appendChild(br);
        document.body.appendChild(question_div);
    }
    const btn2 = document.createElement("button");
    btn2.setAttribute("type", "button");
    btn2.setAttribute("onclick", "finishQuiz()");
    btn2.setAttribute("id", "finish_button");
    btn2.textContent = "Finalizar";
    document.body.appendChild(btn2);
    var now = new Date();
    var quiz_start_time = now.getTime();
    localStorage.setItem("quiz_start_time",quiz_start_time);
}

async function main(){
    await createQuestions();
}