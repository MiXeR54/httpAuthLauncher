import express, { Request, Response } from "express";
import { AuthReport, Error } from "./types";

const app = express();

// GET getUserByUsernameUrl
// GET getUserByLoginUrl
// GET getUserByUUIDUrl
// GET getUserByTokenUrl
// POST authorizeUrl
// POST refreshTokenUrl
// POST updateServerIdUrl
// POST joinServerUrl
// POST checkServerUrl

// Методы getUserByUsernameUrl, getUserByLoginUrl, getUserByUUIDUrl, checkServerUrl
// ожидают ответ типа HttpUser (См. Список объектов), а данные получают в виде GET параметров
// Метод getUserByTokenUrl ожидает ответ типа HttpUserSession (См. Список объектов)
// Методы authorizeUrl, refreshTokenUrl ожидают ответ типа AuthReport (См. Список объектов)
// Методы joinServerUrl,updateServerIdUrl ожидают ответ 200 в случае успеха

interface AuthorizeUrlReq {
  login: string;
  context: {
    ip: string;
  };
  password: {
    password: string;
    type: string;
  };
  minecraftAccess: boolean;
  //если false, то в AuthReport возвращать minecraftAccessToken не требуется
}

app.post(
  "/authorizeUrl",
  (
    req: Request<any, any, AuthorizeUrlReq>,
    res: Response<AuthReport | Error>
  ) => {
    const { login, context, password, minecraftAccess } = req.body;

    console.log("login", login);
    console.log("pass", password);

    if (!login && !password)
      return res.status(200).json({ error: "auth.wrongpassword" });

    if (login === "MiXeR54" && password.password === "test")
      return res.status(200).json({
        minecraftAccessToken: "",
        oauthAccessToken: "",
        oauthRefreshToken: "",
        oauthExpire: 0,
        session: {
          id: "",
          user: {
            username: login,
            uuid: "",
            accessToken: "",
            properties: {
              test: "",
            },
            permissions: {
              perms: [],
              roles: [],
            },
            assets: {
              SKIN: {
                url: "",
                digest: "",
                metadata: {
                  model: "",
                },
              },
              CAPE: {
                url: "",
                digest: "",
              },
            },
          },
          expireIn: 0,
        },
      });
  }
);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
