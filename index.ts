import express, { Request, Response } from "express";
import morgan from "morgan";
import { AuthReport, Error, HttpUser } from "./types";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

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

// GET getUserByUUIDUrl
app.get("/auth/user/uuid/:uuid", (req, res: Response<HttpUser>) => {
  console.log("getUserByUUIDUrl");
  res.json({
    username: "MiXeR54",
    uuid: req.query.uuid as string,
    accessToken: "",
    permissions: {},
  });
});

// GET getUserByUsernameUrl
app.get("/auth/user/name/:username", (req, res: Response<HttpUser>) => {
  console.log("getUserByUsernameUrl");
  res.json({
    username: req.query.username as string,
    uuid: "220a22d3-6c48-43c8-84c2-f66a399cafe5",
    accessToken: "",
    permissions: {},
  });
});

interface CheckServerReq {
  username: string;
  serverId: string;
}
// POST checkServerUrl
app.post("/auth/checkServer", (req: Request<any, any, CheckServerReq>, res) => {
  console.log("checkServerUrl");
  const { username, serverId } = req.body;
  res.json({
    username,
    uuid: "220a22d3-6c48-43c8-84c2-f66a399cafe5",
    accessToken: "",
    permissions: {},
  });
});

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
// POST authorizeUrl
app.post(
  "/auth/authorize",
  (
    req: Request<any, any, AuthorizeUrlReq>,
    res: Response<AuthReport | Error>
  ) => {
    const { login, context, password, minecraftAccess } = req.body;

    if (!login && !password)
      return res.status(200).json({ error: "auth.wrongpassword" });

    if (login === "MiXeR54" && password.password === "test") {
      return res.status(200).json({
        minecraftAccessToken: "",
        oauthAccessToken: "",
        oauthRefreshToken: "",
        oauthExpire: 0,
        session: {
          id: "",
          user: {
            username: login,
            uuid: "220a22d3-6c48-43c8-84c2-f66a399cafe5",
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
    } else {
      return res.status(404).json({ error: "auth.wrongpassword" });
    }
  }
);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
