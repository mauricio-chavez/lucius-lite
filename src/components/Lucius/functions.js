import Axios from 'axios';

const luciusApi = 'https://app.luciusreport.com/api'

const createReport = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Axios.post(`${luciusApi}/lucius-lite/`);
      const success = response.data.success;
      if (success) {
        resolve(success);
      } else {
        reject('Ha ocurrido un error al crear el reporte');
      }
    } catch (error) {
      reject(error.response.data);
    }
  });

};

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
        email: userResponse.data.email,
        isAdmin: userResponse.data.isAdmin,
        phoneNumber: userResponse.data.phoneNumber,
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
  signInWithLucius,
  createReport,
};