import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  let [user, setuser] = useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setuser(res.data);
    });
  }, []);
  console.log(user);
  return (
    <section className=" py-20">
      <div className="container">
        <div className="flex">
          <div className=" w-1/3">
            {user.map((item) => (
              <div className="flex">
                <div className="text-slate-100 text-3xl mt-10 p-20 bg-slate-600">
                  <h1>No : {item.id}</h1>
                  <div className="w-fit pb-10 m-auto">
                    <FaUser />
                  </div>
                  <div>
                    <h3>Name : {item.name}</h3>
                    <h3>Username : {item.username}</h3>
                    <h3>Email : {item.email}</h3>
                    <h3>Phone : {item.phone}</h3>
                    <h3>Website : {item.website}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;
