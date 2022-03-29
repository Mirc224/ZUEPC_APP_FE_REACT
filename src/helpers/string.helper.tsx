export const stringHelper = {
    capitalizeFirstLetters,
};

function capitalizeFirstLetters(value: string) {
    const words = value.split(/(\s+)/).filter((e) => { return e.trim().length > 0; });
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}