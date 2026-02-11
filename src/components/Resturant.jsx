import { useEffect, useState } from "react";
import RestCard from "./RestCard";

export default function Restaurant() {
    const [restData, setRestData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Mock restaurant data - no server needed
        const mockRestaurants = [
            {
                info: {
                    id: "1",
                    name: "Pizza Palace",
                    cloudinaryImageId: "rx100",
                    cuisines: ["Pizza", "Italian"],
                    avgRating: 4.5,
                    deliveryTime: 30
                }
            },
            {
                info: {
                    id: "2",
                    name: "Burger Barn",
                    cloudinaryImageId: "rx100",
                    cuisines: ["Burgers", "American"],
                    avgRating: 4.2,
                    deliveryTime: 25
                }
            },
            {
                info: {
                    id: "3",
                    name: "Sushi Studio",
                    cloudinaryImageId: "rx100",
                    cuisines: ["Sushi", "Japanese"],
                    avgRating: 4.8,
                    deliveryTime: 40
                }
            },
            {
                info: {
                    id: "4",
                    name: "Taj Mahal",
                    cloudinaryImageId: "rx100",
                    cuisines: ["Indian", "North Indian"],
                    avgRating: 4.3,
                    deliveryTime: 35
                }
            },
            {
                info: {
                    id: "5",
                    name: "Dragon Palace",
                    cloudinaryImageId: "rx100",
                    cuisines: ["Chinese", "Asian"],
                    avgRating: 4.1,
                    deliveryTime: 28
                }
            },
            {
                info: {
                    id: "6",
                    name: "Taco Fiesta",
                    cloudinaryImageId: "rx100",
                    cuisines: ["Mexican", "Fast Food"],
                    avgRating: 4.4,
                    deliveryTime: 22
                }
            }
        ];

        setRestData(mockRestaurants);
    }, []);

    return (
        <div className="flex flex-wrap w-[80%] mx-auto mt-20 gap-5">
            {restData.length === 0 && <div>Loading restaurants…</div>}
            {error && <div className="text-red-500">{error}</div>}

            {restData.map((restInfo) => (
                <RestCard
                    key={restInfo?.info?.id ?? `${restInfo?.info?.name}-${Math.random()}`}
                    restInfo={restInfo}
                />
            ))}
        </div>
    );
}