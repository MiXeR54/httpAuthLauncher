import { HttpUser } from "./HttpUser";

export interface HttpUserSession {
  // ID сессии в вашей системе, либо случайная строка или число, если такой системы нет
  id: string;
  user: HttpUser;
  // Срок окончания действия сессии, 0 - если сессия вечная. Не используется
  expireIn: number;
}
