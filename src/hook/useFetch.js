import { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "@/utils/URL";
import Cookies from "js-cookie";

const useFetch = (url, config = {}) => {
    const [data, setData] = useState([]);       // Store the fetched data
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);      // Error state
    const token = Cookies.get("token");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  // Set loading to true before the request
            setError(null);    // Clear previous errors
            console.log(token)
            try {
                const response = await axios.get(base_url + url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`
                    }
                });  // Perform the GET request
                setData(response.data);  
                console.log(response.data) // Set data on success
            } catch (err) {
                setError(err.message || "An error occurred while fetching data."); // Handle error
            } finally {
                setLoading(false);  // Set loading to false after the request is complete
            }
        };

        fetchData();
    }, []);  // Dependency array ensures the request is made again if the URL or config changes

    return { data, loading, error };
};

export default useFetch;
