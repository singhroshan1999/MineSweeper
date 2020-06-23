import createDataContext from './createDataContext';
import createMatrix, { dfs_uncover_zeros } from '../engine/minesweeper';

const dummy = (i, j) => createMatrix(0, 0, i, j, 0, [1, 1, 1, 1, 1, 1, 1, 1, 1]);
function reducer(state, action) {
    switch (action.type) {
        case 'uncover':
            let coords = action.payload;
            state[0]["unCoverCount"] += dfs_uncover_zeros(state[1], coords[2], coords[3], state[2][0], state[2][1], false);
            if (state[0]["unCoverCount"] === (state[2][0] * state[2][1] - state[2][2] + 1)) {
                state[0]["isMined"] = false;
                state[0]["isOver"] = true;
            }
            coords[1] = 2;
            let tstate = state[1][coords[2]];
            tstate[coords[3]] = coords;
            tstate = [...tstate];
            state[1][coords[2]] = tstate;
            return [...state];
        case 'firstmove':
            let coords2 = action.payload;
            let tstate2 = createMatrix(coords2[2], coords2[3], state[2][0], state[2][1], state[2][2], state[2][3]);
            state[0]["unCoverCount"] += dfs_uncover_zeros(tstate2, coords2[2], coords2[3], state[2][0], state[2][1], true);
            state[1] = tstate2;
            return [...state];
        case 'mark':
            let coords3 = action.payload;
            coords3[1] = (coords3[1] === 0) ? 1 : 0;
            let tstate3 = state[1][coords3[2]];
            tstate3[coords3[3]] = coords3;
            state[1][coords3[2]] = tstate3;
            state[0]["marked"]++;
            state = [...state];
            return state;
        case 'setmoved':
            state[0] = { ...state[0], isMoved: true }
            return [...state];
        case 'setmined':
            state[0] = { ...state[0], isMined: true, isOver: true, minedAt: [action.payload[2], action.payload[3]] }
            return [...state];
        case 'config':
            state[2] = action.payload;
            return [...state];
        case 'reinit':
            state[0] = { isMoved: false, isMined: false, isOver: false, unCoverCount: 0, minedAt: [0, 0], marked: 0 };
            state[1] = dummy(state[2][0], state[2][1]);
            return [...state];
    }
}

const unCover = (dispatch) => {
    return (coords) => {
        dispatch({ type: "uncover", payload: coords });
    }
}

const firstMove = (dispatch) => {
    return (coords) => {
        dispatch({ type: "firstmove", payload: coords });
    }
}
const setMoved = (dispatch) => {
    return () => {
        dispatch({ type: "setmoved" });
    }
}

const setMined = (dispatch) => {
    return (coords) => {
        dispatch({ type: "setmined", payload: coords });
    }
}
const markMines = (dispatch) => {
    return (coords) => {
        dispatch({ type: "mark", payload: coords });
    }
}

const configMatrix = (dispatch) => {
    return (config) => {
        dispatch({ type: "config", payload: config });
    }
}

const reInit = (dispatch) => {
    return () => {
        dispatch({ type: "reinit" });
    }
}

export const { Context, Provider } = createDataContext(reducer, {
    unCover,
    firstMove,
    markMines,
    setMoved,
    setMined,
    configMatrix,
    reInit,
}, [{ isMoved: false, isMined: false, isOver: false, unCoverCount: 0, minedAt: [0, 0], marked: 0 }, dummy(20, 20), [20, 20, 16, [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], 30]]);