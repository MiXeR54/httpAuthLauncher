import express, { Request, Response } from "express";
import { v4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import { AuthReport, Error, HttpUser, HttpUserSession } from "./types";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(morgan("dev"));

//GET getUserByTokenUrl
app.get("/auth/current", (req: Request, res: Response<HttpUserSession>) => {
  console.log(req.body);
  console.log(req.headers);
  res.set("Authorization", "Bearer token");
  res.json({
    id: "220a22d3-6c48-43c8-84c2-f66a399cafe5",
    user: {
      username: "",
      uuid: "220a22d3-6c48-43c8-84c2-f66a399cafe5",
      accessToken: "",
      permissions: {},
    },
    expireIn: 0,
  });
});
// GET getUserByUUIDUrl
app.get("/auth/user/uuid/:uuid", (req, res: Response<HttpUser>) => {
  res.json({
    username: "MiXeR54",
    uuid: req.query.uuid as string,
    accessToken: "",
    permissions: {},
  });
});

// GET getUserByUsernameUrl
app.get("/auth/user/name/:username", (req, res: Response<HttpUser>) => {
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
  // нужно возращать accessToken
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
  async (
    req: Request<any, any, AuthorizeUrlReq>,
    res: Response<AuthReport | Error>
  ) => {
    const { login, context, password, minecraftAccess } = req.body;

    if (!login && !password)
      return res.status(200).json({ error: "auth.wrongpassword" });

    const candidate = await prisma.user.findFirst({
      where: { login, password: password.password },
    });

    // добавить логику с токеном
    if (candidate) {
      return res.status(200).json({
        minecraftAccessToken: "",
        oauthAccessToken: v4(),
        oauthRefreshToken: v4(),
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
