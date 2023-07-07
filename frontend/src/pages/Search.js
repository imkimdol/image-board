import axios from "axios";
import { useState } from "react";
import AsyncSelect from 'react-select/async';

import PostsColumn from "../components/PostsColumn";
import { getServerLoc } from "../helpers/miscHelpers";

const Search = () => {
    const [ selected, setSelected ] = useState([]);
    const [ query, setQuery ] = useState(null);

    const mapToOptionsType = (value, label) => {
        if (!label) {
            return {"value": value, "label": value}
        }
        return {"value": value, "label": label}
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedMap = selected.map(e => e.value);

        const tags = selectedMap.filter(e => e.startsWith("#")).map(t => t.slice(1));
        const accounts = selectedMap.filter(e => e.startsWith("@")).map(t => t.slice(1));

        setQuery({
            query: {
                $and: [
                    { tags: { $in: tags } },
                    { author: { $in: accounts } }
                ]
            }
        })  
    }

    const getAvailable = () => {
        return new Promise((resolve) => {
            getAvailableTags().then(tags => {
                getAvailableUsers().then (users => {
                    console.log([...users, ...tags]);
                    resolve([...users, ...tags]);
                })
            })
        })
    }

    const getAvailableTags = () => {
        return new Promise((resolve) => {
          const link = getServerLoc() + "/tags";
    
          axios.get(link).then((response) => {
            resolve(response.data.map(t => mapToOptionsType("#"+t._id)));
          });
        })
    }

    const getAvailableUsers = () => {
        return new Promise((resolve) => {
          const link = getServerLoc() + "/accounts";
    
          axios.get(link).then((response) => {
            resolve(response.data.map(t => mapToOptionsType("@"+t._id)));
          });
        })
    }

    return (
        <div>
            <h3>Search</h3>

            <AsyncSelect 
                isMulti
                defaultOptions
                onChange={setSelected}
                loadOptions={getAvailable}
            />
            <button onClick={handleSubmit}>Go</button>
            <PostsColumn query={query}/>
        </div>
    );
};

export default Search;