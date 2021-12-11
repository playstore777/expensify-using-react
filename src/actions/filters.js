// Changes the Filter.text
export const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text,
});

// Change the Filter.sortBy to amount.
export const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT",
});

// Change the Filter.sortBy to date.
export const sortByDate = () => ({
    type: "SORT_BY_DATE",
});

export const setStartDate = (startDate) => ({
    // if startDate not given, then it should be undefined(but not zero)
    type: "SET_START_DATE",
    startDate,
});

export const setEndDate = (endDate) => ({
    // if endDate not given, then it should be undefined(but not zero)
    type: "SET_END_DATE",
    endDate,
});
