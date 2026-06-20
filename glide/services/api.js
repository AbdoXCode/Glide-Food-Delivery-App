export async function getRestaurants() {
  const response = await fetch(
    "https://simulated-piper-auxilytic.ngrok-free.dev/restaurants",
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    },
  );
  const data = await response.json();
  return data;
}
export async function getPopularRestaurants() {
  const response = await fetch(
    "https://simulated-piper-auxilytic.ngrok-free.dev/popular-restaurants",
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    },
  );
  const data = await response.json();
  return data;
}

export async function recommendRestaurants(userId) {
  try {
    const response = await fetch(
      `https://simulated-piper-auxilytic.ngrok-free.dev/recommended-restaurants/${userId}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recommended restaurants:", error);
    throw error;
  }
}
export async function loginUser(email, password) {
  try {
    const response = await fetch(
      "https://simulated-piper-auxilytic.ngrok-free.dev/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data;
  } catch (error) {
    console.error("Error in loginUser(from api):", error);
    throw error;
  }
}
export async function registerUser(name, email, password, address, phone) {
  try {
    const response = await fetch(
      "https://simulated-piper-auxilytic.ngrok-free.dev/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          phone_number: phone,
          address,
        }),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  } catch (error) {
    console.error("Error in registerUser(from api):", error);
    throw error;
  }
}

export async function getRestaurantById(id) {
  try {
    const response = await fetch(
      `https://simulated-piper-auxilytic.ngrok-free.dev/restaurant/${id}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    throw error;
  }
}

export async function getMenuByRestaurantId(restaurantId) {
  try {
    const response = await fetch(
      `https://simulated-piper-auxilytic.ngrok-free.dev/restaurant/${restaurantId}/menu`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching menu by restaurant ID:", error);
    throw error;
  }
}

// export async function getMenuItemById(itemId) {
//   try {
//     const response = await fetch(
//       `https://simulated-piper-auxilytic.ngrok-free.dev/menu/${itemId}`,
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching menu item by ID:", error);
//     throw error;
//   }
// }
