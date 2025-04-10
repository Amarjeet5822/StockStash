import { useState } from "react";
import { useDispatch } from "react-redux";
import {  NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../RTK/features/authSlice";

function SingupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formHandler = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      setEmail("");
      setName("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white pt-3 pb-8 px-8 rounded-lg shadow-md w-full max-w-md">
        <form
          onSubmit={formHandler}
          className="flex flex-col justify-center items-center px-2 pt-5"
        >
          <div className="bg-white  rounded-lg px-6 py-6 w-full max-w-sm">
            <p className="text-2xl font-semibold text-center text-gray-800 pb-4">
              Signup Please
            </p>

            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name:
              </label>
              <input
                className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter your name"
              />
            </div>

            <div className="w-full mt-2">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email:
              </label>
              <input
                className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
              />
            </div>

            <div className="w-full mt-2">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password:
              </label>
              <input
                className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
              />
            </div>

            <div className="w-full mt-6">
              <input
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200 cursor-pointer"
                type="submit"
                name="submit"
                value="Register"
              />
            </div>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <p>{`Already have Account? `} </p>
            <NavLink className={"text-red-500 font-bold"} to="/login">
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SingupPage;
