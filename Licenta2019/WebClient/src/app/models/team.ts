export class Team{
    GithubRepository: string;
    GithubUsername: string;
    Teammates: string[];

    constructor(){
        this.GithubRepository = null;
        this.GithubUsername = null;
        this.Teammates = [];
    }
}