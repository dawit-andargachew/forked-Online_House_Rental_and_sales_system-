import classes from "./LandingPage.module.css";
import img1 from "./images/hp1.jpg";
import img2 from "./images/hp7.jpg";
import img3 from "./images/hp4.webp";
import img4 from "./images/hp6.jpg";
import img5 from "./images/hp5.webp";
import img6 from "./images/hp3.webp";
import LatestHomes from "../components/home/LatestHomes";
import ImageSlider from "../components/ImageSlider";
import { useContext, useEffect } from "react";
import RetriveLocallyStoredData from "./Auth/RetriveLocallyStoredData";
import { UserContext } from "../contexts/UserContextProvider";

const LandingPage = () => {

  const { setToken, setUser } = useContext(UserContext)
  useEffect(() => {
    const { user_token, user_data } = RetriveLocallyStoredData();
    console.log('locally stored data is ');
    console.log('--- user_data', JSON.parse(user_data));
    setToken(JSON.parse(user_token))
    setUser(JSON.parse(user_data))

  }, [])

  // retrive locally stored user data 
  // useEffect(() => {
  //   let { user_token, user_data } = RetriveLocallyStoredData();
  //   setToken(JSON.parse(user_token))

  //   // console.log('--- user_data', JSON.parse(user_data));
  //   if (user_data._id) {
  //     // send request to the server
  //     let endpoint = ''
  //     if (user_data.userType === 'admin') {
  //       endpoint = 'admin'
  //     }
  //     else if (user_data.userType === 'owner') {
  //       endpoint = 'owner'
  //     } else {
  //       endpoint = 'tenant'
  //     }

  //     axios.get(`http://localhost:4000/${endpoint}/profile/:${user_data._id}`)
  //       .then((response) => {
  //         console.log('fetching user data on refresh is successful');
  //         console.log(response.data);
  //         setUser(response.data)
  //         window.localStorage.setItem("user-data", JSON.stringify(response.data));
  //       })
  //       .catch((error) => {
  //         console.log('error on fetching user specific data');
  //         console.log(error);
  //       });
  //   }

  // }, [])

  const img = {
    width: "100%",
    height: "85vh",
  };
  const sliderContainer = {
    width: "98%",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const images = [
    { url: img1 },
    { url: img2 },
    { url: img3 },
    { url: img4 },
    { url: img5 },
    { url: img6 },
  ];
  return (
    <>
      <ImageSlider images={images} sliderContainer={sliderContainer} imgDim={img} autoplay={true} duration={2000} />
      <div className={classes.moto}>
        <h1>Find your perfect home with Homiee!</h1>
        <p>We provide a complete service for sale, purchase, or rental of homes in Ethiopia!</p>
      </div>

      <LatestHomes forRent={true} />
      <LatestHomes />
    </>
  );
};

export default LandingPage;
