
import authApi from "../hooks/axiosTest";
import useAuth from "../hooks/useAuth";
import { NavBtnLink } from "../Components/NavBar/NavBarElements";
const Logout = () => {
  const { setAuth } = useAuth();
  var email = "",
    password = "",
    accessToken = "",
    role = "";
  const handleLogout = () => {
    authApi
      .post("/logout")
      .then((res) => {
        console.log(res);
        setAuth({ email, password, accessToken, role });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <NavBtnLink to="/" onClick={handleLogout}>
      Logout
    </NavBtnLink>
  );
};

export default Logout;
