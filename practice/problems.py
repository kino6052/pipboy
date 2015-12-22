def findAllSubsets(array, result=[]): # array: int[]; result: int[];
    if len(array)==0:
        result.append([])
        return result
    else:
        result = findAllSubsets(array[:-1], result)
    return updateResult(result, array[-1:][0])

def updateResult(result, lastItem): # result: int[]; lastItem: int;
    newResult = []
    for subset in result:
        newResult += [subset + [lastItem]]
    return result + newResult

print(findAllSubsets([1, 2, 3]))