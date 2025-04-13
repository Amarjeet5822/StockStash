import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../RTK/features/authSlice";
import { api } from "../RTK/store/links";

function LoginPage() {
  const [isField, setIsField] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const handleGoogleLogin = () => {
    console.log("google login",`${api}/auth/google` );
    window.location.href = `${api}/auth/google`;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(({email, password}))).unwrap();
      setEmail("");
      setPassword("");
      setIsField(true);
      navigate("/");
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    emailRef.current?.focus();
  }, []);
  useEffect(() => {
    if (password.length > 3 && email) {
      setIsField(false);
    }
  }, [email, password, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center rounded-lg bg-gray-100">
      <div className="bg-white pt-3 pb-8 px-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login Please</h2>
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isField}
            className={`w-full ${
              !isField ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-100"
            } text-white py-2 rounded-lg transition duration-300`}
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-xl my-2">OR</p>
          <div className="flex justify-center items-center w-full bg-gray-100 rounded-xl hover:bg-gray-200">
            <div>
              <button
                onClick={handleGoogleLogin}
                className="flex justify-center items-center gap-2  px-4 py-1 rounded-lg"
              >
                <div className=" text-xl text-gray-500 pb-1.5">Login with </div>
                <div>
                  <img
                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                    alt="Google"
                    className="w-16 h-5"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-1 mt-2 justify-center items-center">
          <p>{`Don't have Account? `} </p>
          <NavLink className={"text-red-500 font-bold"} to="/register">
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
