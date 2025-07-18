import { useEffect, useState } from "react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  update,
} from "firebase/database";

const ToDo = () => {
  const db = getDatabase();
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const todoRef = ref(db, "ToDo/");
    const unsubscribe = onValue(todoRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setTodoList(arr);
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  const handleAdd = () => {
    if (!todo.trim()) return;

    push(ref(db, "ToDo/"), {
      TodoList: todo.trim(),
    }).then(() => setTodo(""));
  };

  const handleUpdate = () => {
    if (!editData?.TodoList?.trim()) return;

    update(ref(db, "ToDo/" + editData.id), {
      TodoList: editData.TodoList.trim(),
    }).then(() => setEditData(null));
  };

  const handleEdit = (item) => {
    setEditData(item);
  };

  const handleDelete = (id) => {
    remove(ref(db, "ToDo/" + id));
  };

  return (
    <section className="min-h-screen bg-slate-800 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl text-center font-bold text-white mb-12">
          📝 ToDo List
        </h1>

        {/* Input Form */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <input
            value={editData ? editData.TodoList : todo}
            onChange={(e) =>
              editData
                ? setEditData({ ...editData, TodoList: e.target.value })
                : setTodo(e.target.value)
            }
            type="text"
            placeholder="Enter a task..."
            className="flex-1 p-4 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full max-w-md"
          />
          <button
            onClick={editData ? handleUpdate : handleAdd}
            className={`px-6 py-3 font-semibold text-white rounded-xl shadow-md transition-all ${
              editData
                ? "bg-green-500 hover:bg-green-600"
                : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
            }`}
          >
            {editData ? "Update" : "Add"}
          </button>
        </div>

        <hr className="border-slate-600 mb-10" />

        {/* List */}
        <div className="flex flex-col items-center gap-6">
          {todoList.length === 0 ? (
            <p className="text-white text-lg">No tasks added yet.</p>
          ) : (
            <ul className="w-full flex flex-col gap-6 items-center">
              {todoList.map((item, index) => (
                <li
                  key={index}
                  className="bg-slate-700 text-white rounded-lg w-full max-w-xl p-6 flex justify-between items-center shadow-md"
                >
                  <span className="text-lg break-words w-2/3">
                    {item.TodoList}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default ToDo;
