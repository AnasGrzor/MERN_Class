import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value); // Validate on each change
  };

  const validateField = (fieldName, value) => {
    let error = "";

    if (fieldName === "username") {
      if (!value) {
        error = "Username is required";
      } else if (value.length < 4) {
        error = "Username must be at least 4 characters long";
      }
    }

    if (fieldName === "email") {
      if (!value) {
        error = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email is invalid";
      }
    }

    if (fieldName === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6 || value.length > 20) {
        error = "Password must be at least 6 characters long and at most 20 characters long";
      }
    }

    if (fieldName === "confirmPassword") {
      if (!value) {
        error = "Confirm Password is required";
      } else if (value !== formValues.password) {
        error = "Passwords do not match";
      }
    }

    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormValues({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "male",
    })

    // Check if there are any errors
    if (Object.values(errors).some((error) => error !== "")) {
      console.log("Form has errors");
      setTimeout(() => {
        setErrors({});
      }, 3000);
    } else {
      const res = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
      if (res.status === 201) {
        alert("Form submitted successfully");
      }
      else {
        alert("Form submission failed");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-3.275rem)] bg-purple-300  ">
        <form
          className="flex flex-col p-6 bg-purple-100 md:w-1/3 sm:w-2/3 w-full rounded-xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl">Sign Up</h1>
          <label className="my-3">Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            required
            className="mb-3 rounded-md p-1 bg-slate-100"
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
            className="mb-3 rounded-md p-1 bg-slate-100"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
            className="mb-3 rounded-md p-1 bg-slate-100"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            required
            className="mb-3 rounded-md p-1 bg-slate-100"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
          <label className="my-3">Gender</label>
          <select
            className="mb-3 rounded-md p-1 bg-slate-100"
            value={formValues.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button
            type="submit"
            className="my-3 rounded-md px-4 py-2 bg-purple-400 hover:bg-purple-700"
          >
            Submit
          </button>
          <div>
            <p className="text-center text-sm text-gray-600 ">
              Already have an account?{" "}
              <Link
                to="/signin"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
