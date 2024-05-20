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

const Home = () => {
  const db = getDatabase();
  let [todo, setTodo] = useState("");
  let [TodoList, setTodoList] = useState([]);
  let [editData, setEditData] = useState([]);
  let [realTime, setRealTime] = useState(false);
  let [enableEdit, setEnableEdit] = useState(false);

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
    // console.log(item);
  };

  const handleUpdate = () => {
    update(ref(db, "ToDo/" + editData.id), {
      TodoList: editData.TodoList,
    }).then(() => {
      setRealTime(!realTime);
      setEnableEdit(false);
      // console.log(TodoList);
    });
  };

  return (
    <section className="">
      <div className="container">
        <div className="py-20">
          <div className="flex items-center gap-10 pb-10">
            <h1 className=" text-black text-2xl font-medium">
              Home page :-
            </h1>
            <button className="bg-[#FAE3B6] text-slate-700 hover:bg-slate-500 hover:text-white rounded-xl py-3 px-4 shadow-xl text-2xl font-bold">
              Your ToDo List
            </button>
          </div>

          {/* <div className="flex gap-4 justify-center my-10">
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
          </div> */}

          <div>
            {enableEdit && (
              <div className="flex gap-4 justify-center my-10">
                <input
                  value={enableEdit ? editData.TodoList : todo}
                  className="mb-10 text-white border bg-slate-600 p-4 rounded-2xl"
                  type="text"
                  placeholder="Add ToDo list"
                  onChange={
                    enableEdit
                      ? (e) =>
                          setEditData({
                            ...editData,
                            TodoList: e.target.value,
                          })
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
                    <button
                      className=" p-4 border rounded-xl"
                      onClick={handleSend}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <div className="py-14 text-black text-lg flex items-center justify-center">
              <ul className="w-full flex flex-wrap justify-center gap-10">
                {TodoList.map((item, intex) => (
                  <li
                    key={intex}
                    className="flex flex-col justify-center items-center gap-10 p-2 border border-black w-96 h-96"
                  >
                    <p className="border py-5 w-52">{item?.TodoList}</p>
                    <button onClick={() => handelEdit(item)}>Edit</button>
                    <button className="bg-red-400" onClick={() => handelDelete(item?.id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
