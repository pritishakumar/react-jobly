import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async getAll(keyword){
    let res = await this.request(keyword);
    return res[keyword];
  }
  
  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async filterQueries(type, filter){
    let filterKeyword;
    if (type === "companies"){
      filterKeyword = `nameLike=${filter}`
    } else if (type === "jobs"){
      filterKeyword = `title=${filter}`
    }
    let url = `${type}?${filterKeyword}`
    let res = await this.request(url);
    return res.companies;
  }

  static async applyJob(username, jobId){
    let url = `users/${username}/jobs/${jobId}`
    let res = await this.request(url, {}, "post");
    return res;
  }


  static async login(data){
    let url = `auth/token`
    let res = await this.request(url, data, "post");
    return res.token;
  }
  static async signup(data){
    let url = `auth/register`
    let res = await this.request(url, data, "post");
    return res.token;
  }

  static async fetchUser(username){
    let url = `users/${username}`
    let res = await this.request(url);
    return res.user;
  }

  static async patchUser(data){
    const {username, firstName, lastName, email, password} = data;
    try{
      const passwordCheck = await this.login({username, password})
    } catch (err) {
      alert(err);
      return false;
    }
    
    let url = `users/${username}`
    let res = await this.request(url, {firstName, lastName, email}, "patch");
    return res.user;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
