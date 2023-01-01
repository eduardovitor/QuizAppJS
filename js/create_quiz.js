// Fetching remote resource

async function getData(){
    url="https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple";
    return json_data = await fetch("https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple")
    .then((response) => response.json());
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

async function main(){
    var json_data = await getData();
    // Creating initial structure
    var h1 = document.createElement("h1");
    h1.textContent = json_data.results[0].question;
    document.body.appendChild(h1);

    const br = document.createElement("br");
    document.body.appendChild(br);

    // Array of question options
    var array_options = [json_data.results[0].correct_answer, 
    json_data.results[0].incorrect_answers[0],
    json_data.results[0].incorrect_answers[1],
    json_data.results[0].incorrect_answers[2]
    ];
    
    const shuffled_options = array_options.sort((a, b) => 0.5 - Math.random());
    console.log(shuffled_options);

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
        document.body.appendChild(option);
        document.body.appendChild(label);
        document.body.appendChild(br);
    }
}

main();
