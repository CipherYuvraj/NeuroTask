// import tailwind from 'tailwindcss';
export function CreateTodo(){
    return <div>
        <input className="flex items-center justify-center min-h-screen bg-gray-200" type="text" placeholder="title" /><br />
        <input type="text" placeholder="description"/><br />
        <button>Add a todo</button>
    </div>
}