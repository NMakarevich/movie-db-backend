export function requestApi(req: any, res: any, next: () => void) {
  req.url = req.url.startsWith('/api') ? req.url.split('api')[1] : req.url;
  next();
}
