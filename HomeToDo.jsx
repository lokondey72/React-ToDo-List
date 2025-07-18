import {
  getDatabase,
  onValue,
  ref,
  remove,
} from "firebase/database";
import { useEffect, useState } from "react";

const HomeToDo = ({ onEdit }) => {
  const db = getDatabase();
  const [todoList, setTodoList] = useState([]);

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

  const handleDelete = (id) => {
    remove(ref(db, "ToDo/" + id));
  };

  return (
    <div className="py-14 text-slate-800 text-lg flex items-center justify-center">
      <ul className="w-full flex flex-wrap justify-center gap-10">
        {todoList.map((item, index) => (
          <li
            key={index}
            className="flex flex-col justify-center items-center gap-6 p-6 border border-gray-300 rounded-xl w-80 h-72 shadow-md bg-white"
          >
            <p className="w-full text-center text-xl font-medium text-gray-800 break-words">
              {item.TodoList}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => onEdit(item)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeToDo;
