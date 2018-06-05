import AuthInfo from "../AuthInfo";

enum Fields {
  USER_ID = "user_id",
  DEVICE_ID = "device_id",
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token"
}

/**
 * A class containing the fields returned by the Stitch client API in an authentication request.
 */
export default class APIAuthInfo extends AuthInfo {
  public static fromJSON(json: object): APIAuthInfo {
    return new APIAuthInfo(
      json[Fields.USER_ID],
      json[Fields.DEVICE_ID],
      json[Fields.ACCESS_TOKEN],
      json[Fields.REFRESH_TOKEN]
    );
  }

  public constructor(
    userId: string,
    deviceId: string,
    accessToken: string,
    refreshToken?: string
  ) {
    super(userId, deviceId, accessToken, refreshToken);
  }

  public toJSON(): object {
    return {
      [Fields.USER_ID]: this.userId,
      [Fields.DEVICE_ID]: this.deviceId,
      [Fields.ACCESS_TOKEN]: this.accessToken,
      [Fields.REFRESH_TOKEN]: this.refreshToken
    };
  }
}