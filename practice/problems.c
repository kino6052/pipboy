int resultIndex = 0;

// Takes in Array and Result Array with its Index
int* findAllSubsets(int array[3], int* result[100], int arrayIndex){
    if (arrayIndex == 0){
        int emptyArray[100] = {null};
        result[resultIndex] = emptyArray;
        resultIndex++;
        return result;
    }
    else result = findAllSubsets(array, result, arrayIndex-1);
    return updateResult(result, array[arrayIndex]);
}

int updateResult(int* result[100], int lastItem){
    int* newResult[100] = {};
    for (int i=0; i<resultIndex; i++){
        int arrayHolder = result[i];
        
    }
}