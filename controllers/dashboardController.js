

const dashboard = async(req, res) => {
  const userRole = req.user.role;
  if(userRole === 'admin') {
     res.redirect('/dashboard/admin');
  }
  else{
    res.redirect('/dsahboard/user');
}

}

const adminDashboard = async(req, res) => {
  if(req.user.role !== 'Admin') return res.sendStatus(403)
  res.send('Welcome to admin dashboard');
}

const userDashboard = async(req, res) => {
  res.send('Welcome to user dashboard')
}