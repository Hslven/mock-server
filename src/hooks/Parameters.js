export function getNewActivityParameters() {
  return {
    id:"",
    title: "",
    url: "",
    // json: "return {\r\n    \r\n}",
    json: "{\r\n    \r\n}",
    method: "GET",
  };
}

export const httpMethodOptions = [
  {
    label: "GET",
    value: "GET",
  },
  {
    label: "POST",
    value: "POST",
  },
  {
    label: "PUT",
    value: "PUT",
  },
  {
    label: "DELETE",
    value: "DELETE",
  },
  {
    label: "PATCH",
    value: "PATCH",
  },
];
