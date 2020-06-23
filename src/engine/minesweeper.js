function isEmptyAround(matrix, x, y, szx, szy, comp) {
    let flag = 0;
    for (let i = Math.max(0, x - 1); i <= Math.min(szx - 1, x + 1); i++) {
        for (let j = Math.max(0, y - 1); j <= Math.min(szy - 1, y + 1); j++) {
            if (!(x == i && y == j) && matrix[i][j] != comp) {
                flag++;
            }
        }
    }
    return flag;
}

function countMines(matrix, x, y, szx, szy) {
    let flag = 0;
    for (let i = Math.max(0, x - 1); i <= Math.min(szx - 1, x + 1); i++) {
        for (let j = Math.max(0, y - 1); j <= Math.min(szy - 1, y + 1); j++) {
            if (!(x == i && y == j) && matrix[i][j] === -2) {
                flag++;
            }
        }
    }
    return flag;
}

function fillMines(matrix, piviot, i, j, szx, szy, mines) {
    let rand = Math.random();
    switch (isEmptyAround(matrix, i, j, szx, szy, -2)) {
        case 0:
            if (rand >= piviot[0] && rand <= piviot[1]) {
                matrix[i][j] = -2;
                mines--;
            }
            break;
        case 1:
            if (rand >= piviot[1] && rand <= piviot[2]) {
                matrix[i][j] = -2;
                mines--;
            }
            break;
        case 2:
            if (rand >= piviot[2] && rand <= piviot[3]) {
                matrix[i][j] = -2;
                mines--;
            }
            break;
        case 3:
            if (rand >= piviot[3] && rand <= piviot[4]) {
                matrix[i][j] = -2;
                mines--;
            }
            break;
        case 4:
            if (rand >= piviot[4] && rand <= piviot[5]) {
                matrix[i][j] = -2;
                mines--;
            }
            break;
        case 5:
            if (rand >= piviot[5] && rand <= piviot[6]) {
                matrix[i][j] = -2;
                mines--;
            }
            break;
        case 6:
            if (rand >= piviot[6] && rand <= piviot[7]) {
                matrix[i][j] = -2;
                mines--;
            }
            break;
        case 7:
            if (rand >= piviot[7] && rand <= piviot[8]) {
                matrix[i][j] = -2;
                mines--;
            }
            break;
        case 8:
            if (rand >= piviot[8] && rand <= piviot[9]) {
                matrix[i][j] = -2;
                mines--;
            }
            break;
    }
}

function createMatrix(x, y, szx, szy, mines, piviot) {
    let matrix = [];
    for (let i = 0; i <= szx; i++) {
        temp = [];
        for (let j = 0; j <= szy; j++) {
            temp.push(0);
        }
        matrix.push(temp);
    }
    /*
    * -1 --> empty
    * -2 --> mine
    * 1...7 --> numbers
    */
    matrix[x][y] = -1;
    while (mines > 0) {
        for (let i = 0; i < szx && mines > 0; i++) {
            if (i % 2 == 0) {
                for (let j = 0; j < szy && mines > 0; j++) {
                    if (matrix[i][j] !== 0) continue;
                    fillMines(matrix, piviot, i, j, szx, szy, mines);
                    if (matrix[i][j] == -2) {
                        mines--;
                        break
                    }
                }
            } else {
                for (let j = szy; j >= 0 && mines > 0; j--) {
                    if (matrix[i][j] !== 0) continue;
                    fillMines(matrix, piviot, i, j, szx, szy, mines);
                    if (matrix[i][j] == -2) {
                        mines--;
                        break
                    }
                }
            }
        }
    }
    for (let i = 0; i < szx; i++) {
        for (let j = 0; j < szy; j++) {
            if (matrix[i][j] === -2 || matrix[i][j] > 0) continue;
            matrix[i][j] = countMines(matrix, i, j, szx, szy);
        }
    }
    /*
    * 0 --> hidden
    * 1 --> marked
    * 2 --> shown
    */
    let out_obj = [];
    for (let i = 0; i < szx; i++) {
        let temp = [];
        for (let j = 0; j < szy; j++) {
            let temp2 = [matrix[i][j], 0, i, j];
            temp.push(temp2);
        }
        out_obj.push(temp);
    }
    return out_obj;
}

export function dfs_uncover_zeros(out_obj, x, y, szx, szy, flag) {
    if (out_obj[x][y][0] !== 0 && !flag) {
        out_obj[x][y][1] = 2;
        return 1;
    }
    if (out_obj[x][y][1] != 0) return 0;
    out_obj[x][y][1] = 2;
    let count = 1;
    for (let i = Math.max(0, x - 1); i <= Math.min(szx - 1, x + 1); i++) {
        for (let j = Math.max(0, y - 1); j <= Math.min(szy - 1, y + 1); j++) {
            if (out_obj[i][j][1] === 0 && (out_obj[i][j][0] === 0 || (out_obj[i][j][0] > 0 && out_obj[x][y][0] === 0))) count += dfs_uncover_zeros(out_obj, i, j, szx, szy, false);
        }
    }
    return count;
}

export default createMatrix;
