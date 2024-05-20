import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-[#FAE3B6] py-9">
        <div className="container flex justify-between items-center">
          <div className="w-36">
            <Link to="/">
              <p className="text-3xl font-bold">ToDo List</p>
            </Link>
          </div>
          <div>
            <ul className="flex gap-14">
              <li className="text-black hover:text-[#FDBB57] text-xl font-semibold">
                <Link to="/">Home</Link>
              </li>
              <li className="text-black hover:text-[#FDBB57] text-xl font-semibold">
                <Link to="/todo">ToDo</Link>
              </li>
              <li className="text-black hover:text-[#FDBB57] text-xl font-semibold">
                <Link to="/about">About</Link>
              </li>
              <li className="text-black hover:text-[#FDBB57] text-xl font-semibold">
                <Link to="/users">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="shadow-black">
            <button className="bg-[#FAE3B6] text-[#050505] hover:bg-[#FDBB57] rounded-xl py-3 px-4 shadow-xl text-xl font-semibold">
              <Link to="#">ToDay Works</Link>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
