export default class DNSError extends Error {
  constructor(query, response) {
    super(`${response.Status}: ${response.Comment}`);
    this.query = query;
    this.response = response;
  }
}
