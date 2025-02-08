function useDataFilter(tasks, filter) {
  let filterData = [];
  const curDate = new Date().toDateString();
  if (filter == "Pending Tasks") {
    filterData = tasks.filter((node) => {
      return (
        new Date(node.dueDate) >= new Date(curDate) && node.status == "Pending"
      );
    });
  } else if (filter == "Completed Tasks") {
    filterData = tasks.filter((node) => {
      return node.status == "Completed";
    });
  } else if (filter == "Overdue Tasks") {
    filterData = tasks.filter((node) => {
      return (
        new Date(node.dueDate) < new Date(curDate) && node.status == "Pending"
      );
    });
  } else {
    filterData = tasks;
  }

  return filterData;
}

export default useDataFilter;
