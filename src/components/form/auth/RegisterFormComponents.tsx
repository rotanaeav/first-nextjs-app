"use client";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
type registerRequest = {
  firstName: string;
  lastName: string;
  age: number;
};
// we need to use try catch for good practise and redirect() will not work becuase it throw error ;
export default function RegisterFormComponents() {
  //Required props of useForm : register(: getInput) , handle submit(: logic use to handle register)
  //      , formState(: for handle Error in form )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
    },
  });
  // logic to handle the submit
  //   const handleLogin: SubmitHandler<loginRequest> = (user) => console.log(user);
  // call route handler instead :
  const handleRegister = async (registerReq: registerRequest) => {
    // const data = await
    console.log("userReq", registerReq);
    const res = await fetch("/api/auth/register", {
      method: "POST",

      body: JSON.stringify(registerReq),
      headers: {
        "content-type": "application/json",
      },
    });
    const users = await res.json();
    if(res.ok){
        redirect('/login')
    }

    console.log(registerReq);
    console.log("Users :", users);
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <label htmlFor="FirstName">FirstName</label>
      <br />
      <input
        type="text"
        placeholder="Enter First Name"
        {...register("firstName")}
      />
      {/* error handle */}
      {errors.firstName && <p role="alert">{errors.firstName.message}</p>}
      <br />
      <label htmlFor="LastName">LastName</label>
      <br />
      <input
        type="text"
        placeholder="Enter Last Name"
        {...register("lastName")}
      />
      {errors.lastName && <p role="alert">{errors.lastName?.message}</p>}
      <br />
      <label htmlFor="Age">Age</label>
      <br />
      <input type="number" placeholder="Enter age" {...register("age")} />
      {errors.age && <p role="alert">{errors.age?.message}</p>}
      <br />
      <button type="submit">Sign in</button>
    </form>
  );
}
