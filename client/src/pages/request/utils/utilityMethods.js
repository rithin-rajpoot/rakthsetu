export const getBloodTypeColor = (bloodType) => {
    if (bloodType.includes("O")) return "text-red-600";
    if (bloodType.includes("A")) return "text-blue-600";
    if (bloodType.includes("B")) return "text-purple-600";
    if (bloodType.includes("AB")) return "text-green-600";
    return "text-gray-600 bg-gray-50";
};

export const getUrgencyColor = (urgency) => {
    switch (urgency) {
        case "Urgent":
            return "text-red-600 bg-red-100";
        case "High":
            return "text-orange-600 bg-orange-100";
        case "Medium":
            return "text-yellow-600 bg-yellow-100";
        case "Low":
            return "text-green-600 bg-green-100";
        default:
            return "text-gray-600 bg-gray-100";
    }
};