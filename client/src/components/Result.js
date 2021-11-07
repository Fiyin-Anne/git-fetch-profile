import React from 'react'
import { IoIosPeople } from 'react-icons/io'
import { GoArrowSmallRight } from 'react-icons/go'
import { TiStarFullOutline } from 'react-icons/ti'
import { RiCodeSSlashLine, RiGitRepositoryFill} from 'react-icons/ri'

const Result = ({result, isLoading}) => {

    let img = result.data.profile_details.avatar;
    let github_page = result.data.profile_details.url;
    let repos = result.data.profile_details.public_repos;
    let top_repos = result.data.top_repos;
    let name = result.data.profile_details.name;
    let followers = result.data.profile_details.followers;

    return (
        <div className='result'>
            <div className='profileSummary'>
                <img src={img} alt='Github Avatar'/>
                <p>{<a href={github_page}>{name}</a>}</p>
                <ul>
                    <li> <IoIosPeople className='bullet-icons'/> {followers}</li>
                    {repos ? <li> <RiGitRepositoryFill />{repos}</li> : `${name} doesn’t have any public repositories yet.`}
                </ul>
            </div>
            { top_repos.length? <div className='top-four-stars'>
                <p>Most Popular Repos</p>
            <ul>
                {top_repos.map(repo =>
                    <li>
                        <GoArrowSmallRight /> <a href={repo.url}>{repo.name}</a>{repo.description? `: ${repo.description}` : ''}
                        <ul>
                            {repo.language ? <li> <RiCodeSSlashLine /> {repo.language} </li> : null}
                            {repo.stargazers_count ? <li> <TiStarFullOutline /> {repo.stargazers_count} </li> : null}
                        </ul>
                    </li>
                )}
            </ul>
            </div> : ''}
        </div>
    )
}

export default Result 
