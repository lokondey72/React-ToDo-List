import { useEffect, useState } from "react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

const todo = () => {
  let [todo, setTodo] = useState("");
  let [TodoList, setTodoList] = useState([]);
  let [editData, setEditData] = useState([]);
  let [enableEdit, setEnableEdit] = useState(false);
  let [realTime, setRealTime] = useState(false);
  const db = getDatabase();

  const handleSend = () => {
    set(push(ref(db, "ToDo/")), {
      TodoList: todo,
    }).then(() => {
      setRealTime(!realTime);
    });
  };
  useEffect(() => {
    let arr = [];
    onValue(ref(db, "ToDo/"), (snapshot) => {
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
    });
    setTodoList(arr);
  }, [realTime]);
  const handelDelete = (item) => {
    remove(ref(db, "ToDo/" + item)).then(() => {
      setRealTime(!realTime);
    });
  };
  const handelEdit = (item) => {
    setEnableEdit(true);
    setEditData(item);
  };
  const handleUpdate = () => {
    update(ref(db, "ToDo/" + editData.id), {
      TodoList: editData.TodoList,
    }).then(() => {
      setRealTime(!realTime);
      setEnableEdit(false);
    });
  };
  // console.log(editData);

  return (
    <section className="py-20 bg-slate-600">
      <div className="container">
        <div>
          <div className=" text-center">
            <h2 className=" text-slate-50 text-7xl font-bold">ToDo List</h2>
          </div>
          <div className="flex gap-4 justify-center my-10">
            <input
              value={enableEdit ? editData.TodoList : todo}
              className="mb-10 p-4 rounded-2xl"
              type="text"
              placeholder="Add ToDo list"
              onChange={
                enableEdit
                  ? (e) =>
                      setEditData({ ...editData, TodoList: e.target.value })
                  : (e) => setTodo(e.target.value)
              }
            />
            <div>
              {enableEdit ? (
                <button
                  className=" p-4 border rounded-xl"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              ) : (
                <button className=" p-4 border rounded-xl" onClick={handleSend}>
                  Add
                </button>
              )}
            </div>
          </div>
          <hr />
          <div className="py-14 text-slate-100 text-lg flex justify-center">
            <ul>
              {TodoList.map((item, intex) => (
                <li
                  key={intex}
                  className="flex items-center gap-9 my-4 p-2 border w-96"
                >
                  <p className=" w-52">{item.TodoList}</p>
                  <button onClick={() => handelEdit(item)}>Edit</button>
                  <button onClick={() => handelDelete(item.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default todo;
