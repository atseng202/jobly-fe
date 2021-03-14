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
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /****************** Auth API Routes ***********************/

  /** register new user and get token for user */

  static async register( user ) {
    let res = await this.request("auth/register",  user , "POST");
    return res.token;
  }

  /**  login user and get token for user*/

  static async login({ username, password }) {
    let res = await this.request("auth/token", { username, password }, "POST");
    return res.token;
  }
  /****************** Users API Routes ***********************/

  /** Get details on an user by username */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update firstName, lastName, or email of user given */

  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /****************** Companies API Routes ***********************/

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of companies by search term or all. */

  // before it reaches our API, api should be simple as possible
  static async getCompanies(searchTerm) {
    let res;
    if (searchTerm) {
      res = await this.request(`companies`, {
        name: searchTerm,
      });
    } else {
      res = await this.request(`companies`);
    }
    return res.companies;
  }

  /****************** Jobs API Routes ***********************/

  /** Get list of jobs by search term or all */
  static async getJobs(searchTerm) {
    let res;
    if (searchTerm) {
      res = await this.request("jobs", {
        title: searchTerm
      });
    } else {
      res = await this.request("jobs");
    }
    return res.jobs;
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";



export default JoblyApi;