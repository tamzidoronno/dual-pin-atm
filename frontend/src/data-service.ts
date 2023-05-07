import http from "@/http-common";

class DataService {
  getAll() {
    return http.get("/users");
  }
  getUsers() {
    return http.get("/users");
  }
  register(data: any) {
    return http.post("/register",data);
  }
  getUserByAccount(account: string) {
    return http.get(`/user/${account}`);
  }
  withdraw(data: any) {
    return http.get("/withdraw",data);
  }
}

export default new DataService();