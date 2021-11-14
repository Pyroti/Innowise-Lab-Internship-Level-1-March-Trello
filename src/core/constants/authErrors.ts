enum AuthError {
  userNotFound = 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).',
  emailAlreadyInUse = 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'
}

export default AuthError;
