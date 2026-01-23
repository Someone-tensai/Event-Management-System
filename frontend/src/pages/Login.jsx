import Login_form from "../components/Login_form";

function Login_page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Login</h1>

      <div className = "w-full max-w-md">
        <Login_form />
      </div>
    </div>
  );
}

export default Login_page;
