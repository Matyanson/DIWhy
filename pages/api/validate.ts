import firebaseAdmin from '../../firebaseAdmin';

const validate = async (token) => {
  // Check that the user has a valid token
  const decodedToken = await firebaseAdmin.auth().verifyIdToken(token, true);
  // Get user Firebase data from token
  const user = await firebaseAdmin.auth().getUser(decodedToken.uid);

   return user;
};

export default async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    // Check if there is a token and if not return undefined.
    console.log("STARt OF VALIDAte");
    console.log(req.headers.authorization);
    const { token } = JSON.parse(req.headers.authorization || '{}');
    if (!token) {
      return res.status(403).send({
        errorCode: 403,
        message: 'Auth token missing.',
      });
    }
    console.log("VALIDATE")
    console.log(token);
    // Call the validate function above that gets the user data.
    const result = await validate(token);
    res.status(200).json(result);
    return result;
  } catch (err) {
    // Return undefined if there is no user. You may also send a different status or handle the error in any way that you wish.
    console.log("error in validate");
    console.log(err);
    const result = undefined;
    res.status(500).json(result);
    return result;
  }
};