require('dotenv').config()

const GITHUBTOKEN = process.env.GITHUBTOKEN;
const axios = require('axios')
const token = Buffer.from(GITHUBTOKEN).toString('base64'); 

const getProfile = async (data) => {
    let user = data.user;

    let top_repos = null, profile_details;
    let result;
    let response = {
        status: null,
        message: null,
        data: {}
    };

    try {
        result = await axios.get(`https://api.github.com/users/${user}`, {
            headers: {
                'Authorization': `Basic ${token}` //increase rate limit
            }
        })
    } catch (e) {
        throw new Error(e.message);
    }

        let profile = result.data;

        profile_details = {
            name: profile.name || profile.login,
            avatar: profile.avatar_url,
            followers: profile.followers,
            url: profile.html_url,
            public_repos: profile.public_repos ? profile.public_repos : 0,
        }

        response.data.profile_details = profile_details

        if(profile.public_repos !== 'This user has no public repositories yet.') {
            let repos = await axios.get(`${profile.repos_url}?per_page=100`) //todo: add filter to get more pages
            
            top_repos = repos.data.sort((x, y) => y.stargazers_count - x.stargazers_count).slice(0, 4);

            top_repos = top_repos.map(repo => {
                return {
                    id: repo.id,
                    node_id: repo.node_id,
                    name: repo.name,
                    full_name: repo.full_name,
                    language: repo.language,
                    stargazers_count: repo.stargazers_count,
                    url: repo.html_url,
                    description: repo.description,
                }
            })
        }

        response.data.top_repos = top_repos || 'This user has no public repositories yet.';
        response.status = 'success';
        response.message= 'profile fetched successfully';

    return response;
}

module.exports = {
    getProfile
}
