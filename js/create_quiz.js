// Fetching remote resource
import { getData } from "./api.js";

const btn = document.querySelector("button");
btn.addEventListener("click", main);

async function createQuestions(){
    var questions_json = await getData();
    const MAX_QUESTIONS = 5;
    var index=0;
    for(index=0;index<MAX_QUESTIONS;index++) {
        // Creating initial structure
        var question_div = document.createElement("div");
        var h1 = document.createElement("h1");
        h1.textContent = questions_json.results[index].question;
        question_div.appendChild(h1);

        const br = document.createElement("br");
        question_div.appendChild(br);

        // Array of question options
        var array_options = [questions_json.results[index].correct_answer, 
        questions_json.results[index].incorrect_answers[0],
        questions_json.results[index].incorrect_answers[1],
        questions_json.results[index].incorrect_answers[2]
        ];
        
        const shuffled_options = array_options.sort((a, b) => 0.5 - Math.random());
        const form = document.createElement("form");
        form.setAttribute("action","answerQuestion()");
        var i = 0;
        for(i=0; i < shuffled_options.length; i++){
            var option = document.createElement("input");
            option.setAttribute("type", "radio");
            option.setAttribute("name", "opção"+(i+1));
            option.setAttribute("id", "opção"+(i+1));
            option.setAttribute("value", shuffled_options[i]);
            var label = document.createElement("label");
            label.setAttribute("for","opção"+(i+1));
            label.textContent = shuffled_options[i];
            const br = document.createElement("br");
            form.appendChild(option);
            form.appendChild(label);
            form.appendChild(br);
        }
        question_div.appendChild(form);
        question_div.appendChild(br);
        if (index == MAX_QUESTIONS-1) {
            const btn = document.createElement("button");
            btn.textContent = "Finalizar";
            question_div.appendChild(btn);
        }
        document.body.appendChild(question_div);
    }
}

async function main(){
    await createQuestions();
}