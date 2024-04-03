import useForm from "../hooks/useForm";
import Global from "../helpers/Global";

const LogInPage = () => {
  const { formState, onInputChange } = useForm({});

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = formState;

    console.log(userToLogin);

    const request = await fetch(Global.url + "users/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    console.log(data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  return (
    <>
      <form className="" onSubmit={loginUser}>
        <div>
          <label htmlFor="nickname">Nickname</label>
          <input type="text" name="nickname" onChange={onInputChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={onInputChange} />
        </div>
        <input
          type="submit"
          value={"Identificate"}
          className="btn btn-success"
        />
      </form>
    </>
  );
};

export default LogInPage;
