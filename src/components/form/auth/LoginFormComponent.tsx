"use client";
import { SubmitHandler, useForm } from "react-hook-form";
type loginRequest = {
  username: string;
  password: string;
};

export default function LoginFormComponent() {
  //Required props of useForm : register(: getInput) , handle submit(: logic use to handle register)
  //      , formState(: for handle Error in form )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // logic to handle the submit
  //   const handleLogin: SubmitHandler<loginRequest> = (user) => console.log(user);
  // call route handler instead :
  const handleLogin = async (userRequest: loginRequest) => {
    // const data = await 
    console.log("userReq",userRequest)
    const res = await fetch("/api/auth/login", {
      method: "POST",
      
      body: JSON.stringify(userRequest),
      headers: {
        "content-type": "application/json",
      },
    });
    const users = await res.json();

    console.log(userRequest);
    console.log("Users :",users)
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <label htmlFor="username">UserName</label>
      <br />
      <input
        type="text"
        placeholder="Enter your username"
        {...register("username")}
      />
      {/* error handle */}
      {errors.username && <p role="alert">{errors.username.message}</p>}
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        placeholder="Enter your Password"
        {...register("password")}
      />
      {errors.password && <p role="alert">{errors.password?.message}</p>}
      <br />
      <button type="submit">Sign in</button>
    </form>
  );
}
