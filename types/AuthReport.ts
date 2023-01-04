import { HttpUserSession } from "./HttpUserSession";

export interface AuthReport {
  minecraftAccessToken: string;
  // При желании, может совпадать с "oauthAccessToken"
  oauthAccessToken?: string;
  oauthRefreshToken?: string;
  oauthExpire: number;
  // Длительность действия accessToken в мс, 0 - если токен будет вечным (В таком случае метод refreshToken не будет вызван)
  session: HttpUserSession;
}
