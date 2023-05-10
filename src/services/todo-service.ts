import { ITodo, ITodoPlaceHolder } from "../models/todo.model";

export async function getTodos(): Promise<Array<ITodo>> {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos',
    {
        headers: {
            "Content-Type": "application/json",
          }
    });
    const jsonData: Array<ITodoPlaceHolder> = await response.json();
    jsonData.length = 10;
    return jsonData.map((elementPH, index) => {
        return {
            id: elementPH.id.toString(),
            done: elementPH.completed,
            text: elementPH.title,
            color: ''
        } as ITodo
    })
}

export async function getTodosFakeData(): Promise<Array<ITodo>> {
    let fakeData:Array<ITodo> = [];
    for (let index = 0; index < 20; index++) {
        fakeData.push({
            "text": "delectus aut autem"+index,
            "id": index.toString(),
            "done":true,
            "color":""
        })
    }
    return Promise.resolve(fakeData);
}