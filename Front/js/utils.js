window.DJANGO_API_BASE_URL = "http://localhost:8000";

function getCSRFCookie() {
  let name = "csrftoken" + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const isLogged = () => {
  username = sessionStorage.getItem("username");
  	
  if (!username) return false;
  else return true;
};

function handleLogout() {
  sessionStorage.clear();
  window.location.href = "/";
}

async function makeRequest(useCsrf, url, options, queries) {
	
  let JWTToken = null;
  //console.log(useCsrf, url, options, queries);
  if (useCsrf) {
    const csrfToken = getCSRFCookie();
    if (csrfToken) {
      options.headers = {
      ...options.headers,
         "X-CSRFToken": csrfToken,
      };
    } else {
       console.log("LADRON ! Cross Site Request Forgery Detected");
       return;
    }

    JWTToken = sessionStorage.getItem("jwt");
    if (!JWTToken) {
      console.log("JWT token not found");
      return;
    }
    url = `${url}?token=${JWTToken}`;
  }

  if (queries && useCsrf) {
    url = `${url}${queries}`;
  } else if (queries) {
    url = `${url}?${queries}`;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text(); // Return non-JSON response as text
  }
}


const getUserId = async () => {
  try {
    const username = sessionStorage.getItem("username");
    const url = `${window.DJANGO_API_BASE_URL}/api/get_user_id/${username}`;
    const options = {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await makeRequest(true, url, options);

    if (response) {
      return response.user_id;
    } else {
      console.error("Error getting user ID:", response.message);
      return null;
    }
  } catch (error) {
    console.error("Error getting user ID:", error.message);
    return null;
  }
};


const getIdFromUsername = async (clientUsername) => {
  try {
    const url = `${window.DJANGO_API_BASE_URL}/api/get_user_id/${clientUsername}`;
    const options = {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await makeRequest(true, url, options);

    if (response) {
      return response.user_id;
    } else {
      console.error("Error getting user ID:", response.message);
      return null;
    }
  } catch (error) {
    console.error("Error getting user ID:", error.message);
    return null;
  }
};


