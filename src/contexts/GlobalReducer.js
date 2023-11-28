const GlobalReducer = (state, action) => {
    switch (action.type) {
        case "LOADER":
            return {
                ...state,
                is_loading: true
            };

        case "GET_QUERY1":
            return {
                ...state,
                query1: action.payload,
                is_loading: false
            }

        case "GET_QUERY2":
            return {
                ...state,
                query2: action.payload,
                is_loading: false
            }

        case "GET_QUERY3":
            return {
                ...state,
                query3: action.payload,
                is_loading: false
            }

        case "GET_QUERY4":
            return {
                ...state,
                query4: action.payload,
                is_loading: false
            }

        case "GET_QUERY5":
            return {
                ...state,
                query5: action.payload,
                is_loading: false
            }

        case "GET_AREAS":
            return {
                ...state,
                areas: action.payload,
                is_loading: false
            }

        case "GET_WEAPONS":
            return {
                ...state,
                weapons: action.payload,
                is_loading: false
            }

        case "GET_RECORD_COUNT":
            return {
                ...state,
                total_records: action.payload,
                is_loading: false
            }
        case "GET_CRIME_BY_YEAR":
            return {
                ...state,
                crimesByYear: action.payload,
                is_loading: false
            }

        case "GET_CRIME_COUNT_WEAPONS":
            return {
                ...state,
                crimeWeapons: action.payload,
                is_loading: false
            }

        case "GET_CRIME_COUNT_AREA":
            return {
                ...state,
                areasCrime: action.payload,
                is_loading: false
            }
        default:
            return state;
    }
};
export default GlobalReducer;
