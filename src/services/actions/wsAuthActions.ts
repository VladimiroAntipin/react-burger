import { FeedData } from "../../utils/types";
import { CreateWsActions } from "../middlewares/socketMiddleware";

export type OrderHistoryAction = CreateWsActions<"orderHistory", FeedData>;