import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login_form() {

  const navigate = useNavigate();

  const [form_data, set_form_data] = useState({
    username:"",
    password:""
  }
  )
  const handle_change = (e) => {
    set_form_data((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function handle_submit(e) {
    e.preventDefault();

    let form = e.target;
    try {
      const res = await api.post("/login", form_data);
      if (res.ok) {
        alert("Logged In Successfully");
        navigate("/events");
      } else {
        alert("Login Failed");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert("Something Went Wrong");
    }
  }

  return (
    <form
      onSubmit={handle_submit}
      className="flex flex-wrap gap-3 justify-center items-center"
    >
      <div className="">
        <label
          htmlFor="username"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Username
        </label>
        <div className="mt-2">
          <div className="">
            <input
              id="username"
              name="username"
              value={form_data.username}
              type="text"
              placeholder="janesmith"
              onChange={handle_change}
              required
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      </div>

      <div className="">
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            value={form_data.password}
            autoComplete="password"
            required
            onChange={handle_change}
            className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login
        </button>
      </div>
    </form>
  );
}
