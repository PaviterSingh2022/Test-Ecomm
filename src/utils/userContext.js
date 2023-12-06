import { createContext } from "react";

const userContext = createContext({
    user: {
        userId: null,
        email: null,
    }
})

userContext.displayName = "UserContext";

export default userContext;