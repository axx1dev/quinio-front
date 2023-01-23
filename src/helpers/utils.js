import axios from 'axios';

export const generateArrayToCSV = (arrOld) => {
    let newArray = []
    for (let index = 0; index < arrOld.length; index++) {
      newArray.push({
        startDateOfWeek: arrOld[index].createdAt,
        weekOfYear: (arrOld[index].originDetails?.details?.length || 0),
        noTransactions: (arrOld[index].originDetails?.details?.length || 0) * 2,
        totalSales: arrOld[index].saleAmount,
        rewardAmount: arrOld[index].rewardAmount,
        transactionkey: (arrOld[index].originDetails?.transactionkey || 0),
        redeemedAmount: (arrOld[index].originDetails?.subtotal || 0),
        expiredTransaction: (arrOld[index].originDetails?.details?.length || 0),
        expiredAmount: arrOld[index].amountUsed,
        availableBalance: (arrOld[index].originDetails?.total || 0)
      })
    }
    return newArray
}

export const sortDataTable = (data, field, sort, setStateSort, setStateData) => {
    if (sort) {
        setStateData(data.sort((p1, p2) => (p1[field] < p2[field]) ? 1 : (p1[field] > p2[field]) ? -1 : 0))
        setStateSort(!sort)
        return
    }
    setStateData(data.sort((p1, p2) => (p1[field] > p2[field]) ? 1 : (p1[field] < p2[field]) ? -1 : 0));
    setStateSort(!sort)
    return
}

export const getData = (setState, setStatePage, page, limit, startDate = '', endDate = '') => {
    const endpoint = "http://127.0.0.1:3000"
    const filterDate = startDate !== '' && endDate !== ''? `/${startDate}/${endDate}` : '';
    
    axios.get(`${endpoint}/get-data-purses/${page}/${limit}${filterDate}`)
    .then((res) => {
        setState(res.data.data)
        setStatePage(res.data.pages)
    })
    .catch((error) => {
        console.error(error)
    })
}