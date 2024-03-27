export function Paginate(itemsPerPage, dataList, currentPage) {

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedList = dataList.slice(start, end);

    return paginatedList;

  }