export interface HttpUser {
  username: string;
  uuid: string;
  accessToken: string;
  permissions: {
    perms: string[];
    roles: string[];
  };
  assets: {
    SKIN: {
      url: string;
      digest: string;
      metadata: {
        model: string;
      };
    };
    CAPE: {
      url: string;
      digest: string;
    };
  };
  properties: {
    [key: string]: string;
  };
}
