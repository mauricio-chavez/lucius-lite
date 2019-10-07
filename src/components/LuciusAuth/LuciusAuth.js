import Axios from 'axios';

const luciusApi = 'https://app.luciusreport.com/api'

// {
//   headers: {
//     'Authorization': `JWT <token>`
//   }
// })

const signInWithLucius = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Axios.post(`${luciusApi}/token/`, { email, password });
      console.log(response);
      resolve({
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      });
    } catch (error) {
      if (error.response.data.non_field_errors[0] === 'No active account found with the given credentials') {
        reject('No existe una cuenta con las credenciales proporcionadas.');
      } else {
        reject('Ha ocurrido un error al intentar autenticar al usuario.')
      }
    }
  });
}

export {
  signInWithLucius
};