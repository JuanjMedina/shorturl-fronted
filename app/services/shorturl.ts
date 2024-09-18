export const URL = 'http://localhost:5000';

interface IResponseAPI {
  shortUrl: string;
  url: string;
}

interface ICreatePersonalizeUrl {
  name: string;
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

export interface IShortURLUSer {
  _id: string;
  url: string;
  shortUrl: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
interface IChangeUrl {
  idUrl: string;
  newUrl: string;
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

export const userUrlsService = async (): Promise<
  IShortURLUSer[] | undefined
> => {
  try {
    const token = window.localStorage.getItem('token');
    const response = await fetch(`${URL}/shorturl/shortUrlsUser`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = (await response.json()) as IShortURLUSer[];
      return data;
    } else {
      console.error('Failed to fetch user URLs:', response.statusText);
      return undefined;
    }
  } catch (err) {
    console.error('Error fetching user URLs:', err);
    return undefined;
  }
};

export const createPersonalizeUrl = async ({
  data,
}: {
  data: ICreatePersonalizeUrl;
}) => {
  try {
    const { name, url } = data;
    const token = window.localStorage.getItem('token');
    const response = await fetch(`${URL}/shorturl/createShortUrlPersonalize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        URL: url,
        name: name,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (Err) {}
};

export const updatePersonalizeUrl = async ({ idUrl, newUrl }: IChangeUrl) => {
  try {
    const response = await fetch(`${URL}/shorturl/${idUrl}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: newUrl,
      }),
    });
    if (response.ok) {
      const data = response.json();
      return data;
    }
  } catch (Err) {}
};
