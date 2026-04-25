
// A list of major urban centers in India. This is not exhaustive but covers major metropolitan areas.
const urbanCenters = [
    "Hyderabad", 
    "Mumbai", 
    "Delhi", 
    "Chennai", 
    "Bangalore", 
    "Kolkata", 
    "Pune", 
    "Ahmedabad", 
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot"
];

/**
 * Classifies the user's location as 'urban' or 'rural' using browser geolocation and reverse geocoding.
 * @returns A promise that resolves to either "urban" or "rural".
 * @throws An error if location access is denied or if the location cannot be determined.
 */
export const classifyLocation = (): Promise<"urban" | "rural"> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            return reject(new Error("Geolocation is not supported by your browser."));
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                try {
                    // Use the Nominatim API for reverse geocoding (it's free and open-source)
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    
                    if (!response.ok) {
                        throw new Error("Failed to fetch location details.");
                    }

                    const data = await response.json();
                    
                    // Extract the city, town, or village from the address object
                    const place = data.address.city || data.address.town || data.address.village;
                    
                    if (!place) {
                        return reject(new Error("Could not determine your city or town."));
                    }
                    
                    // Check if the determined place is in our list of urban centers
                    const locationType = urbanCenters.some(urbanCenter => place.includes(urbanCenter)) ? "urban" : "rural";
                    
                    resolve(locationType);

                } catch (error) {
                    reject(new Error("Error classifying location. Please try again."));
                }
            },
            () => {
                reject(new Error("Location access was denied. Please enable it in your browser settings."));
            },
            {
                enableHighAccuracy: false,
                timeout: 10000, // 10 seconds
                maximumAge: 0
            }
        );
    });
};
