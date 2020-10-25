
const validate = async (token) => {
    //run only on server
    if(!process.browser){
        const firebaseAdmin = require('../../firebaseAdmin');
        // Check that the user has a valid token
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token, true);
        // Get user Firebase data from token
        const user = await firebaseAdmin.auth().getUser(decodedToken.uid);

        return user;
    }
};
export default validate;