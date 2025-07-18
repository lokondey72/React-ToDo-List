import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import About from "./About";

const Home = () => {
  const db = getDatabase();
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editData, setEditData] = useState(null);

  const handleSend = () => {
    if (!todo.trim()) return;
    push(ref(db, "ToDo/"), { TodoList: todo }).then(() => setTodo(""));
  };

  const handleDelete = (id) => {
    remove(ref(db, "ToDo/" + id));
  };

  const handleEdit = (item) => {
    setEditData(item);
  };

  const handleUpdate = () => {
    if (!editData?.TodoList?.trim()) return;
    update(ref(db, "ToDo/" + editData.id), {
      TodoList: editData.TodoList,
    }).then(() => setEditData(null));
  };

  useEffect(() => {
    const todoRef = ref(db, "ToDo/");
    const unsubscribe = onValue(todoRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setTodoList(arr);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-tr from-yellow-100 to-white">
      <div className="container mx-auto py-20 px-6">
        <div className="flex flex-col items-center gap-6 mb-12">
          <h1 className="text-4xl font-bold text-gray-800">📝 ToDo List</h1>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
            <input
              type="text"
              value={editData ? editData.TodoList : todo}
              onChange={(e) =>
                editData
                  ? setEditData({ ...editData, TodoList: e.target.value })
                  : setTodo(e.target.value)
              }
              placeholder="Enter a task..."
              className="flex-1 px-5 py-3 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {editData ? (
              <button
                onClick={handleUpdate}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-md"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleSend}
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-md"
              >
                Add
              </button>
            )}
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {todoList.map((item) => (
            <li
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-between border border-yellow-200 hover:shadow-xl transition-all duration-300"
            >
              <p className="text-lg text-gray-800 font-medium text-center break-words mb-6">
                {item.TodoList}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <About />
    </section>
  );
};

export default Home;
