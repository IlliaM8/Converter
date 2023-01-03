export const loadingCheck = (status, curr) => {
  switch (status) {
    case "pending":
      return [{ label: "Загрузка", value: 1 }];
    case "rejected":
      return [{ label: "Ошибка подключения", value: 1 }];
    default:
      return curr;
  }
};
