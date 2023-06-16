import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContextProvider";
import { UtilityContext } from "../../contexts/UtilityContextProvide";

export default function LoginPage({ isAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [userrType, setUserType] = useState("");
  const { userType, setUser, setToken, token, user } = useContext(UserContext);



  // save user info on local storage
  useEffect(() => {
    window.localStorage.setItem('user-token', JSON.stringify(token))
    window.localStorage.setItem('user-profile-data', JSON.stringify(user))
  }, [token])


  // for admin purpose
  const { setOwnersList, setTenatList, setHousesList, setBuyerList, AdminsList, setAdminList } = useContext(UtilityContext)
  useEffect(() => {

    // get all tenants
    axios.get('http://localhost:4000/tenant/all')
      .then((response) => {
        console.log(' admin is logged in and tenant is ');
        const both = response.data;

        // set tenant
        const tenant = both.filter((te) => te.userType === 'tenant')
        setTenatList(tenant)

        // set buyer
        const buyer = both.filter((te) => te.userType === 'buyer')
        setBuyerList(buyer)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // get all ADMINS
    axios.get('http://localhost:4000/admin/all')
      .then((response) => {
        console.log(' list of admins ');
        console.log(response.data);
        setAdminList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

    // get all owners
    axios.get('http://localhost:4000/owner/all')
      .then((response) => {
        console.log(' admin is logged in and owner is ');
        console.log(response.data);
        setOwnersList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

    /// load home data what ever the user is
    axios.get('http://localhost:4000/houses/all')
      .then((response) => {
        console.log(' admin is logged in and houses is ');
        console.log(response.data);
        setHousesList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);


  async function handleLoginSubmit(ev) {

    ev.preventDefault();

    if (isAdmin) {
      setUserType(prev => 'admin')
    }
    console.log(" email : " + email);
    console.log(" password : " + password);
    console.log(" userType : " + userrType);
    axios
      .post(`http://localhost:4000/${userrType}/login`, { email, password })
      .then((response) => {
        let userData = response.data.user
        userData.userType = userrType

        console.log("success logged in");
        console.log(userData);
        console.log('token is ' + response.data.token);

        setToken(response.data.token)
        setUser(userData)
        setRedirect('/')

      })
      .catch((error) => {
        console.log(" error message ");
        console.log(error);
      });

  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  function handleSelect(e) {
    setUserType(e.target.name);
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4"> {isAdmin && (<span> Admin </span>)}  Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />

          {/* for user choice */}
          {!isAdmin && (<div className="my-4">
            <p className="font-medium">Who are you?</p>
            <div className="flex gap-4">
              <label>
                <input

                  type="radio"
                  name="owner"
                  checked={userrType === "owner"}
                  onChange={handleSelect}
                />
                <span>Homeowner</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="tenant"
                  checked={userrType === "tenant"}
                  onChange={handleSelect}
                />
                <span>Tenant</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="buyer"
                  checked={userrType === "buyer"}
                  onChange={handleSelect}
                />
                <span>Buyer</span>
              </label>
            </div>
          </div>)}

          <button className="primary bg-lightBlue hover:bg-lbHover Hover mt-4">
            Login
          </button>

          {!isAdmin && (
            <div className="text-center py-2 text-gray-500">
              Don't have an account yet?{" "}
              <Link className="underline text-black" to={"/register"}>
                Register now
              </Link>
            </div>)}
        </form>
      </div>
    </div>
  );
}