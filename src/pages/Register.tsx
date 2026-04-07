import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { checkRegisterFormData } from "../utils/checkRegisterFormData";
import { userApi, RegisterData } from "../services/userApi";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.currentTarget);
    const data: RegisterData = {
      userName: formData.get('userName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string
    };
    // Check if form data is valid
    if (!checkRegisterFormData(data)) return;

    try {
      // Call backend register API
      const response = await userApi.register(data);
      
      if (response.success) {
        toast.success(response.message || "User registered successfully");
        navigate("/login");
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error: any) {
      // Handle validation errors from backend
      if (error.response?.status === 400 && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.details) {
        // Handle Joi validation errors
        const validationErrors = error.response.data.details;
        if (Array.isArray(validationErrors)) {
          validationErrors.forEach((err: any) => {
            toast.error(err.message);
          });
        } else {
          toast.error("Validation failed. Please check your input.");
        }
      } else {
        toast.error(error.response?.data?.message || "An error occurred during registration");
      }
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto pt-24 flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="max-w-5xl mx-auto flex flex-col gap-5 max-sm:gap-3 items-center justify-center max-sm:px-5"
      >
        <h2 className="text-5xl text-center mb-5 font-thin max-md:text-4xl max-sm:text-3xl max-[450px]:text-xl max-[450px]:font-normal">
          Welcome! Register here:
        </h2>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="Enter username (2-20 characters)"
              id="userName"
              name="userName"
              minLength={2}
              maxLength={20}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="Enter email address"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Your password</label>
            <input
              type="password"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="Password: 8+ chars, 1 uppercase"
              id="password"
              name="password"
              required
            />
            <div className="text-xs text-gray-600 mt-1">
              <ul className="list-disc list-inside space-y-1">
                <li>At least 8 characters</li>
                <li>At least 1 uppercase letter</li>
                <li>Letters and numbers only</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="Confirm password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>
        </div>
        <Button type="submit" text="Register" mode="brown" />
        <Link
          to="/login"
          className="text-xl max-md:text-lg max-[450px]:text-sm"
        >
          Already have an account?{" "}
          <span className="text-secondaryBrown">Login now</span>.
        </Link>
      </form>
    </div>
  );
};
export default Register;
