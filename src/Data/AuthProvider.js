import client from "../HHTP/client";

class AuthProvider{
  static async login (body){
    console.log(body);
    return await client.post("/api/login", body);
  }
}

export default AuthProvider;