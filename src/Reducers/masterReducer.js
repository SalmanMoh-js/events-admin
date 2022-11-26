import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { dataReducer } from "./dataReducer";
import { errorReducer } from "./errorReducer";

export const masterReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  errors: errorReducer,
});
