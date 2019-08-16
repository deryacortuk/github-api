class GitHub {
    constructor() {
        this.endpoint = "https://api.github.com/users/";

    }
    async getGithubData(username) {
        const responseUser = await fetch(this.endpoint + username);
        const responseRepo = await fetch(this.endpoint + username + "/repos");
        const userData = await responseUser.json();
        const repoData = await responseRepo.json();

        return {
            user: userData,
            repo: repoData
        }

    }
}