export const privateRoutes = (req, res, next) => {
  if (req.session.passport) return res.redirect('/api/session/current')
  next()
}

export const publicRoutes = (req, res, next) => {
  if (!req.session.passport) return res.redirect('/api/session/login')
  next()
}