import { toast } from "react-toastify";
import {
  ADD_BLOG_FAIL,
  ADD_BLOG_REQUEST,
  ADD_BLOG_SUCCESS,
  GET_BLOGS_FAIL,
  GET_BLOGS_REQUEST,
  GET_BLOGS_SUCCESS,
  GET_BLOG_FAIL,
  GET_BLOG_REQUEST,
  GET_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_PENDING,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  GET_BLOG_RESET,
} from "../constants/blogConstants";
import axios from "axios";

export const addBlog =
  (title, intro, description) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_BLOG_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/addBlog`,
        { title, intro, description },
        config
      );

      dispatch({
        type: ADD_BLOG_SUCCESS,
        payload: data,
      });

      toast.success("Blog added Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      return true;
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
        type: ADD_BLOG_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      
      return false;
    }
  };

export const getBlogs = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_BLOG_RESET,
    });

    dispatch({
      type: GET_BLOGS_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/blog/getBlogs`,
      config
    );

    dispatch({
      type: GET_BLOGS_SUCCESS,
      payload: data,
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
      type: GET_BLOGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BLOG_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/blog/getBlog/${id}`,
      config
    );

    dispatch({
      type: GET_BLOG_SUCCESS,
      payload: data,
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
      type: GET_BLOG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateBlog =
  (id, title, intro, description) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_BLOG_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/updateBlog/${id}`,
        { title, intro, description },
        config
      );

      dispatch({
        type: UPDATE_BLOG_SUCCESS,
        payload: data,
      });

      toast.success("Blog Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      return true;
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
        type: UPDATE_BLOG_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      return false;
    }
  };

export const deleteBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_BLOG_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/blog/deleteBlog/${id}`,
      config
    );

    dispatch({
      type: DELETE_BLOG_SUCCESS,
      payload: data,
    });

    toast.success("Blog Deleted Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });

    return true;
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
      type: DELETE_BLOG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    return false;
  }
};
