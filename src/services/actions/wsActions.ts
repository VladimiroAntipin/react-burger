import { FeedData } from "../../utils/types";
import { CreateWsActions } from "../middlewares/socketMiddleware";

export type OrderFeedAction = CreateWsActions<"orderFeed", FeedData>;