export function requestApi(req: any, res: any, next: () => void) {
  req.url = req.url.split('api')[1];
  next();
}
