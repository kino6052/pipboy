def findAllSubsets(array, result=[]): # array: int[]; result: int[];
    if type(array) != type([]):
        raise Exception("array is not Array")
    if type(result) != type([]):
        raise Exception("result is not Array")
    if len(array)==0:
        result.append([])
        return result
    else:
        result = findAllSubsets(array[:-1], result)
    return updateResult(result, array[-1:][0])


def updateResult(result, lastItem): # result: int[]; lastItem: int;
    if type(result) != type([]):
        raise Exception("result is not Array")
    if type(lastItem) != type(1):
        raise Exception("lastItem is not Int")
    newResult = []
    for subset in result:
        newResult += [subset + [lastItem]]
    return result + newResult

print(findAllSubsets([1, 2, 3]))