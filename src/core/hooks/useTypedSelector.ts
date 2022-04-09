import { TypedUseSelectorHook, useSelector } from "react-redux";
import { rootReducer } from "../redux/reducers/rootReducer";

type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;