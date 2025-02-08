function useSortingFilter(tasks, filter) {
  let filterData = tasks;
  if (filter == "Sort By Due-Date (Asc)") {
    filterData.sort((a, b) => {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  } else if (filter == "Sort By Due-Date (Desc)") {
    filterData.sort((a, b) => {
      return new Date(b.dueDate) - new Date(a.dueDate);
    });
  } else if (filter == "Sort By Created At (Desc)") {
    filterData.sort((a, b) => {
      return new Date(b.createdDate) - new Date(a.createdDate);
    });
  } else if (filter == "Sort By Created At (Asc)") {
    filterData.sort((a, b) => {
      return new Date(a.createdDate) - new Date(b.createdDate);
    });
  }
  return filterData;
}

export default useSortingFilter;
