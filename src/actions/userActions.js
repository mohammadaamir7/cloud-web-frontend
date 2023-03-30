import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  PDF_FILE_REQUEST,
  PDF_FILE_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const register =
  (email, password, firstName, lastName, role) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
        { email, password, firstName, lastName },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      toast.success("User Registered Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(
        `${
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        }`,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        }
      );
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    toast.success("Loged In Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  } catch (error) {
    toast.error(`Invalid Email/Password`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendEmail =
  (email, firstName, lastName, city, phone) => async (dispatch) => {
    if (!email || !firstName || !lastName || !city || !phone) {
      return;
    }
    try {
      dispatch({
        type: SEND_EMAIL_REQUEST,
      });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/sendEmail`,
        { email, firstName, lastName, city, phone },
        config
      );

      dispatch({
        type: SEND_EMAIL_SUCCESS,
        payload: data,
      });
      toast.success("Request sent successfully.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Error in sending Request.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/";
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/profile`,
      config
    );
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/profile`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));

    toast.success("Profile updated Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  } catch (error) {
    toast.error("Error in updating profile.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};
