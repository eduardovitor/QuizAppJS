export async function getData(){
    let url="https://opentdb.com/api.php?amount=10&category=14&difficulty=easy&type=multiple";
    return await fetch(url).then((response) => response.json());
}