import { toastError } from "@/utils/api.utils";
import { MiddlewareAPI, Middleware, isRejectedWithValue } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) =>
        next =>
            action => {
                if (isRejectedWithValue(action)) {
                    toastError(action.error, "RTL error")
                }

                return next(action)
            }