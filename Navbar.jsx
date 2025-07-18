import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#FAE3B6] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold text-slate-900">
          <Link to="/">RIKTO LTD</Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-10 items-center">
          {["Home", "ToDo", "About", "Contact Us"].map((name, idx) => {
            const route =
              name === "Home" ? "/" : `/${name.toLowerCase().replace(" ", "")}`;
            return (
              <li key={idx}>
                <NavLink
                  to={route}
                  className={({ isActive }) =>
                    `text-xl font-semibold transition-colors ${
                      isActive
                        ? "text-[#FDBB57]"
                        : "text-black hover:text-[#FDBB57]"
                    }`
                  }
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <div className="ml-4">
          <Link to="/todo">
            <button className="bg-[#FDBB57] hover:bg-[#fcb043] text-black font-semibold px-5 py-2 rounded-xl shadow-lg transition duration-200">
              Today’s Tasks
            </button>
          </Link>
        </div>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden">
          <button className="text-3xl font-bold text-black">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
