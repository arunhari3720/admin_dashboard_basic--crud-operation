  import { Link } from "react-router-dom";

const Sidebar = ({ closeSidebar }) => {
  return (
    <div className="h-full w-64 bg-white text-black p-5 flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm tracking-wide font-semibold">
          Admin Panel
        </h2>

        {/* Close button (mobile only) */}
        <button
          onClick={closeSidebar}
          className="lg:hidden text-xl"
        >
          ✕
        </button>
      </div>

      {/* Menu */}
  

<ul className="space-y-4 flex-1">

  <li className="px-4 py-2 text-lg rounded-md hover:bg-red-100 cursor-pointer transition">
    <Link to="/">E-Commerce</Link>
  </li>

  <li className="px-4 py-2 text-lg rounded-md hover:bg-red-100 cursor-pointer transition">
    <Link to="/UserForm">UserForm</Link>
  </li>

  <li className="px-4 py-2 text-lg rounded-md hover:bg-red-100 cursor-pointer transition">
    <Link to="/StudentForm">StudentForm</Link>
  </li>

  <li className="px-4 py-2 text-lg font-bold rounded-md hover:bg-red-100 cursor-pointer transition">
    <Link to="/login">Logout</Link>
  </li>

</ul>

    </div>
  );
};

export default Sidebar;