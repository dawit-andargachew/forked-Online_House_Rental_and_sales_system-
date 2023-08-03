const { hashPassword } = require("./passwordHash")

async function changePassword(req, res, userModel) {
  const id = await getUser(req, res)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid id'})
  }

  // Validate the new password
  const newPassword = req.body.password
  if (!newPassword) {
    return res.status(400).json({error: 'New password is required'})
  }
  // add your own password validation code here

  const hashedPassword = await hashPassword(newPassword)

  const user = await userModel.findOneAndUpdate({ _id: id }, {
    password: hashedPassword
  })
  if (!user) {
    return res.status(400).json({error: 'No such user'})
  }
  res.status(200).json({message:"Password updated successfully"})
}

module.exports = { changePassword }
