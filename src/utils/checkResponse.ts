export function checkResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json() as Promise<T>;
  } else {
    return res.json().then(err => Promise.reject(err));
  }
}