export function Todos({todos}){
    return (
        <div>
            {todos.map((todo)=>{
                return (
                    <div>
                        <h1>{todo.title}</h1>
                        <h4>{todo.description}</h4>
                        <button>{todo.complete == true ? "Done" : "Mark as Done"}</button>
                    </div>
                )
            })}
        </div>
    )
}