import { ADD_BLOG_FAIL, ADD_BLOG_PENDING, ADD_BLOG_REQUEST, ADD_BLOG_SUCCESS, GET_BLOGS_FAIL, GET_BLOGS_PENDING, GET_BLOGS_REQUEST, GET_BLOGS_SUCCESS, GET_BLOG_FAIL, GET_BLOG_PENDING, GET_BLOG_REQUEST, GET_BLOG_RESET, GET_BLOG_SUCCESS } from "../constants/blogConstants";

export const addBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_BLOG_REQUEST:
      return { loading: true };
    case ADD_BLOG_PENDING:
      return { loading: false, blogInfo: { title: action.payload } };
    case ADD_BLOG_SUCCESS:
      return { loading: false, blogInfo: action.payload };
    case ADD_BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBlogsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BLOGS_REQUEST:
      return { loading: true };
    case GET_BLOGS_PENDING:
      return { loading: false, blogs: { title: action.payload } };
    case GET_BLOGS_SUCCESS:
      return { loading: false, blogs: action.payload };
    case GET_BLOGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BLOG_REQUEST:
      return { loading: true };
    case GET_BLOG_PENDING:
      return { loading: false, data: { title: action.payload } };
    case GET_BLOG_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_BLOG_RESET:
      return { loading: false, data: {} };
    case GET_BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};