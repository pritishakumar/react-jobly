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

  
  /** Retrieve brief information on all of
   * the companies or jobs in the database
   * 
   * Input: keyword = "companies" or "jobs"
   * Output: Array of company or job obj's
   */
  static async getAll(keyword){
    let res = await this.request(keyword);
    return res[keyword];
  }
  
  /** Get details on a company by handle.
   * Input: handle: company handle
   * Output: Object containing keys with company details
   */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Search function for jobs or companies by the
   * user
   * 
   * Input: type = "companies" or "jobs"
   *      filter = string to search
   * Output: Array of matching company or job obj's
   */
  static async filterQueries(type, filter){
    let filterKeyword;
    if (type === "companies"){
      filterKeyword = `name=${filter}`
    } else if (type === "jobs"){
      filterKeyword = `title=${filter}`
    }
    let url = `${type}?${filterKeyword}`
    let res = await this.request(url);
    return res.companies;
  }

  /** Updates the applied status on a job
   * Input: username and id of job applied
   * Output: Object confirming applied
   */
  static async applyJob(username, jobId){
    let url = `users/${username}/jobs/${jobId}`
    let res = await this.request(url, {}, "post");
    return res;
  }

  /** Logs a user in
   * Input: form data object containing username and password
   *      keys
   * Output: token string
   */
  static async login(data){
    let url = `auth/token`
    let res = await this.request(url, data, "post");
    return res.token;
  }

  /** Registers a user
   * Input: form data object containing username, password
   *      firstName, lastName, and email keys
   * Output: token string
   */
  static async signup(data){
    let url = `auth/register`
    let res = await this.request(url, data, "post");
    return res.token;
  }

  /** Retrieves detailed user data
   * Input: username
   * Output: object containing keys with information
   */
  static async fetchUser(username){
    let url = `users/${username}`
    let res = await this.request(url);
    return res.user;
  }

  /** Updates a user's information
   * Input: form data containing username, firstName, lastName, 
   *      email, password keys
   * Output: object containing updated user data
   */
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

// // for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
