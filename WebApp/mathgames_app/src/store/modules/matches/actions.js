export function addMatch(match) {
    return {
        type: 'ADD_MATCH',
        match,
    }
}

export function removeMatch(match) {
    return {
        type: 'REMOVE_MATCH',
        match,
    }
}
