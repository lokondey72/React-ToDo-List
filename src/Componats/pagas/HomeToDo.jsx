import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";

const HomeToDo = () => {
  let [TodoList, setTodoList] = useState([]);

  useEffect(() => {
    let arr = [];
    onValue(ref(db, "ToDo/"), (snapshot) => {
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
    });
    setTodoList(arr);
  }, [realTime]);

  const handelEdit = (item) => {
    setEnableEdit(true);
    setEditData(item);
    // console.log(item);
  };

  return (
    <>
      <div className="py-14 text-slate-100 text-lg flex items-center justify-center">
        <ul className="w-full flex flex-wrap justify-center gap-10">
          {TodoList.map((item, intex) => (
            <li
              key={intex}
              className="flex flex-col justify-center items-center gap-10 p-2 border w-96 h-96"
            >
              <p className=" w-52">{item.TodoList}</p>
              <button onClick={() => handelEdit(item)}>Edit</button>
              <button onClick={() => handelDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HomeToDo;
