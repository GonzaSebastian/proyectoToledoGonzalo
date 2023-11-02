import { UserService } from "../services/index.js"

export const privateRoutes = (req, res, next) => {
  if (req.session.passport) return res.redirect('/api/session/current')
  next()
}

export const publicRoutes = (req, res, next) => {
  if (!req.session.passport) return res.redirect('/api/session/login')
  next()
}

export const handlePolicies = allowedRoles => async(req, res, next) => {
  
  const user = await UserService.getUser(req.session?.passport?.user) || { role: "PUBLIC" }; 
  if (user && user.role && !allowedRoles.includes(user.role.toUpperCase())) {
      return res.status(403).json({
          status: "error",
          error: "Your role has no permission to do this action",
      });
  }
  
  return next();
};

// export const handlePolicies = allowedRoles => (req, res, next) => {
  
//   const user = req.user || { role: "PUBLIC" }; 
//   if (user && user.role && !allowedRoles.includes(user.role.toUpperCase())) {
//       return res.status(403).json({
//           status: "error",
//           error: "Your role has no permission to do this action",
//       });
//   }
  
//   return next();
// };