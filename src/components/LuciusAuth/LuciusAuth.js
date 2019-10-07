import Axios from 'axios';

const luciusApi = 'https://app.luciusreport.com/api'

const signInWithLucius = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenResponse = await Axios.post(`${luciusApi}/token/`, { email, password });
      const accessToken = tokenResponse.data.access;
      const refreshToken = tokenResponse.data.refresh;
      const config = {
        headers: {
          'authorization': `JWT ${accessToken}`
        }
      }
      const userResponse = await Axios.post(`${luciusApi}/user-detail`, {}, config);
      resolve({
        accessToken,
        refreshToken,
        displayName: userResponse.data.displayName,
        phoneNumber: userResponse.data.phoneNumber,
        email: userResponse.data.email,
      });
    } catch (error) {
      if (error.response.data.non_field_errors && error.response.data.non_field_errors[0] === 'No active account found with the given credentials') {
        reject('No existe una cuenta con las credenciales proporcionadas.');
      } else {
        reject('Ha ocurrido un error al intentar autenticar al usuario.');
      }
    }
  });
}

export {
  signInWithLucius
};