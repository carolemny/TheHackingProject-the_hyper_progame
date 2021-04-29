export class GamesListQueryManager {
  constructor(token, platform, search, startDate, endDate) {
    this.token = token;
    this.platform = platform;
    this.search = search;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  get search() {
    return this._search;
  }

  set search(value) {
    if (value) {
      this._search = value.replace(/\s+/g, "-");
    } else {
      this._search = null;
    }
  }

  getUrl(showMore = false) {
    if (showMore) {
      return this.nextRequest;
    }

    let url = `https://api.rawg.io/api/games?key=${this.token}&page_size=9`; 
    if (this.search) {
      url += "&search=" + this.search;
    }
    if (this.startDate && this.endDate) {
      url += `&dates=${this.startDate},${this.endDate}&ordering=-released`;
    }
    if (this.platform) {
      url += `&platforms=${this.platform}`;
    }
    return url;
  }

  getGames(showMore = false) {
    return fetch(this.getUrl(showMore))
      .then((response) => response.json())
      .then((response) => {
        this.nextRequest = response.next;
        return response.results;
      });
  }
}
