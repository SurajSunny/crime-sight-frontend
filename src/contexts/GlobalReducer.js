const GlobalReducer = (state, action) => {
    switch (action.type) {
        case "LOADER":
            return {
                ...state,
                is_loading: true
            };

        //-------GET QUERY 1-----------
        case "GET_QUERY1":
            return {
                ...state,
                query1: action.payload,
                is_loading: false
            }

        case  "GET_AREAS":
            return {
                ...state,
                areas: action.payload,
                is_loading: false
            }
        default:
            return state;
    }
};
export default GlobalReducer;
