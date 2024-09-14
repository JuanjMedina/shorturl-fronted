const URL = 'http://localhost:5000';

interface IResponseAPI {
  shortUrl: string;
  url: string;
}

interface ICreateUSer {
  username: string;
  email: string;
  phone: string;
  password: string;
}
interface IResponseCreateUser {
  username: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}
interface IResponseLogin {
  AccessToken: string;
}

interface IinputLogin {
  userIdentifier: string;
  password: string;
}

type handleError = (message: string) => void;

export const createUrl = async (
  longUrl: string,
): Promise<IResponseAPI | undefined> => {
  try {
    console.log(longUrl);
    const response = await fetch(`${URL}/shorturl/createShortUrl`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ URL: longUrl }),
    });

    if (response.ok) {
      const data = (await response.json()) as IResponseAPI;
      return data;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error acortando la URL', error);
  }
};

export const createUserService = async (
  inputUser: ICreateUSer,
  handleErrors: handleError,
) => {
  try {
    const response = await fetch(`${URL}/user/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputUser),
    });
    if (response.ok) {
      const data = (await response.json()) as IResponseCreateUser;
      return data;
    }
    if (response.status === 400) {
      console.log('ENTRO !');
      handleErrors('Usuario ya se encuentra registado !');
    }
  } catch (Err) {}
};

export const loginUserService = async (inputLogin: IinputLogin) => {
  try {
    const response = await fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: inputLogin.userIdentifier,
        password: inputLogin.password,
      }),
    });
    if (response.ok) {
      const data = (await response.json()) as IResponseLogin;
      return data;
    }
  } catch (err) {}
};
