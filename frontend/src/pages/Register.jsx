import Register_form from "../components/register_form";

function Register_page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Register</h1>

      <div className = "w-full max-w-md">
        <Register_form />
      </div>
    </div>
  );
}

export default Register_page;
