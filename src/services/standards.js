export const standards = [
    { _id: "5b21ca3eeb7f6fbccd471818", name: "I" },
    { _id: "5b21ca3eeb7f6fbccd471814", name: "II" },
    { _id: "5b21ca3eeb7f6fbccd471820", name: "V" }
  ];
  
  
  export function getStandards() {
    return standards.filter(s => s);
  }