export function formatingNumber(num) {
  return num.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}

export function redirect(path) {
  window.location.href = path;
}

export function apiUrl(path) {
  return process.env.REACT_APP_API_URL + path;
}

export function baseUrl(path) {
  return process.env.REACT_APP_BASE_URL + path;
}
